import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "src");
const messagesPath = path.join(srcDir, "lib/messages.ts");

function readSource(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  return ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
}

function unwrap(node) {
  let current = node;
  while (
    current &&
    (ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isParenthesizedExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

function propertyName(node) {
  if (!node) return undefined;
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }
  return undefined;
}

function stringValue(node) {
  const value = unwrap(node);
  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
    return value.text;
  }
  return undefined;
}

function findVariable(sourceFile, name) {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === name) {
        return unwrap(declaration.initializer);
      }
    }
  }
  return undefined;
}

function flattenObject(object, prefix = "", output = new Map(), duplicates = []) {
  const node = unwrap(object);
  if (!node || !ts.isObjectLiteralExpression(node)) return { output, duplicates };

  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = propertyName(property.name);
    if (!name) continue;
    const key = prefix ? `${prefix}.${name}` : name;
    const valueNode = unwrap(property.initializer);
    if (ts.isObjectLiteralExpression(valueNode)) {
      flattenObject(valueNode, key, output, duplicates);
      continue;
    }
    const value = stringValue(valueNode);
    if (value === undefined) continue;
    if (output.has(key)) duplicates.push(key);
    output.set(key, value);
  }

  return { output, duplicates };
}

function placeholders(value) {
  const found = new Set();
  const patterns = [
    /\{\{([A-Za-z_][\w.-]*)\}\}/g,
    /(?<!\{)\{([A-Za-z_][\w.-]*)\}(?!\})/g,
    /%[sdif]/g,
    /(^|[^\w]):([A-Za-z_][\w.-]*)/g,
  ];
  for (const pattern of patterns) {
    for (const match of value.matchAll(pattern)) {
      found.add(match[2] ? `:${match[2]}` : match[1] ?? match[0]);
    }
  }
  return [...found].sort();
}

function walkFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (fullPath.includes(`${path.sep}admin${path.sep}`)) continue;
      walkFiles(fullPath, files);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function collectLiteralKeyUsage(files) {
  const used = new Map();
  let dynamicCalls = 0;

  for (const filePath of files) {
    const sourceFile = readSource(filePath);
    function visit(node) {
      if (ts.isCallExpression(node)) {
        const callee = node.expression;
        const calleeName = ts.isIdentifier(callee) ? callee.text : undefined;
        const index = calleeName === "translate" ? 1 : calleeName === "t" ? 0 : -1;
        if (index >= 0 && node.arguments[index]) {
          const key = stringValue(node.arguments[index]);
          if (key) {
            const locations = used.get(key) ?? [];
            const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
            locations.push(`${path.relative(root, filePath)}:${line + 1}`);
            used.set(key, locations);
          } else {
            dynamicCalls += 1;
          }
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(sourceFile);
  }

  return { used, dynamicCalls };
}

function objectProperty(object, name) {
  const node = unwrap(object);
  if (!node || !ts.isObjectLiteralExpression(node)) return undefined;
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    if (propertyName(property.name) === name) return unwrap(property.initializer);
  }
  return undefined;
}

function arrayObjects(node) {
  const value = unwrap(node);
  if (!value || !ts.isArrayLiteralExpression(value)) return [];
  return value.elements.map(unwrap).filter(ts.isObjectLiteralExpression);
}

function collectProductCoverage() {
  const dataSource = readSource(path.join(srcDir, "lib/data.ts"));
  const productsArray = findVariable(dataSource, "products");
  const productObjects = arrayObjects(productsArray);
  const products = [];
  const specLabels = new Set();
  const specValues = new Set();

  for (const product of productObjects) {
    const slug = stringValue(objectProperty(product, "slug"));
    if (!slug) continue;
    products.push(slug);
    for (const spec of arrayObjects(objectProperty(product, "specs"))) {
      const label = stringValue(objectProperty(spec, "label"));
      const value = stringValue(objectProperty(spec, "value"));
      if (label) specLabels.add(label);
      if (value) specValues.add(value);
    }
  }

  const productI18nSource = readSource(path.join(srcDir, "lib/product-i18n.ts"));
  const copyMap = flattenObject(findVariable(productI18nSource, "productCopyBySlug")).output;
  const copySlugs = new Set([...copyMap.keys()].map((key) => key.split(".")[0]));
  const textMap = flattenObject(findVariable(productI18nSource, "text")).output;
  const textKeys = new Set([...textMap.keys()].map((key) => key.split(".")[0]));

  const specSource = readSource(path.join(srcDir, "lib/product-spec-i18n.ts"));
  const specLabelMap = flattenObject(findVariable(specSource, "specLabels")).output;
  const specValueMap = flattenObject(findVariable(specSource, "specValues")).output;
  const mappedLabels = new Set([
    ...textKeys,
    ...[...specLabelMap.keys()].map((key) => key.split(".")[0]),
  ]);
  const mappedValues = new Set([
    ...textKeys,
    ...[...specValueMap.keys()].map((key) => key.split(".")[0]),
  ]);

  const unmappedSpecLabels = [...specLabels]
    .filter((value) => !mappedLabels.has(value))
    .sort();
  const unmappedSpecValues = [...specValues]
    .filter((value) => !mappedValues.has(value))
    .sort();

  // Mirror localizeMeasurement() so audit distinguishes runtime-covered dimensions.
  function isMeasurementAuto(value) {
    if (/^До \d/.test(value)) return true;
  if (/^≈ \d+ л$/.test(value)) return true;
  if (/^\d+[–-]\d+\s+дн/.test(value) || /^\d+\s+дн/.test(value)) return true;
  if (/^[\d.,]+\s*[×xх][\d.,×xх\s]+$/i.test(value)) return true;
    if (/\d/.test(value) && /(?:см|мм|шт\.|л)/.test(value)) return true;
    return false;
  }

  const measurementAuto = unmappedSpecValues.filter(isMeasurementAuto);
  const trulyUnmappedSpecValues = unmappedSpecValues.filter((value) => !isMeasurementAuto(value));

  const templateSignature =
    "The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.";
  const ruTemplateSignature = "Модель выполнена из";
  const templatedSlugs = [...copySlugs].filter((slug) => {
    const enDesc = copyMap.get(`${slug}.description.en`) ?? "";
    return enDesc.includes(templateSignature);
  });
  const templatedRuSlugs = [...copySlugs].filter((slug) => {
    const ruDesc = copyMap.get(`${slug}.description.ru`) ?? "";
    return ruDesc.includes(ruTemplateSignature);
  });

  return {
    products,
    missingProductCopy: products.filter((slug) => !copySlugs.has(slug)),
    unmappedSpecLabels,
    unmappedSpecValues,
    measurementAutoSpecValues: measurementAuto,
    trulyUnmappedSpecValues,
    templatedProductSlugs: templatedSlugs,
    templatedRuProductSlugs: templatedRuSlugs,
  };
}

const messagesSource = readSource(messagesPath);
const dictionaries = {};
const duplicateKeys = {};

for (const locale of ["ru", "ro", "en"]) {
  const { output, duplicates } = flattenObject(findVariable(messagesSource, locale));
  dictionaries[locale] = output;
  duplicateKeys[locale] = duplicates;
}

const allKeys = new Set([
  ...dictionaries.ru.keys(),
  ...dictionaries.ro.keys(),
  ...dictionaries.en.keys(),
]);
const missing = {};
for (const locale of ["ru", "ro", "en"]) {
  missing[locale] = [...allKeys].filter((key) => !dictionaries[locale].has(key)).sort();
}

const placeholderMismatches = [];
for (const key of allKeys) {
  const values = ["ru", "ro", "en"].map((locale) =>
    JSON.stringify(placeholders(dictionaries[locale].get(key) ?? "")),
  );
  if (new Set(values).size > 1) {
    placeholderMismatches.push({
      key,
      ru: placeholders(dictionaries.ru.get(key) ?? ""),
      ro: placeholders(dictionaries.ro.get(key) ?? ""),
      en: placeholders(dictionaries.en.get(key) ?? ""),
    });
  }
}

const customerFiles = walkFiles(srcDir);
const { used, dynamicCalls } = collectLiteralKeyUsage(customerFiles);

/** Keys resolved via dynamic `t(\`status.${x}\`)` / address presets / ternary whatsapp keys. */
const reservedDynamicPrefixes = [
  "admin.",
  "status.",
  "account.addressLabel",
  "api.err",
];
const reservedDynamicExact = new Set([
  "cart.itemCountOne",
  "cart.itemCountFew",
  "cart.itemCountMany",
  "order.whatsappOrder",
  "order.whatsappOrderNoNumber",
  "order.whatsappPreorder",
  "order.whatsappPreorderNoNumber",
  // address-label.ts presets (key strings, not t() literals)
  "account.addressLabelHome",
  "account.addressLabelOffice",
  "account.addressLabelWork",
]);

function isReservedDynamicKey(key) {
  if (reservedDynamicExact.has(key)) return true;
  return reservedDynamicPrefixes.some((prefix) => key.startsWith(prefix));
}

const unknownKeys = [...used.keys()].filter((key) => !allKeys.has(key)).sort();
const unusedKeysAll = [...allKeys].filter((key) => !used.has(key)).sort();
const reservedDynamicKeys = unusedKeysAll.filter(isReservedDynamicKey);
const unusedKeys = unusedKeysAll.filter((key) => !isReservedDynamicKey(key));
const productCoverage = collectProductCoverage();

const report = {
  generatedAt: new Date().toISOString(),
  dictionaryCounts: Object.fromEntries(
    Object.entries(dictionaries).map(([locale, entries]) => [locale, entries.size]),
  ),
  missing,
  duplicateKeys,
  placeholderMismatches,
  unknownKeys,
  unusedKeys,
  reservedDynamicKeys,
  dynamicCalls,
  productCoverage,
};

if (process.argv.includes("--json")) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  console.log("Localization audit");
  console.log("==================");
  console.log(
    `Keys: RU ${report.dictionaryCounts.ru} · RO ${report.dictionaryCounts.ro} · EN ${report.dictionaryCounts.en}`,
  );
  console.log(
    `Missing: RU ${missing.ru.length} · RO ${missing.ro.length} · EN ${missing.en.length}`,
  );
  console.log(
    `Duplicates: RU ${duplicateKeys.ru.length} · RO ${duplicateKeys.ro.length} · EN ${duplicateKeys.en.length}`,
  );
  console.log(`Placeholder mismatches: ${placeholderMismatches.length}`);
  console.log(`Unknown literal keys: ${unknownKeys.length}`);
  console.log(`Unused literal keys: ${unusedKeys.length}`);
  console.log(
    `Reserved dynamic keys (admin/status/address/whatsapp/plurals): ${reservedDynamicKeys.length}`,
  );
  console.log(`Dynamic translation calls: ${dynamicCalls}`);
  console.log(
    `Products: ${productCoverage.products.length} · missing slug copy: ${productCoverage.missingProductCopy.length}`,
  );
  console.log(
    `Unmapped raw specs: labels ${productCoverage.unmappedSpecLabels.length} · values ${productCoverage.unmappedSpecValues.length}`,
  );
  console.log(
    `  of which measurement-auto: ${productCoverage.measurementAutoSpecValues.length} · truly unmapped: ${productCoverage.trulyUnmappedSpecValues.length}`,
  );
  console.log(
    `Templated product descriptions (EN signature): ${productCoverage.templatedProductSlugs.length}`,
  );
  console.log(
    `Templated RU descriptions: ${productCoverage.templatedRuProductSlugs?.length ?? 0}`,
  );

  if (unusedKeys.length) {
    console.log("\nUnused literal keys (not reserved):");
    for (const key of unusedKeys) console.log(`- ${key}`);
  }

  if (productCoverage.trulyUnmappedSpecValues.length) {
    console.log("\nTruly unmapped spec values:");
    for (const value of productCoverage.trulyUnmappedSpecValues) {
      console.log(`- ${value}`);
    }
  }
  if (productCoverage.unmappedSpecLabels.length) {
    console.log("\nUnmapped spec labels:");
    for (const value of productCoverage.unmappedSpecLabels) {
      console.log(`- ${value}`);
    }
  }
  if (productCoverage.missingProductCopy.length) {
    console.log("\nMissing product copy slugs:");
    for (const slug of productCoverage.missingProductCopy) {
      console.log(`- ${slug}`);
    }
  }

  if (unknownKeys.length) {
    console.log("\nUnknown literal keys:");
    for (const key of unknownKeys) console.log(`- ${key}: ${used.get(key).join(", ")}`);
  }
  if (placeholderMismatches.length) {
    console.log("\nPlaceholder mismatches:");
    for (const item of placeholderMismatches) {
      console.log(
        `- ${item.key}: RU ${item.ru.join(", ")} · RO ${item.ro.join(", ")} · EN ${item.en.join(", ")}`,
      );
    }
  }
}

if (
  missing.ru.length ||
  missing.ro.length ||
  missing.en.length ||
  duplicateKeys.ru.length ||
  duplicateKeys.ro.length ||
  duplicateKeys.en.length ||
  placeholderMismatches.length ||
  unknownKeys.length
) {
  process.exitCode = 1;
}
