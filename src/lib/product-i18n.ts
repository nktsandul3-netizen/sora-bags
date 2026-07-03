import { defaultLocale, type Locale } from "@/lib/i18n";
import {
  localizeMeasurement,
  lookupSpecTranslation,
  specLabels,
  specValues,
} from "@/lib/product-spec-i18n";
import type { Product, ProductColor } from "@/lib/types";

const text: Record<string, Partial<Record<Locale, string>>> = {
  "Доставка 7–14 дней": { ro: "Livrare 7-14 zile", en: "Delivery 7-14 days" },
  Женский: { ro: "Femei", en: "Women" },
  Италия: { ro: "Italia", en: "Italy" },
  Пол: { ro: "Gen", en: "Gender" },
  Тип: { ro: "Tip", en: "Type" },
  Размер: { ro: "Dimensiune", en: "Size" },
  "Страна производства": { ro: "Țara de origine", en: "Country of origin" },
  Кожа: { ro: "Piele", en: "Leather" },
  Материал: { ro: "Material", en: "Material" },
  Отделение: { ro: "Compartiment", en: "Compartment" },
  Застёжка: { ro: "Închidere", en: "Closure" },
  Ремень: { ro: "Curea", en: "Strap" },
  Ручка: { ro: "Mâner", en: "Handle" },
  Ручки: { ro: "Mânere", en: "Handles" },
  Декор: { ro: "Decor", en: "Decor" },
  Силуэт: { ro: "Siluetă", en: "Silhouette" },
  Пряжка: { ro: "Cataramă", en: "Buckle" },
  Доставка: { ro: "Livrare", en: "Delivery" },
  Конструкция: { ro: "Construcție", en: "Construction" },
  Фурнитура: { ro: "Feronerie", en: "Hardware" },
  Замок: { ro: "Încuietoare", en: "Lock" },
  Назначение: { ro: "Utilizare", en: "Use" },
  Категория: { ro: "Categorie", en: "Category" },
  Плетение: { ro: "Împletire", en: "Weaving" },
  Комплект: { ro: "Set", en: "Set" },
  "Вместительное основное отделение": { ro: "Compartiment principal încăpător", en: "Spacious main compartment" },
  "Металлическая поворотная": { ro: "Închidere metalică rotativă", en: "Metal turn-lock closure" },
  "Регулируемый плечевой ремень": { ro: "Curea de umăr reglabilă", en: "Adjustable shoulder strap" },
  "Короткая верхняя ручка": { ro: "Mâner superior scurt", en: "Short top handle" },
  "Декоративная бахрома по передней части": { ro: "Franjuri decorative pe partea frontală", en: "Decorative fringe on the front" },
  "Надёжная застёжка-молния": { ro: "Fermoar sigur", en: "Secure zip closure" },
  "Длинные для ношения на плече": { ro: "Lungi, pentru purtare pe umăr", en: "Long handles for shoulder wear" },
  "Лёгкая и комфортная": { ro: "Ușoară și confortabilă", en: "Lightweight and comfortable" },
  "Премиальная металлическая фурнитура": { ro: "Feronerie metalică premium", en: "Premium metal hardware" },
  "Широкий регулируемый плечевой ремень": { ro: "Curea lată reglabilă de umăr", en: "Wide adjustable shoulder strap" },
  "Декоративная металлическая пряжка премиального качества": { ro: "Cataramă metalică decorativă premium", en: "Premium decorative metal buckle" },
  "Усиленная для сохранения формы": { ro: "Structură întărită pentru păstrarea formei", en: "Reinforced to hold its shape" },
  "Премиальная золотистая фурнитура": { ro: "Feronerie aurie premium", en: "Premium gold-tone hardware" },
  "Жёсткая для сохранения формы": { ro: "Rigidă pentru păstrarea formei", en: "Structured to hold its shape" },
  "Удобная верхняя ручка": { ro: "Mâner superior comod", en: "Comfortable top handle" },
  "Съёмный регулируемый плечевой ремень": { ro: "Curea de umăr detașabilă și reglabilă", en: "Detachable adjustable shoulder strap" },
  "Надёжный поворотный замок": { ro: "Încuietoare rotativă sigură", en: "Secure turn lock" },
  "Премиальная металлическая фурнитура золотого цвета": { ro: "Feronerie metalică aurie premium", en: "Premium gold-tone metal hardware" },
  "Для повседневных, деловых и вечерних образов": { ro: "Pentru ținute zilnice, business și de seară", en: "For everyday, business and evening looks" },
  "Средняя / вместительная сумка": { ro: "Medie / încăpătoare", en: "Medium / spacious" },
  "Металлическая регулируемая пряжка на ремне": { ro: "Cataramă metalică reglabilă pe curea", en: "Metal adjustable buckle on strap" },
  "Одно основное отделение, внутри карман на молнии": { ro: "Un compartiment principal, cu buzunar interior cu fermoar", en: "One main compartment with an inner zip pocket" },
  "Основная застёжка — молния; внутри/сбоку видна магнитная кнопка": { ro: "Închidere principală cu fermoar; interior/lateral cu capse magnetice", en: "Main zip closure; magnetic snap visible inside/on the side" },
  "Металлическая, золотистого цвета": { ro: "Metalică, aurie", en: "Metal, gold-tone" },
  "1–3 дня": { ro: "1–3 zile", en: "1–3 days" },
  Уточняется: { ro: "Se clarifică", en: "To be confirmed" },
  "Эффектное ручное плетение кожи": { ro: "Împletire manuală expresivă a pielii", en: "Statement hand-woven leather" },
  "Удобные двойные ручки": { ro: "Mânere duble comode", en: "Comfortable double handles" },
  "Съёмный плечевой ремень": { ro: "Curea de umăr detașabilă", en: "Detachable shoulder strap" },
  "Кожаный клатч-органайзер": { ro: "Clutch-organizator din piele", en: "Leather organizer clutch" },
  "Для повседневных и деловых образов": { ro: "Pentru ținute zilnice și business", en: "For everyday and business looks" },
  "38 × 28 × 13 см": { ro: "38 × 28 × 13 cm", en: "38 × 28 × 13 cm" },
  "30 × 37 × 10 см": { ro: "30 × 37 × 10 cm", en: "30 × 37 × 10 cm" },
  "Один плечевой ремень, регулируемый": {
    ro: "O singură curea de umăr, reglabilă",
    en: "One adjustable shoulder strap",
  },
  "Металлическая регулируемая пряжка": {
    ro: "Cataramă metalică reglabilă",
    en: "Metal adjustable buckle",
  },
  "Одно основное отделение": { ro: "Un compartiment principal", en: "One main compartment" },
  "Основная застёжка — молния": { ro: "Închidere principală cu fermoar", en: "Main zip closure" },
  "Shoulder Bag / Hobo Bag": { ro: "Shoulder Bag / Hobo Bag", en: "Shoulder Bag / Hobo Bag" },
  "Женская сумка-хобо / shoulder bag": {
    ro: "Geantă hobo pentru femei / shoulder bag",
    en: "Women's hobo bag / shoulder bag",
  },
  "37 × 18 × 10 см": { ro: "37 × 18 × 10 cm", en: "37 × 18 × 10 cm" },
  "Фактурная кожа / кожа с зернистой текстурой": {
    ro: "Piele texturată / piele cu granulație",
    en: "Textured leather / grained leather",
  },
  "Мягкая округлая форма": {
    ro: "Formă moale rotunjită",
    en: "Soft rounded shape",
  },
  "Верхняя ручка для носки в руке или на плече": {
    ro: "Mâner superior pentru purtare în mână sau pe umăr",
    en: "Top handle for hand or shoulder carry",
  },
  "Дополнительный съёмный плечевой ремень": {
    ro: "Curea de umăr detașabilă suplimentară",
    en: "Additional detachable shoulder strap",
  },
  "Текстильная подкладка, внутренний карман на молнии": {
    ro: "Căptușeală textilă, buzunar interior cu fermoar",
    en: "Textile lining, inner zip pocket",
  },
  "На каждый день, для работы, прогулок и базового гардероба": {
    ro: "Pentru fiecare zi, birou, plimbări și garderobă de bază",
    en: "For everyday wear, work, walks and a core wardrobe",
  },
  "Дополнительного съёмного ремня нет": { ro: "Fără curea detașabilă suplimentară", en: "No additional detachable strap" },
  "Не предусмотрена": { ro: "Nu este prevăzută", en: "Not included" },
  "Одно большое основное отделение, внутри карман на молнии": {
    ro: "Un compartiment principal mare, cu buzunar interior cu fermoar",
    en: "One large main compartment with an inner zip pocket",
  },
  "Магнитная кнопка + кожаная завязка": { ro: "Capse magnetică + șnur din piele", en: "Magnetic snap + leather tie" },
  "Металлическая, цвет зависит от партии/модели": {
    ro: "Metalică, culoarea depinde de lot/model",
    en: "Metal, color varies by batch/model",
  },
  "Tote Bag / Shopper Bag": { ro: "Tote Bag / Shopper Bag", en: "Tote Bag / Shopper Bag" },
  "28 × 27 × 14 см": { ro: "28 × 27 × 14 cm", en: "28 × 27 × 14 cm" },
  "Фактурная кожа / натуральная кожа, если указано на бирке": {
    ro: "Piele texturată / piele naturală, dacă este indicat pe etichetă",
    en: "Textured leather / natural leather, if stated on the tag",
  },
  "Тоут / shopper bag с устойчивой формой": {
    ro: "Tote / shopper bag cu formă stabilă",
    en: "Tote / shopper bag with a structured shape",
  },
  "Две плечевые ручки": { ro: "Două mânere de umăr", en: "Two shoulder handles" },
  "Боковые ремешки с металлическими пряжками": {
    ro: "Curele laterale cu cataramă metalică",
    en: "Side straps with metal buckles",
  },
  "Одно основное вместительное отделение": {
    ro: "Un compartiment principal încăpător",
    en: "One spacious main compartment",
  },
  "Карман на молнии внутри сумки": {
    ro: "Buzunar cu fermoar în interiorul genții",
    en: "Zip pocket inside the bag",
  },
  "Магнитная кнопка / внутренняя фиксация сверху": {
    ro: "Capse magnetică / fixare interioară în partea superioară",
    en: "Magnetic snap / inner top fastening",
  },
  "Металлическая, серебристого цвета": {
    ro: "Metalică, argintie",
    en: "Metal, silver-toned",
  },
  "Красная текстильная подкладка внутри": {
    ro: "Căptușeală textilă roșie în interior",
    en: "Red textile lining inside",
  },
  "Casual, office, everyday, базовый гардероб": {
    ro: "Casual, office, everyday, garderobă de bază",
    en: "Casual, office, everyday, core wardrobe",
  },
  "Leather Tote / Shoulder Bag": {
    ro: "Leather Tote / Shoulder Bag",
    en: "Leather Tote / Shoulder Bag",
  },
  Регулировка: { ro: "Reglaj", en: "Adjustment" },
  "Внутренний карман": { ro: "Buzunar interior", en: "Inner pocket" },
  Подкладка: { ro: "Căptușeală", en: "Lining" },
  Стиль: { ro: "Stil", en: "Style" },
  "Верхняя ручка + съёмный регулируемый плечевой ремень": {
    ro: "Mâner superior + curea de umăr detașabilă reglabilă",
    en: "Top handle + detachable adjustable shoulder strap",
  },
  "25 × 32 × 12 см": { ro: "25 × 32 × 12 cm", en: "25 × 32 × 12 cm" },
  "Фактурная кожа / натуральная кожа по бирке или поставщику": {
    ro: "Piele texturată / piele naturală conform etichetei sau furnizorului",
    en: "Textured leather / natural leather per tag or supplier",
  },
  "Структурированная трапециевидная форма": {
    ro: "Formă trapezoidală structurată",
    en: "Structured trapezoidal shape",
  },
  "Две короткие ручки + две длинные ручки для плеча": {
    ro: "Două mânere scurte + două mânere lungi pentru umăr",
    en: "Two short handles + two long shoulder handles",
  },
  "Отдельного съёмного ремня нет": {
    ro: "Fără curea detașabilă separată",
    en: "No separate detachable strap",
  },
  "Основное открытое пространство + центральное отделение на молнии": {
    ro: "Spațiu principal deschis + compartiment central cu fermoar",
    en: "Open main space + central zip compartment",
  },
  "Внутренняя косметичка/карман на молнии": {
    ro: "Organizator/buzunar interior cu fermoar",
    en: "Inner zip pouch/cosmetic bag",
  },
  "Центральное отделение закрывается на молнию": {
    ro: "Compartimentul central se închide cu fermoar",
    en: "Central compartment closes with a zipper",
  },
  "Внутри бежевый/карамельный оттенок": {
    ro: "Interior în nuanțe bej/caramel",
    en: "Beige/caramel interior",
  },
  "Casual, city, office, базовый гардероб": {
    ro: "Casual, city, office, garderobă de bază",
    en: "Casual, city, office, core wardrobe",
  },
  "Удобный формат 2-в-1: сумка + внутренний карман/косметичка": {
    ro: "Format practic 2-în-1: geantă + buzunar/organizator interior",
    en: "Handy 2-in-1 format: bag + inner pouch/cosmetic bag",
  },
  "Duo Tote Bag": { ro: "Duo Tote Bag", en: "Duo Tote Bag" },
  Отделения: { ro: "Compartimente", en: "Compartments" },
  Особенность: { ro: "Caracteristică", en: "Feature" },
  Форма: { ro: "Formă", en: "Shape" },
};

const colors: Record<string, Partial<Record<Locale, string>>> = {
  "Чёрный": { ro: "Negru", en: "Black" },
  "Коньячный": { ro: "Coniac", en: "Cognac" },
  "Коричневый": { ro: "Maro", en: "Brown" },
  "Бежевый": { ro: "Bej", en: "Beige" },
  "Песочный": { ro: "Nisipiu", en: "Sand" },
  "Бордовый": { ro: "Bordeaux", en: "Burgundy" },
  "Синий": { ro: "Albastru", en: "Blue" },
  "Зелёный": { ro: "Verde", en: "Green" },
  "Серый": { ro: "Gri", en: "Grey" },
  "Пудровый": { ro: "Roz pudrat", en: "Powder pink" },
  Black: { ro: "Negru", en: "Black" },
  Pink: { ro: "Roz", en: "Pink" },
  Cognac: { ro: "Coniac", en: "Cognac" },
  Taupe: { ro: "Taupe", en: "Taupe" },
  Camel: { ro: "Camel", en: "Camel" },
  "Cherry Red": { ro: "Roșu cireș", en: "Cherry red" },
  "Deep Burgundy": { ro: "Burgundy intens", en: "Deep burgundy" },
  "Off-White": { ro: "Alb cald", en: "Off-white" },
  White: { ro: "Alb", en: "White" },
  "Light Blue": { ro: "Albastru deschis", en: "Light blue" },
  Blue: { ro: "Albastru", en: "Blue" },
  Brown: { ro: "Maro", en: "Brown" },
  Orange: { ro: "Portocaliu", en: "Orange" },
  "Dark Chocolate": { ro: "Dark chocolate", en: "Dark chocolate" },
  "Dusty Blue": { ro: "Dusty blue", en: "Dusty blue" },
  "Dusty Pink": { ro: "Dusty pink", en: "Dusty pink" },
  "Dusty Turquoise": { ro: "Dusty turquoise", en: "Dusty turquoise" },
  "Forest Green": { ro: "Forest green", en: "Forest green" },
  Blush: { ro: "Blush", en: "Blush" },
  Plum: { ro: "Plum", en: "Plum" },
  Magenta: { ro: "Magenta", en: "Magenta" },
  "Natural Beige": { ro: "Natural beige", en: "Natural beige" },
  Mokko: { ro: "Mokko", en: "Mokko" },
  "Red Orange": { ro: "Red orange", en: "Red orange" },
  Ivory: { ro: "Ivory", en: "Ivory" },
  Gold: { ro: "Auriu", en: "Gold" },
  Silver: { ro: "Argintiu", en: "Silver" },
  "Silver Metallic": { ro: "Argintiu metalizat", en: "Silver metallic" },
  "Pale Yellow": { ro: "Galben pal", en: "Pale yellow" },
  "Light Grey": { ro: "Gri deschis", en: "Light grey" },
  Grey: { ro: "Gri", en: "Grey" },
  "Sage Green": { ro: "Sage green", en: "Sage green" },
};

/**
 * Product titles follow the "Имя — тип/форма сумки" format (e.g. "Amelie — компактная сумка-багет").
 * The invented name stays the same across locales; only the descriptive part is translated.
 */
const productTitles: Record<string, Partial<Record<Locale, string>>> = {
  "Mirelle — сумка на плечо из замши": { ro: "Mirelle — geantă de umăr din piele întoarsă", en: "Mirelle — suede shoulder bag" },
  "Adriana — сумка на плечо из гладкой кожи": { ro: "Adriana — geantă de umăr din piele netedă", en: "Adriana — smooth leather shoulder bag" },
  "Fiorella — плетёная сумка-тоут": { ro: "Fiorella — geantă tote împletită", en: "Fiorella — woven tote bag" },
  "Ondine — плетёная сумка-шоппер": { ro: "Ondine — shopper împletit", en: "Ondine — woven shopper bag" },
  "Marbella — сумка-шоппер из замши": { ro: "Marbella — shopper din piele întoarsă", en: "Marbella — suede shopper bag" },
  "Positano — летняя сумка-тоут с плетением": { ro: "Positano — geantă tote de vară cu împletitură", en: "Positano — summer tote bag with woven detail" },
  "Capri — плетёная пляжная сумка-тоут": { ro: "Capri — geantă tote de plajă împletită", en: "Capri — woven beach tote bag" },
  "Ortigia — тоут с каркасным силуэтом": { ro: "Ortigia — geantă tote cu siluetă tip cage", en: "Ortigia — cage-frame tote bag" },
  "Perla — мини-сумка с верхней ручкой": { ro: "Perla — mini geantă cu mâner superior", en: "Perla — mini top-handle bag" },
  "Talia — классическая сумка на плечо": { ro: "Talia — geantă de umăr clasică", en: "Talia — classic shoulder bag" },
  "Vittoria — классическая сумка-тоут": { ro: "Vittoria — geantă tote clasică", en: "Vittoria — classic tote bag" },
  "Romina — сумка-боулинг": { ro: "Romina — geantă bowling", en: "Romina — bowling bag" },
  "Odette — сумка с металлической рамкой": { ro: "Odette — geantă cu ramă metalică", en: "Odette — metal-frame bag" },
  "Amara — сумка-хобо": { ro: "Amara — geantă hobo", en: "Amara — hobo bag" },
  "Liora — сумка-хобо": { ro: "Liora — geantă hobo", en: "Liora — hobo bag" },
  "Serena — сумка-хобо из гладкой кожи": { ro: "Serena — geantă hobo din piele netedă", en: "Serena — smooth leather hobo bag" },
  "Camelia — компактная сумка с верхней ручкой": { ro: "Camelia — geantă compactă cu mâner superior", en: "Camelia — compact top-handle bag" },
  "Selene — сумка-полумесяц на плечо": { ro: "Selene — geantă semilună de umăr", en: "Selene — crescent shoulder bag" },
  "Faustine — дорожная сумка-тоут": { ro: "Faustine — geantă tote de călătorie", en: "Faustine — travel tote bag" },
  "Marisol — плетёная сумка-хобо": { ro: "Marisol — geantă hobo împletită", en: "Marisol — woven hobo bag" },
  "Ibiza — пляжная сумка-тоут с бахромой": { ro: "Ibiza — geantă tote de plajă cu franjuri", en: "Ibiza — fringed beach tote bag" },
  "Provence — плетёная сумка-тоут в винтажном стиле": { ro: "Provence — geantă tote împletită în stil vintage", en: "Provence — vintage-style woven tote bag" },
  "Taormina — плетёная сумка веерообразной формы": { ro: "Taormina — geantă împletită în formă de evantai", en: "Taormina — fan-shaped woven bag" },
  "Cuore — плетёная сумка с ручками в форме сердца": { ro: "Cuore — geantă împletită cu mânere în formă de inimă", en: "Cuore — woven bag with heart-shaped handles" },
  "Ravello — плетёная сумка-мешок": { ro: "Ravello — geantă sac împletită", en: "Ravello — woven bucket bag" },
  "Sirmione — плетёная vanity-сумка кроссбоди": { ro: "Sirmione — geantă vanity crossbody împletită", en: "Sirmione — woven vanity crossbody bag" },
  "Elodie — сумка через плечо": { ro: "Elodie — geantă crossbody", en: "Elodie — crossbody bag" },
  "Corinne — фактурная сумка через плечо": { ro: "Corinne — geantă crossbody texturată", en: "Corinne — textured crossbody bag" },
  "Luna — сумка-полумесяц": { ro: "Luna — geantă semilună", en: "Luna — crescent bag" },
  "Valentina — архитектурная сумка-тоут": { ro: "Valentina — geantă tote arhitecturală", en: "Valentina — architectural tote bag" },
  "Coralie — сумка-мешок с драпировкой": { ro: "Coralie — geantă sac cu drapaj", en: "Coralie — draped pouch bag" },
  "Beatrice — структурированная сумка-тоут": { ro: "Beatrice — geantă tote structurată", en: "Beatrice — structured tote bag" },
  "Milena — плетёная сумка-хобо": { ro: "Milena — geantă hobo împletită", en: "Milena — woven hobo bag" },
  "Adele — базовая сумка на плечо": { ro: "Adele — geantă de umăr esențială", en: "Adele — essential shoulder bag" },
  "Genevieve — сумка-тоут из телячьей кожи": { ro: "Genevieve — geantă tote din piele de vițel", en: "Genevieve — calf leather tote bag" },
  "Capucine — сумка-пауч": { ro: "Capucine — geantă pouch", en: "Capucine — pouch bag" },
  "Violaine — кожаная сумка-тоут": { ro: "Violaine — geantă tote din piele", en: "Violaine — leather tote bag" },
  "Claudine — классическая кожаная сумка-тоут": { ro: "Claudine — geantă tote clasică din piele", en: "Claudine — classic leather tote bag" },
  "Fabienne — винтажная соломенная сумка-тоут": { ro: "Fabienne — geantă tote vintage din paie", en: "Fabienne — vintage straw tote bag" },
  "Nerina — мягкая сумка-мешок": { ro: "Nerina — geantă sac moale", en: "Nerina — soft pouch bag" },
  "Solenne — сумка-багет": { ro: "Solenne — geantă baghetă", en: "Solenne — baguette bag" },
  "Ottavia — структурная сумка с пряжкой": { ro: "Ottavia — geantă structurată cu cataramă", en: "Ottavia — structured bag with buckle" },
  "Anouk — мини-сумка через плечо на цепочке": { ro: "Anouk — mini geantă crossbody cu lănțișor", en: "Anouk — mini chain crossbody bag" },
  "Sabina — большой шопер": { ro: "Sabina — shopper mare", en: "Sabina — large shopper bag" },
  "Iris — женский рюкзак": { ro: "Iris — rucsac damă", en: "Iris — women's backpack" },
  "Cosima — деловой портфель": { ro: "Cosima — servietă office", en: "Cosima — business briefcase" },
  "Delphine — сумка через плечо с карманами": { ro: "Delphine — geantă crossbody cu buzunare", en: "Delphine — crossbody bag with pockets" },
  "Estelle — клатч на цепочке": { ro: "Estelle — clutch cu lănțișor", en: "Estelle — chain clutch" },
  "Renata — дорожная сумка": { ro: "Renata — geantă de călătorie", en: "Renata — travel bag" },
  "Flora — поясная сумка": { ro: "Flora — geantă de talie", en: "Flora — belt bag" },
  "Verona — сумка-мешок на затяжке": { ro: "Verona — geantă sac cu șnur", en: "Verona — drawstring pouch bag" },
  "Alba — большая сумка-шоппер": { ro: "Alba — shopper mare", en: "Alba — large shopper bag" },
  "Tosca — компактная сумка через плечо": { ro: "Tosca — geantă crossbody compactă", en: "Tosca — compact crossbody bag" },
  "Bianca — сумка-хобо на плечо": { ro: "Bianca — geantă hobo de umăr", en: "Bianca — hobo shoulder bag" },
  "Camille — сумка-хобо на молнии": { ro: "Camille — geantă hobo cu fermoar", en: "Camille — zip hobo bag" },
  "Marcella — фактурная сумка-тоут": { ro: "Marcella — geantă tote texturată", en: "Marcella — textured tote bag" },
  "Isadora — сумка-сэтчел": { ro: "Isadora — geantă satchel", en: "Isadora — satchel bag" },
  "Chiara — структурированная сумка": { ro: "Chiara — geantă structurată", en: "Chiara — structured bag" },
  "Alessia — сумка-шоппер": { ro: "Alessia — geantă shopper", en: "Alessia — shopper bag" },
  "Martina — сумка-тоут на плечо": { ro: "Martina — geantă tote de umăr", en: "Martina — shoulder tote bag" },
  "Simona — мягкая сумка-хобо": { ro: "Simona — geantă hobo moale", en: "Simona — soft hobo bag" },
  "Elise — мини-сумка-тоут 2-в-1": { ro: "Elise — mini geantă tote 2-în-1", en: "Elise — mini 2-in-1 tote bag" },
  "Noemi — структурированная сумка-шоппер": { ro: "Noemi — shopper structurat", en: "Noemi — structured shopper bag" },
  "Ilaria — сумка-багет": { ro: "Ilaria — geantă baghetă", en: "Ilaria — baguette bag" },
  "Silvana — сумка с драпировкой и клапаном": { ro: "Silvana — geantă cu drapaj și clapetă", en: "Silvana — draped flap bag" },
  "Antonella — прямоугольная сумка": { ro: "Antonella — geantă rectangulară", en: "Antonella — rectangular bag" },
  "Graziella — сумка-тоут на утяжках": { ro: "Graziella — geantă tote cu șnururi laterale", en: "Graziella — drawstring tote bag" },
  "Marguerite — сумка-полумесяц с клапаном": { ro: "Marguerite — geantă semilună cu clapetă", en: "Marguerite — crescent flap bag" },
  "Emmeline — структурированная сумка с замком": { ro: "Emmeline — geantă structurată cu încuietoare", en: "Emmeline — structured bag with turn-lock" },
  "Josephine — сумка на плечо с пряжкой": { ro: "Josephine — geantă de umăr cu cataramă", en: "Josephine — shoulder bag with buckle" },
  "Seraphine — сумка-тоут с косметичкой": { ro: "Seraphine — geantă tote cu trusă cosmetică", en: "Seraphine — tote bag with pouch" },
  "Cortina — плетёная сумка на молнии": { ro: "Cortina — geantă împletită cu fermoar", en: "Cortina — woven zip bag" },
  "Volterra — компактная плетёная сумка": { ro: "Volterra — geantă împletită compactă", en: "Volterra — compact woven bag" },
  "Ischia — плетёная сумка с замком-защёлкой": { ro: "Ischia — geantă împletită cu clichet", en: "Ischia — woven turn-lock bag" },
  "Procida — плетёная сумка-ведро на шнурке": { ro: "Procida — geantă bucket împletită cu șnur", en: "Procida — woven drawstring bucket bag" },
  "Sperlonga — круглая плетёная сумка-ведро": { ro: "Sperlonga — geantă bucket rotundă împletită", en: "Sperlonga — round woven bucket bag" },
  "Margaux — плетёная сумка с кристальным акцентом": { ro: "Margaux — geantă împletită cu accent din cristal", en: "Margaux — woven bag with crystal accent" },
  "Avignon — плетёная сумка с чехлом": { ro: "Avignon — geantă împletită cu husă", en: "Avignon — woven bag with pouch" },
  "Honfleur — плетёная сумка-хобо с кожаными звеньями": { ro: "Honfleur — geantă hobo împletită cu inele din piele", en: "Honfleur — woven hobo bag with leather links" },
  "Deauville — компактная сумка с металлизированной отделкой": { ro: "Deauville — geantă compactă cu finisaj metalizat", en: "Deauville — compact bag with metallic trim" },
  "Annecy — плетёная сумка с фактурной кожей": { ro: "Annecy — geantă împletită cu piele texturată", en: "Annecy — woven bag with textured leather" },
  "Giverny — структурированная сумка с контрастной окантовкой": { ro: "Giverny — geantă structurată cu contur contrastant", en: "Giverny — structured bag with contrast trim" },
  "Biarritz — трапециевидная сумка с контрастной окантовкой": { ro: "Biarritz — geantă trapezoidală cu contur contrastant", en: "Biarritz — trapeze bag with contrast trim" },
  "Trieste — сумка-хобо полумесяцем": { ro: "Trieste — geantă hobo semilună", en: "Trieste — crescent hobo bag" },
  "Sienna — сумка-хобо полумесяцем из гладкой кожи": { ro: "Sienna — geantă hobo semilună din piele netedă", en: "Sienna — smooth leather crescent hobo bag" },
  "Colette — сумка на плечо с клапаном на замке": { ro: "Colette — geantă de umăr cu clapetă și încuietoare", en: "Colette — turn-lock flap shoulder bag" },
  "Lucerne — сумка-тоут с косметичкой и замком": { ro: "Lucerne — geantă tote cu trusă și încuietoare", en: "Lucerne — tote bag with pouch and turn-lock" },
  "Amelie — компактная сумка-багет": { ro: "Amelie — geantă baghetă compactă", en: "Amelie — compact baguette bag" },
  "Claire — компактная сумка-багет": { ro: "Claire — geantă baghetă compactă", en: "Claire — compact baguette bag" },
  "Paloma — сумка с фермуаром": { ro: "Paloma — geantă cu fermuar", en: "Paloma — kiss-lock bag" },
  "Leonie — вязаная сумка-тоут": { ro: "Leonie — geantă tote tricotată", en: "Leonie — knitted tote bag" },
  "Giuliana — плетёная сумка-тоут": { ro: "Giuliana — geantă tote împletită", en: "Giuliana — woven tote bag" },
  "Giada — плетёная сумка-тоут": { ro: "Giada — geantă tote împletită", en: "Giada — woven tote bag" },
  "Filippa — плетёная сумка-тоут": { ro: "Filippa — geantă tote împletită", en: "Filippa — woven tote bag" },
  "Luciana — плетёная сумка через плечо": { ro: "Luciana — geantă crossbody împletită", en: "Luciana — woven crossbody bag" },
  "Ines — плетёная сумка-хобо": { ro: "Ines — geantă hobo împletită", en: "Ines — woven hobo bag" },
  "Paola — плетёная сумка с клапаном": { ro: "Paola — geantă împletită cu clapă", en: "Paola — woven flap bag" },
  "Greta — сумка-тоут с замком": { ro: "Greta — geantă tote cu încuietoare", en: "Greta — turn-lock tote bag" },
  "Francesca — кошелёк на молнии": { ro: "Francesca — portofel cu fermoar", en: "Francesca — zip-around wallet" },
  "Giulietta — кошелёк-гармошка на молнии": { ro: "Giulietta — portofel acordeon cu fermoar", en: "Giulietta — accordion zip wallet" },
  "Nerissa — сумка на короткой ручке": { ro: "Nerissa — geantă cu mâner scurt", en: "Nerissa — top handle bag" },
  "Fabrizia — мини-тоут": { ro: "Fabrizia — mini tote", en: "Fabrizia — mini tote bag" },
  "Lucrezia — сумка хобо на плечо": { ro: "Lucrezia — geantă hobo de umăr", en: "Lucrezia — hobo shoulder bag" },
  "Ginevra — тоут из вязаного полотна": { ro: "Ginevra — geantă tote tricotată", en: "Ginevra — knitted tote bag" },
  "Allegra — сумка-тоут на плечо": { ro: "Allegra — geantă tote de umăr", en: "Allegra — tote shoulder bag" },
  "Luna — мягкая сумка хобо": { ro: "Luna — geantă hobo moale", en: "Luna — soft hobo bag" },
  "Bettina — сумка на плечо с пряжкой": { ro: "Bettina — geantă de umăr cu cataramă", en: "Bettina — buckle shoulder bag" },
  "Perrine — багет на плечо": { ro: "Perrine — geantă baghetă de umăr", en: "Perrine — shoulder baguette bag" },
  "Anaelle — компактный багет": { ro: "Anaelle — geantă baghetă compactă", en: "Anaelle — compact baguette bag" },
  "Ninette — структурная сумка с контрастной окантовкой": { ro: "Ninette — geantă structurată cu bordură contrastantă", en: "Ninette — structured bag with contrast trim" },
  "Thea — структурная сумка с поворотным замком": { ro: "Thea — geantă structurată cu încuietoare rotativă", en: "Thea — structured turn-lock bag" },
  "Colline — сумка хобо полумесяцем": { ro: "Colline — geantă hobo semilună", en: "Colline — crescent hobo bag" },
  "Elara — кожаная сумка полумесяцем": { ro: "Elara — geantă semilună din piele", en: "Elara — leather crescent bag" },
  "Maelle — тоут на завязках": { ro: "Maelle — geantă tote cu șnur", en: "Maelle — drawstring tote bag" },
  "Livia — сумка полумесяц на плечо": { ro: "Livia — geantă semilună de umăr", en: "Livia — half-moon shoulder bag" },
  "Cassia — клатч с рамочным замком": { ro: "Cassia — clutch cu încuietoare tip cadru", en: "Cassia — kiss-lock clutch" },
  "Aurea — прямоугольная сумка в руке": { ro: "Aurea — geantă dreptunghiulară de mână", en: "Aurea — rectangular handbag" },
  "Halle — сумка-сэтчел": { ro: "Halle — geantă satchel", en: "Halle — satchel bag" },
  "Romilly — структурная сумка в руке": { ro: "Romilly — geantă structurată de mână", en: "Romilly — structured handbag" },
  "Vespera — структурный шоппер-тоут": { ro: "Vespera — geantă shopper structurată", en: "Vespera — structured shopper tote" },
  "Marielle — тоут с косметичкой": { ro: "Marielle — geantă tote cu trusă cosmetică", en: "Marielle — tote bag with pouch" },
  "Fiorenza — сумка-тоут": { ro: "Fiorenza — geantă tote", en: "Fiorenza — tote bag" },
  "Loretta — тоут с клапаном на замке": { ro: "Loretta — geantă tote cu clapă și încuietoare", en: "Loretta — turn-lock flap tote bag" },
  "Cressida — тоут с планкой на замке": { ro: "Cressida — geantă tote cu clapetă și încuietoare", en: "Cressida — turn-lock placket tote bag" },
  "Palmira — сумка с поворотным замком": { ro: "Palmira — geantă cu încuietoare rotativă", en: "Palmira — turn-lock top handle bag" },
  "Amabel — сумка хобо на молнии": { ro: "Amabel — geantă hobo cu fermoar", en: "Amabel — zip hobo bag" },
  "Ottilie — гладкий компактный багет": { ro: "Ottilie — geantă baghetă compactă netedă", en: "Ottilie — smooth compact baguette bag" },
  "Perlette — сумка на плечо с клапаном": { ro: "Perlette — geantă de umăr cu clapă", en: "Perlette — flap shoulder bag" },
  "Rosalind — гладкая хобо полумесяцем": { ro: "Rosalind — geantă hobo semilună netedă", en: "Rosalind — smooth crescent hobo bag" },
  "Solaine — сумка с драпированным клапаном": { ro: "Solaine — geantă cu clapă drapată", en: "Solaine — draped flap bag" },
  "Adalina — сумка-шоппер": { ro: "Adalina — geantă shopper", en: "Adalina — shopper bag" },
  "Elowen — сумка-мешок с плетёным основанием": { ro: "Elowen — geantă sac cu bază împletită", en: "Elowen — drawstring bucket bag" },
  "Fantine — хобо с плетёным основанием": { ro: "Fantine — geantă hobo cu bază împletită", en: "Fantine — woven-base hobo bag" },
  "Garance — структурная сумка с плетёным основанием": { ro: "Garance — geantă structurată cu bază împletită", en: "Garance — structured bag with woven base" },
  "Herminie — круглая сумка-мешок": { ro: "Herminie — geantă sac rotundă", en: "Herminie — round bucket bag" },
  "Isolde — сумка с плетёным основанием и замком": { ro: "Isolde — geantă cu bază împletită și încuietoare", en: "Isolde — woven-base turn-lock bag" },
  "Jacinta — компактная структурная сумка на молнии": { ro: "Jacinta — geantă structurată compactă cu fermoar", en: "Jacinta — compact structured zip bag" },
  "Kalina — структурная сумка на молнии": { ro: "Kalina — geantă structurată cu fermoar", en: "Kalina — structured zip bag" },
  "Lisette — тоут с пряжкой на ручке": { ro: "Lisette — geantă tote cu cataramă pe mâner", en: "Lisette — buckle handle tote bag" },
  "Manon — плетёная хобо полумесяцем": { ro: "Manon — geantă hobo semilună împletită", en: "Manon — woven crescent hobo bag" },
  "Noriane — плетёная сумка с клапаном": { ro: "Noriane — geantă împletită cu clapă", en: "Noriane — woven flap top handle bag" },
  "Oriane — тоут с овальными ручками": { ro: "Oriane — geantă tote cu mânere ovale", en: "Oriane — oval handle tote bag" },
  "Celia — тоут с овальными ручками": { ro: "Celia — geantă tote cu mânere ovale", en: "Celia — oval handle tote bag" },
  "Pernelle — структурная сумка с декоративной вставкой": { ro: "Pernelle — geantă structurată cu detaliu decorativ", en: "Pernelle — structured bag with crystal accent" },
  "Aveline — сумка с плетёной панелью": { ro: "Aveline — geantă cu panou împletit", en: "Aveline — woven panel top handle bag" },
  "Cendrine — тоут со спиральным плетением": { ro: "Cendrine — geantă tote cu împletitură spirală", en: "Cendrine — spiral-weave tote bag" },
  "Dorine — плетёная сумка треугольной формы": { ro: "Dorine — geantă triunghiulară împletită", en: "Dorine — triangular woven bag" },
  "Gwenaelle — плетёная сумка кроссбоди": { ro: "Gwenaelle — geantă crossbody împletită", en: "Gwenaelle — woven crossbody bag" },
  "Helena — плетёная сумка на плечо": { ro: "Helena — geantă de umăr împletită", en: "Helena — woven shoulder bag" },
  "Celeste — плетёная сумка-тоут": { ro: "Celeste — geantă tote împletită", en: "Celeste — woven tote bag" },
  "Vivienne — сумка-тоут": { ro: "Vivienne — geantă tote", en: "Vivienne — tote bag" },
  "Nadine — кошелёк на молнии": { ro: "Nadine — portofel cu fermoar", en: "Nadine — zip wallet" },
  "Suzette — картхолдер": { ro: "Suzette — portcard", en: "Suzette — card holder" },
  "Brielle — ключница": { ro: "Brielle — port-chei", en: "Brielle — key holder" },
  "Camea — косметичка": { ro: "Camea — trusă cosmetică", en: "Camea — cosmetic pouch" },
  "Noelle — обложка для паспорта": { ro: "Noelle — copertă pentru pașaport", en: "Noelle — passport cover" },
  "Amalia — ремень": { ro: "Amalia — curea", en: "Amalia — belt" },
  "Zelie — подвеска для сумки": { ro: "Zelie — breloc pentru geantă", en: "Zelie — bag charm" },
  "Aimee — подарочный набор: кошелёк и картхолдер": { ro: "Aimee — set cadou: portofel și portcard", en: "Aimee — gift set: wallet and card holder" },
  "Rosalie — кошелёк на кнопке": { ro: "Rosalie — portofel cu capsă", en: "Rosalie — snap wallet" },
};

type ProductLocalizedCopy = {
  title?: Partial<Record<Locale, string>>;
  description?: Partial<Record<Locale, string>>;
  highlights?: Partial<Record<Locale, string[]>>;
};

const productCopyBySlug: Record<string, ProductLocalizedCopy> = {
  "premium-leather-kelly-shoulder-bag-black": {
    "title": {
      "ru": "Кожаная сумка Kelly на плечо",
      "ro": "Geantă de umăr din piele, stil Kelly",
      "en": "Premium Leather Kelly Shoulder Bag"
    },
    "description": {
      "ru": "Кожаная сумка Kelly на плечо. Модель выполнена из натуральной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă de umăr din piele, stil Kelly este o geantă de umăr din piele naturală, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Premium Leather Kelly Shoulder Bag is a shoulder bag crafted from natural leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "woven-leather-shopper-tote-black": {
    "title": {
      "ru": "Ondine — плетёная сумка-шоппер",
      "ro": "Ondine — shopper împletit",
      "en": "Ondine — woven shopper bag"
    },
    "description": {
      "ru": "Ondine — плетёная сумка-шоппер. Модель выполнена из плетёной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Мягкий силуэт и выразительная фактура легко вписываются в повседневный гардероб.\n\nЗакрытие на кожаном шнурке. Внутреннее пространство рассчитано на телефон, кошелёк, ключи и косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Ondine — shopper împletit din piele, creat pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta moale și textura împletită se integrează ușor în garderoba de zi cu zi.\n\nÎnchidere cu șnur din piele. Interiorul este gândit pentru telefon, portofel, chei și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Ondine — woven leather shopper bag designed for work, city errands and days when you need to carry more. The soft silhouette and woven texture integrate easily into an everyday wardrobe.\n\nLeather drawstring closure. The interior fits a phone, wallet, keys and cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "premium-woven-beach-tote-bag-natural-black": {
    "title": {
      "ru": "Capri — плетёная пляжная сумка-тоут",
      "ro": "Capri — geantă tote de plajă împletită",
      "en": "Capri — woven beach tote bag"
    },
    "description": {
      "ru": "Capri — плетёная пляжная сумка-тоут с кожаными ручками, золотой фурнитурой и полукруглым силуэтом — для курорта, города и путешествий.\n\nПросторное отделение с внутренним карманом на молнии вмещает телефон, кошелёк, косметику и документы. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Capri — geantă tote de plajă împletită, cu mânere din piele, accesorii aurii și siluetă semicirculară — pentru stațiune, oraș și călătorii.\n\nCompartimentul încăpător, cu buzunar interior cu fermoar, încăpe telefon, portofel, cosmetice și documente. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Capri — woven beach tote with leather handles, gold hardware and a semi-circular silhouette — for holidays, city days and travel.\n\nThe roomy interior with a zip pocket fits a phone, wallet, cosmetics and documents. Available to order, delivery in 7–14 days."
    }
  },
  "milano-cage-tote-bag-black-red": {
    "title": {
      "ru": "Ortigia — тоут с каркасным силуэтом",
      "ro": "Ortigia — geantă tote cu siluetă tip cage",
      "en": "Ortigia — cage-frame tote bag"
    },
    "description": {
      "ru": "Ortigia — тоут с каркасным силуэтом. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Ortigia — geantă tote cu siluetă tip cage este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Ortigia — cage-frame tote bag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "mini-elegance-top-handle-bag-white": {
    "title": {
      "ru": "Мини-сумка с верхней ручкой",
      "ro": "Geantă mini cu mâner superior",
      "en": "Mini Elegance Top Handle Bag"
    },
    "description": {
      "ru": "Мини-сумка с верхней ручкой. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă mini cu mâner superior este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Mini Elegance Top Handle Bag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "milano-classic-shoulder-bag-black": {
    "title": {
      "ru": "Классическая сумка на плечо Milano",
      "ro": "Geantă clasică de umăr Milano",
      "en": "Milano Classic Shoulder Bag"
    },
    "description": {
      "ru": "Классическая сумка на плечо Milano. Модель выполнена из натуральной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nПрактичная магнитная фиксация. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă clasică de umăr Milano este o geantă de umăr din piele naturală, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFixare magnetică practică. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Milano Classic Shoulder Bag is a shoulder bag crafted from natural leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPractical magnetic fastening. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "classic-leather-tote-bag-black": {
    "title": {
      "ru": "Claudine — классическая кожаная сумка-тоут",
      "ro": "Claudine — geantă tote clasică din piele",
      "en": "Claudine — classic leather tote bag"
    },
    "description": {
      "ru": "Claudine — классическая кожаная сумка-тоут с поворотным замком, двойными ручками и строгим силуэтом — для работы, деловых встреч и повседневной носки.\n\nПросторное отделение вмещает документы, планшет, кошелёк и повседневные мелочи. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Claudine — geantă tote clasică din piele, cu încuietoare rotativă, mânere duble și siluetă strictă — pentru birou, întâlniri de afaceri și purtare zilnică.\n\nCompartimentul încăpător încăpe documente, tabletă, portofel și accesorii zilnice. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Claudine — classic leather tote with a turn-lock closure, double handles and a structured silhouette — for work, business meetings and everyday wear.\n\nThe roomy interior fits documents, a tablet, a wallet and everyday essentials. Available to order, delivery in 7–14 days."
    }
  },
  "classic-leather-bowling-bag-black": {
    "title": {
      "ru": "Romina — сумка-боулинг",
      "ro": "Romina — geantă bowling",
      "en": "Romina — bowling bag"
    },
    "description": {
      "ru": "Romina — сумка-боулинг. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Romina — geantă bowling este o geantă bowling din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Romina — bowling bag is a bowling bag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "vintage-frame-leather-handbag-burgundy": {
    "title": {
      "ru": "Odette — сумка с металлической рамкой",
      "ro": "Odette — geantă cu ramă metalică",
      "en": "Odette — metal-frame bag"
    },
    "description": {
      "ru": "Odette — сумка с металлической рамкой. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Odette — geantă cu ramă metalică este o geantă rectangulară din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Odette — metal-frame bag is a rectangular bag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-hobo-bag-pink": {
    "title": {
      "ru": "Amara — сумка-хобо",
      "ro": "Amara — geantă hobo",
      "en": "Amara — hobo bag"
    },
    "description": {
      "ru": "Amara — сумка-хобо. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Amara — geantă hobo este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Amara — hobo bag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-hobo-bag-taupe": {
    "title": {
      "ru": "Liora — сумка-хобо",
      "ro": "Liora — geantă hobo",
      "en": "Liora — hobo bag"
    },
    "description": {
      "ru": "Liora — сумка-хобо. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Мягкий силуэт и золотая фурнитура выглядят собранно, но не перегружают образ.\n\nМагнитная застёжка с декоративным замком. Внутреннее пространство рассчитано на телефон, кошелёк, ключи и косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Liora — geantă hobo din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta moale și finisajele aurii rămân elegante fără exces.\n\nÎnchidere magnetică cu detaliu decorativ tip încuietoare. Interiorul este gândit pentru telefon, portofel, chei și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Liora — hobo bag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The soft silhouette and gold hardware feel polished without looking heavy.\n\nMagnetic closure with a decorative lock detail. The interior fits a phone, wallet, keys and cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-hobo-bag-smooth-black": {
    "title": {
      "ru": "Serena — сумка-хобо из гладкой кожи",
      "ro": "Serena — geantă hobo din piele netedă",
      "en": "Serena — smooth leather hobo bag"
    },
    "description": {
      "ru": "Serena — сумка-хобо из гладкой кожи. Модель создана для повседневного гардероба, офиса и спокойных вечерних выходов. Плавные линии и лаконичный силуэт легко вписываются в базовый гардероб.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на телефон, кошелёк, ключи и косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Serena — geantă hobo din piele netedă, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Liniile fluide și silueta simplă se integrează ușor în ținutele de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru telefon, portofel, chei și cosmetice. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Serena — smooth leather hobo bag designed for everyday styling, office looks and relaxed evening plans. Clean lines and a soft shape integrate easily into a considered wardrobe.\n\nSecure zip closure. The interior fits a phone, wallet, keys and cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "structured-leather-top-handle-bag-black": {
    "title": {
      "ru": "Структурная кожаная сумка с верхней ручкой",
      "ro": "Geantă structurată din piele cu mâner superior",
      "en": "Structured Leather Top Handle Bag"
    },
    "description": {
      "ru": "Структурная кожаная сумка с верхней ручкой. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă structurată din piele cu mâner superior este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Structured Leather Top Handle Bag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "premium-leather-crescent-shoulder-bag-black": {
    "title": {
      "ru": "Кожаная сумка-полумесяц на плечо",
      "ro": "Geantă de umăr din piele, formă semilună",
      "en": "Premium Leather Crescent Shoulder Bag"
    },
    "description": {
      "ru": "Кожаная сумка-полумесяц на плечо. Модель выполнена из натуральной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă de umăr din piele, formă semilună este o geantă de umăr din piele naturală, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Premium Leather Crescent Shoulder Bag is a shoulder bag crafted from natural leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "premium-leather-travel-tote-bag-black": {
    "title": {
      "ru": "Faustine — дорожная сумка-тоут",
      "ro": "Faustine — geantă tote de călătorie",
      "en": "Faustine — travel tote bag"
    },
    "description": {
      "ru": "Faustine — дорожная сумка-тоут. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Faustine — geantă tote de călătorie este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Faustine — travel tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "premium-woven-hobo-bag-natural-beige": {
    "title": {
      "ru": "Плетёная сумка хобо",
      "ro": "Geantă hobo împletită",
      "en": "Premium Woven Hobo Bag"
    },
    "description": {
      "ru": "Плетёная сумка хобо. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă hobo împletită este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Premium Woven Hobo Bag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "premium-fringe-beach-tote-bag-natural-beige": {
    "title": {
      "ru": "Ibiza — пляжная сумка-тоут с бахромой",
      "ro": "Ibiza — geantă tote de plajă cu franjuri",
      "en": "Ibiza — fringed beach tote bag"
    },
    "description": {
      "ru": "Ibiza — пляжная сумка-тоут с бахромой в стиле boho-chic: премиальное плетение, декоративная бахрома по периметру и натуральные бамбуковые ручки.\n\nПросторное отделение для прогулок, отдыха и путешествий. Лёгкая конструкция и натуральные материалы — для тёплого сезона каждый день. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Ibiza — geantă tote de plajă cu franjuri în stil boho-chic: împletitură premium, franjuri decorative pe contur și mânere din bambus natural.\n\nCompartiment încăpător pentru plimbări, vacanță și călătorii. Construcție ușoară și materiale naturale — pentru sezonul cald, zi de zi. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Ibiza — fringed beach tote in boho-chic style: premium handwoven texture, decorative fringe around the perimeter and natural bamboo handles.\n\nRoomy interior for strolls, holidays and travel. Lightweight build and natural materials for warm-season everyday wear. Available to order, delivery in 7–14 days."
    }
  },
  "premium-vintage-straw-tote-bag-natural-beige": {
    "title": {
      "ru": "Fabienne — винтажная соломенная сумка-тоут",
      "ro": "Fabienne — geantă tote vintage din paie",
      "en": "Fabienne — vintage straw tote bag"
    },
    "description": {
      "ru": "Fabienne — винтажная соломенная сумка-тоут с квадратными ручками, кожаными деталями и съёмным ремнём — для лета, города и отдыха.\n\nЛёгкое плетение и вместительное отделение внутри. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Fabienne — geantă tote vintage din paie, cu mânere pătrate, detalii din piele și curea detașabilă — pentru vară, oraș și vacanță.\n\nÎmpletitură ușoară și compartiment interior încăpător. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Fabienne — vintage straw tote with square handles, leather details and a detachable strap — for summer, city days and holidays.\n\nLight handwoven texture and a roomy interior. Available to order, delivery in 7–14 days."
    }
  },
  "premium-fan-straw-handbag-natural-cognac": {
    "title": {
      "ru": "Соломенная сумка веерной формы",
      "ro": "Geantă din paie în formă de evantai",
      "en": "Premium Fan Straw Handbag"
    },
    "description": {
      "ru": "Соломенная сумка веерной формы. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă din paie în formă de evantai este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Premium Fan Straw Handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "premium-woven-bucket-bag-cream": {
    "title": {
      "ru": "Плетёная сумка-ведро",
      "ro": "Geantă bucket împletită",
      "en": "Premium Woven Bucket Bag"
    },
    "description": {
      "ru": "Плетёная сумка-ведро. Модель выполнена из плетёной фактуры с кожаными деталями и создана для летних образов, прогулок и расслабленного smart casual. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nМягкое закрытие на шнурке. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă bucket împletită este o geantă bucket din textură împletită cu detalii din piele, creată pentru ținute de vară, plimbări și smart casual relaxat. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere lejeră cu șnur. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Premium Woven Bucket Bag is a bucket bag crafted from a woven texture with leather details, designed for summer looks, walks and relaxed smart casual styling. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRelaxed drawstring closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "premium-woven-vanity-crossbody-bag-black": {
    "title": {
      "ru": "Sirmione — плетёная vanity-сумка кроссбоди",
      "ro": "Sirmione — geantă vanity crossbody împletită",
      "en": "Sirmione — woven vanity crossbody bag"
    },
    "description": {
      "ru": "Sirmione — плетёная vanity-сумка кроссбоди с двойной молнией, верхней ручкой и съёмным ремнём — для отдыха, путешествий и летних прогулок.\n\nКомпактное отделение вмещает телефон, кошелёк, ключи и косметику. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Sirmione — geantă vanity crossbody împletită, cu fermoar dublu, mâner superior și curea detașabilă — pentru vacanță, călătorii și plimbări de vară.\n\nCompartimentul compact încăpe telefon, portofel, chei și cosmetice. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Sirmione — woven vanity crossbody with a double zip, top handle and detachable strap — for holidays, travel and summer strolls.\n\nThe compact interior fits a phone, wallet, keys and cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "elegant-leather-crossbody-bag-white": {
    "title": {
      "ru": "Элегантная кожаная сумка кроссбоди",
      "ro": "Geantă crossbody elegantă din piele",
      "en": "Elegant Leather Crossbody Bag"
    },
    "description": {
      "ru": "Элегантная кожаная сумка кроссбоди. Модель выполнена из натуральной кожи и создана для прогулок, поездок и динамичных дней, когда руки должны оставаться свободными. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nПрактичная магнитная фиксация. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă crossbody elegantă din piele este o geantă crossbody din piele naturală, creată pentru plimbări, călătorii și zile dinamice în care mâinile rămân libere. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFixare magnetică practică. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Elegant Leather Crossbody Bag is a crossbody bag crafted from natural leather, designed for walks, travel and busy days when your hands should stay free. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPractical magnetic fastening. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-crossbody-bag-beige": {
    "title": {
      "ru": "Элегантная кожаная сумка кроссбоди",
      "ro": "Geantă crossbody elegantă din piele",
      "en": "Elegant Leather Crossbody Bag"
    },
    "description": {
      "ru": "Элегантная кожаная сумка кроссбоди. Модель выполнена из натуральной кожи и создана для прогулок, поездок и динамичных дней, когда руки должны оставаться свободными. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă crossbody elegantă din piele este o geantă crossbody din piele naturală, creată pentru plimbări, călătorii și zile dinamice în care mâinile rămân libere. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Elegant Leather Crossbody Bag is a crossbody bag crafted from natural leather, designed for walks, travel and busy days when your hands should stay free. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "elegant-leather-moon-bag-cognac": {
    "title": {
      "ru": "Elara — кожаная сумка полумесяцем",
      "ro": "Elara — geantă semilună din piele",
      "en": "Elara — leather crescent bag"
    },
    "description": {
      "ru": "Elara — кожаная сумка полумесяцем из фактурной кожи с дугообразным силуэтом и золотистой фурнитурой — для повседневных и вечерних образов.\n\nКороткая ручка и съёмный регулируемый ремень, застёжка на молнии. Внутри — телефон, кошелёк, ключи и косметика. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Elara — geantă semilună din piele texturată, cu siluetă arcuită și finisaje aurii — pentru ținute de zi și de seară.\n\nMâner scurt și curea detașabilă reglabilă, fermoar sigur. Interiorul încăpe telefon, portofel, chei și cosmetice. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Elara — leather crescent bag in textured leather with an arched silhouette and gold hardware — for day-to-evening looks.\n\nShort handle and detachable adjustable strap, zip closure. Fits a phone, wallet, keys and cosmetics. Available to order, delivery in 7–14 days."
    }
  },
  "elegant-leather-tote-bag-black": {
    "title": {
      "ru": "Violaine — кожаная сумка-тоут",
      "ro": "Violaine — geantă tote din piele",
      "en": "Violaine — leather tote bag"
    },
    "description": {
      "ru": "Violaine — кожаная сумка-тоут из кожи и замши с архитектурным силуэтом, двойными ручками и съёмным ремнём — для работы, города и поездок.\n\nПросторное отделение вмещает документы, кошелёк, косметику и повседневные мелочи. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Violaine — geantă tote din piele și piele întoarsă, cu siluetă arhitecturală, mânere duble și curea detașabilă — pentru birou, oraș și călătorii.\n\nCompartimentul încăpător încăpe documente, portofel, cosmetice și accesorii zilnice. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Violaine — leather and suede tote with an architectural silhouette, double handles and a detachable strap — for work, city days and travel.\n\nThe roomy interior fits documents, a wallet, cosmetics and everyday essentials. Available to order, delivery in 7–14 days."
    }
  },
  "pouch-bag-black-onyx": {
    "title": {
      "ru": "Capucine — сумка-пауч",
      "ro": "Capucine — geantă pouch",
      "en": "Capucine — pouch bag"
    },
    "description": {
      "ru": "Capucine — сумка-пауч из телячьей кожи с мягкими драпированными линиями и золотистой фурнитурой на ручке — для повседневных и вечерних образов.\n\nЗастёжка на молнии, вместительное отделение внутри. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Capucine — geantă pouch din piele de vițel, cu linii drapate moi și finisaje aurii pe mâner — pentru ținute de zi și de seară.\n\nFermoar sigur, compartiment interior încăpător. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Capucine — calf leather pouch bag with soft draped lines and gold hardware on the handle — for day-to-evening looks.\n\nZip closure and a roomy interior. Available to order, delivery in 7–14 days."
    }
  },
  "structured-leather-tote-bag-burgundy": {
    "title": {
      "ru": "Beatrice — структурированная сумка-тоут",
      "ro": "Beatrice — geantă tote structurată",
      "en": "Beatrice — structured tote bag"
    },
    "description": {
      "ru": "Beatrice — структурированная сумка-тоут. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Beatrice — geantă tote structurată este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Beatrice — structured tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "woven-leather-hobo-bag-black": {
    "title": {
      "ru": "Плетёная кожаная сумка хобо",
      "ro": "Geantă hobo din piele împletită",
      "en": "Woven Leather Hobo Bag"
    },
    "description": {
      "ru": "Плетёная кожаная сумка хобо. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă hobo din piele împletită este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Woven Leather Hobo Bag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "the-essential-shoulder-bag-tan-cognac": {
    "title": {
      "ru": "Adele — базовая сумка на плечо",
      "ro": "Adele — geantă de umăr esențială",
      "en": "Adele — essential shoulder bag"
    },
    "description": {
      "ru": "Adele — базовая сумка на плечо. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Adele — geantă de umăr esențială este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Adele — essential shoulder bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "calf-leather-tote-bag-off-white": {
    "title": {
      "ru": "Genevieve — сумка-тоут из телячьей кожи",
      "ro": "Genevieve — geantă tote din piele de vițel",
      "en": "Genevieve — calf leather tote bag"
    },
    "description": {
      "ru": "Genevieve — сумка-тоут из телячьей кожи с зернистой фактурой, магнитной застёжкой и регулируемым ремнём — для работы, города и поездок.\n\nПросторное отделение вмещает документы, планшет, кошелёк и повседневные мелочи. Модель доступна под заказ: доставка 7–14 дней.",
      "ro": "Genevieve — geantă tote din piele de vițel, cu textură granulată, închidere magnetică și curea reglabilă — pentru birou, oraș și călătorii.\n\nCompartimentul încăpător încăpe documente, tabletă, portofel și accesorii zilnice. Model disponibil la comandă: livrare 7–14 zile.",
      "en": "Genevieve — calf leather tote with a pebbled grain, magnetic closure and adjustable strap — for work, city days and travel.\n\nThe roomy interior fits documents, a tablet, a wallet and everyday essentials. Available to order, delivery in 7–14 days."
    }
  },
  "aurelia-soft-hobo-cognac": {
    "title": {
      "ru": "Мягкая сумка-хобо Aurelia из зернистой кожи коньячного цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Мягкая сумка-хобо Aurelia из зернистой кожи коньячного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nПрактичная магнитная фиксация. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFixare magnetică practică. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPractical magnetic fastening. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "aurelia-baguette-black": {
    "title": {
      "ru": "Сумка-багет Aurelia на короткой ручке из гладкой кожи чёрного цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Сумка-багет Aurelia на короткой ручке из гладкой кожи чёрного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "vionetta-structured-bag-beige": {
    "title": {
      "ru": "Структурная сумка Vionetta с крупной пряжкой из кожи бежевого цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Структурная сумка Vionetta с крупной пряжкой из кожи бежевого цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "vionetta-mini-crossbody-rose": {
    "title": {
      "ru": "Мини-сумка Vionetta через плечо на цепочке пудрового цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Мини-сумка Vionetta через плечо на цепочке пудрового цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-tote-sand": {
    "title": {
      "ru": "Большой шопер SÓRA Atelier из плотной кожи песочного цвета",
      "ro": "Geantă tote",
      "en": "Tote bag"
    },
    "description": {
      "ru": "Большой шопер SÓRA Atelier из плотной кожи песочного цвета. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-backpack-black": {
    "title": {
      "ru": "Женский рюкзак SÓRA Atelier из мягкой кожи чёрного цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Женский рюкзак SÓRA Atelier из мягкой кожи чёрного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "castello-briefcase-brown": {
    "title": {
      "ru": "Деловой портфель Castello из гладкой кожи коричневого цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Деловой портфель Castello из гладкой кожи коричневого цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "marrone-crossbody-cognac": {
    "title": {
      "ru": "Сумка через плечо Marrone с двумя карманами коньячного цвета",
      "ro": "Geantă de umăr",
      "en": "Shoulder bag"
    },
    "description": {
      "ru": "Сумка через плечо Marrone с двумя карманами коньячного цвета. Модель выполнена из фактурной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă de umăr este o geantă de umăr din piele texturată, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Shoulder bag is a shoulder bag crafted from textured leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "marrone-clutch-bordo": {
    "title": {
      "ru": "Клатч Marrone на цепочке из гладкой кожи бордового цвета",
      "ro": "Clutch",
      "en": "Clutch"
    },
    "description": {
      "ru": "Клатч Marrone на цепочке из гладкой кожи бордового цвета. Модель выполнена из натуральной кожи и создана для вечера, мероприятий и минималистичных выходов с самым необходимым. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nКомпактный формат для выхода. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Clutch este un clutch din piele naturală, creată pentru seară, evenimente și ieșiri minimaliste cu strictul necesar. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat compact pentru ieșiri. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Clutch is a clutch crafted from natural leather, designed for evenings, events and minimal outings with just the essentials. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nCompact format for going out. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "aurelia-travel-bag-brown": {
    "title": {
      "ru": "Дорожная сумка Aurelia из плотной кожи коричневого цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Дорожная сумка Aurelia из плотной кожи коричневого цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-belt-bag-black": {
    "title": {
      "ru": "Поясная сумка SÓRA Atelier из гладкой кожи чёрного цвета",
      "ro": "Geantă crossbody",
      "en": "Crossbody bag"
    },
    "description": {
      "ru": "Поясная сумка SÓRA Atelier из гладкой кожи чёрного цвета. Модель выполнена из натуральной кожи и создана для прогулок, поездок и динамичных дней, когда руки должны оставаться свободными. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nСвободные руки в движении. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă crossbody este o geantă crossbody din piele naturală, creată pentru plimbări, călătorii și zile dinamice în care mâinile rămân libere. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nMâini libere în mișcare. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Crossbody bag is a crossbody bag crafted from natural leather, designed for walks, travel and busy days when your hands should stay free. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nHands-free ease on the move. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "vionetta-bucket-green": {
    "title": {
      "ru": "Сумка-мешок Vionetta на затяжке из кожи зелёного цвета",
      "ro": "Geantă",
      "en": "Handbag"
    },
    "description": {
      "ru": "Сумка-мешок Vionetta на затяжке из кожи зелёного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "aurelia-big-shopper-grey": {
    "title": {
      "ru": "Большая сумка Aurelia с двумя ручками серого цвета",
      "ro": "Geantă tote",
      "en": "Tote bag"
    },
    "description": {
      "ru": "Большая сумка Aurelia с двумя ручками серого цвета. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "marrone-crossbody-navy": {
    "title": {
      "ru": "Небольшая сумка через плечо Marrone синего цвета",
      "ro": "Geantă de umăr",
      "en": "Shoulder bag"
    },
    "description": {
      "ru": "Небольшая сумка через плечо Marrone синего цвета. Модель выполнена из натуральной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Geantă de umăr este o geantă de umăr din piele naturală, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Shoulder bag is a shoulder bag crafted from natural leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "womens-pebbled-leather-turn-lock-strap-tote-bag": {
    "title": {
      "ru": "Greta — сумка-тоут с замком",
      "ro": "Greta — geantă tote",
      "en": "Greta — tote bag"
    },
    "description": {
      "ru": "Greta — сумка-тоут с замком. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Greta — geantă tote este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Greta — tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-compact-woven-panel-metallic-top-handle-bag": {
    "title": {
      "ru": "Nerissa — сумка на короткой ручке",
      "ro": "Nerissa — geantă",
      "en": "Nerissa — handbag"
    },
    "description": {
      "ru": "Nerissa — сумка на короткой ручке. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Nerissa — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Nerissa — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-duo-mini-tote-bag": {
    "title": {
      "ru": "Fabrizia — мини-тоут",
      "ro": "Fabrizia — geantă",
      "en": "Fabrizia — handbag"
    },
    "description": {
      "ru": "Fabrizia — мини-тоут. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Fabrizia — geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Fabrizia — handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-hobo-shoulder-bag": {
    "title": {
      "ru": "Lucrezia — сумка хобо на плечо",
      "ro": "Lucrezia — geantă",
      "en": "Lucrezia — handbag"
    },
    "description": {
      "ru": "Lucrezia — сумка хобо на плечо. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Lucrezia — geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Lucrezia — handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-knitted-openwork-panel-tote-bag": {
    "title": {
      "ru": "Ginevra — тоут из вязаного полотна",
      "ro": "Ginevra — geantă tote",
      "en": "Ginevra — tote bag"
    },
    "description": {
      "ru": "Ginevra — тоут из вязаного полотна. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Ginevra — geantă tote este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Ginevra — tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-leather-tote-shoulder-bag": {
    "title": {
      "ru": "Allegra — сумка-тоут на плечо",
      "ro": "Allegra — geantă tote",
      "en": "Allegra — tote bag"
    },
    "description": {
      "ru": "Allegra — сумка-тоут на плечо. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Allegra — geantă tote este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Allegra — tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-luna-soft-hobo-bag": {
    "title": {
      "ru": "Luna — мягкая сумка хобо",
      "ro": "Luna — geantă",
      "en": "Luna — handbag"
    },
    "description": {
      "ru": "Luna — мягкая сумка хобо. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Luna — geantă este o geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Luna — handbag is a handbag crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-accordion-buckle-shoulder-bag": {
    "title": {
      "ru": "Bettina — сумка на плечо с пряжкой",
      "ro": "Bettina — geantă de umăr cu cataramă",
      "en": "Bettina — buckle shoulder bag"
    },
    "description": {
      "ru": "Bettina — сумка на плечо с пряжкой. Модель выполнена из фактурной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Bettina — geantă de umăr este o geantă de umăr din piele texturată, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Bettina — shoulder bag is a shoulder bag crafted from textured leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-baguette-bag": {
    "title": {
      "ru": "Perrine — багет на плечо",
      "ro": "Perrine — geantă",
      "en": "Perrine — handbag"
    },
    "description": {
      "ru": "Perrine — багет на плечо. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Perrine — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Perrine — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-compact-baguette-bag": {
    "title": {
      "ru": "Anaelle — компактный багет",
      "ro": "Anaelle — geantă",
      "en": "Anaelle — handbag"
    },
    "description": {
      "ru": "Anaelle — компактный багет. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Anaelle — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Anaelle — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-contrast-trim-structured-top-handle-bag": {
    "title": {
      "ru": "Ninette — структурная сумка с контрастной окантовкой",
      "ro": "Ninette — geantă",
      "en": "Ninette — handbag"
    },
    "description": {
      "ru": "Ninette — структурная сумка с контрастной окантовкой. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Ninette — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Ninette — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-contrast-trim-turn-lock-structured-top-handle-bag": {
    "title": {
      "ru": "Thea — структурная сумка с поворотным замком",
      "ro": "Thea — geantă",
      "en": "Thea — handbag"
    },
    "description": {
      "ru": "Thea — структурная сумка с поворотным замком. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Thea — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Thea — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-crescent-hobo-bag": {
    "title": {
      "ru": "Colline — сумка хобо полумесяцем",
      "ro": "Colline — geantă",
      "en": "Colline — handbag"
    },
    "description": {
      "ru": "Colline — сумка хобо полумесяцем. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Colline — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Colline — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-drawstring-tote-bag": {
    "title": {
      "ru": "Maelle — тоут на завязках",
      "ro": "Maelle — geantă tote",
      "en": "Maelle — tote bag"
    },
    "description": {
      "ru": "Maelle — тоут на завязках. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nМягкое закрытие на шнурке. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Maelle — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere lejeră cu șnur. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Maelle — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRelaxed drawstring closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-half-moon-shoulder-bag": {
    "title": {
      "ru": "Livia — сумка полумесяц на плечо",
      "ro": "Livia — geantă de umăr",
      "en": "Livia — shoulder bag"
    },
    "description": {
      "ru": "Livia — сумка полумесяц на плечо. Модель выполнена из фактурной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Livia — geantă de umăr este o geantă de umăr din piele texturată, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Livia — shoulder bag is a shoulder bag crafted from textured leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-kiss-lock-pouch-bag-ivory": {
    "title": {
      "ru": "Cassia — клатч с рамочным замком",
      "ro": "Cassia — clutch cu încuietoare tip cadru",
      "en": "Cassia — kiss-lock clutch"
    },
    "description": {
      "ru": "Cassia — компактный клатч с рамочным замком. Модель выполнена из фактурной кожи с мягкой драпировкой и создана для вечера, мероприятий и минималистичных выходов. Силуэт собранный, но лёгкий — аксессуар не перегружает образ.\n\nКомпактный формат для выхода. Внутреннее пространство рассчитано на телефон, карты, помаду и мелочи. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Cassia — clutch compact cu încuietoare tip cadru. Model din piele texturată cu drapaj moale, creat pentru seară, evenimente și ieșiri minimaliste. Silueta rămâne elegantă fără să pară voluminoasă.\n\nFormat compact pentru ieșiri. Interiorul este gândit pentru telefon, carduri, ruj și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Cassia — compact kiss-lock clutch crafted from textured leather with a soft draped finish, designed for evenings, events and minimal outings. The silhouette feels polished without looking bulky.\n\nCompact format for going out. The interior fits a phone, cards, lipstick and small essentials. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-kiss-lock-pouch-bag-light-blue": {
    "title": {
      "ru": "Paloma — сумка с фермуаром",
      "ro": "Paloma — geantă cu fermuar",
      "en": "Paloma — kiss-lock bag"
    },
    "description": {
      "ru": "Paloma — структурная сумка с рамочным замком. Модель выполнена из фактурной кожи и создана для города, встреч и повседневных образов с акцентом на силуэт. Собранная форма и щёлкающая застёжка придают аксессуару характер.\n\nБольше объёма для ежедневных вещей — телефон, кошелёк, ключи и косметика. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Paloma — geantă structurată cu încuietoare tip cadru. Model din piele texturată, creat pentru oraș, întâlniri și ținute de zi cu zi cu accent pe siluetă. Forma bine definită și închiderea tip cadru îi dau personalitate.\n\nMai mult spațiu pentru lucrurile zilnice — telefon, portofel, chei și cosmetice. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Paloma — structured kiss-lock bag crafted from textured leather, designed for city days, meetings and everyday looks with a defined silhouette. The frame closure adds character without extra hardware.\n\nMore room for daily essentials — phone, wallet, keys and cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-rectangular-handbag": {
    "title": {
      "ru": "Aurea — прямоугольная сумка в руке",
      "ro": "Aurea — geantă",
      "en": "Aurea — handbag"
    },
    "description": {
      "ru": "Aurea — прямоугольная сумка в руке. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Aurea — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Aurea — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-satchel-bag": {
    "title": {
      "ru": "Halle — сумка-сэтчел",
      "ro": "Halle — geantă",
      "en": "Halle — handbag"
    },
    "description": {
      "ru": "Halle — сумка-сэтчел. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Halle — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Halle — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-structured-handbag": {
    "title": {
      "ru": "Romilly — структурная сумка в руке",
      "ro": "Romilly — geantă",
      "en": "Romilly — handbag"
    },
    "description": {
      "ru": "Romilly — структурная сумка в руке. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Romilly — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Romilly — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-structured-shopper-tote": {
    "title": {
      "ru": "Vespera — структурный шоппер-тоут",
      "ro": "Vespera — geantă tote",
      "en": "Vespera — tote bag"
    },
    "description": {
      "ru": "Vespera — структурный шоппер-тоут. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Vespera — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Vespera — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-structured-tote-bag-with-pouch": {
    "title": {
      "ru": "Marielle — тоут с коcmетичкой",
      "ro": "Marielle — geantă tote",
      "en": "Marielle — tote bag"
    },
    "description": {
      "ru": "Marielle — тоут с коcmетичкой. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Marielle — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Marielle — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-tote-bag": {
    "title": {
      "ru": "Fiorenza — сумка-тоут",
      "ro": "Fiorenza — geantă tote",
      "en": "Fiorenza — tote bag"
    },
    "description": {
      "ru": "Fiorenza — сумка-тоут. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Fiorenza — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Fiorenza — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-flap-shoulder-bag-black": {
    "title": {
      "ru": "Colette — сумка на плечо с клапаном на замке",
      "ro": "Colette — geantă de umăr cu clapetă și încuietoare",
      "en": "Colette — turn-lock flap shoulder bag"
    },
    "description": {
      "ru": "Colette — сумка на плечо с клапаном на замке. Модель выполнена из фактурной кожи и создана для городского дня, встреч и образов, где важны собранный силуэт и удобный доступ к вещам. Конвертный клапан и золотая фурнитура выглядят аккуратно и не перегружают образ.\n\nПлечевой ремень для комфортной носки. Внутри — контрастная красная подкладка и место для телефона, кошелька, ключей и косметики. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Colette — geantă de umăr cu clapetă și încuietoare rotativă. Model din piele texturată, creat pentru zile active în oraș, întâlniri și ținute în care contează un siluet bine definit. Clapeta tip plic și finisajele aurii rămân elegante fără exces.\n\nCurea de umăr pentru purtare comodă. Interior cu captuseală roșie contrastantă, suficient pentru telefon, portofel, chei și cosmetice. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Colette — turn-lock flap shoulder bag crafted from textured leather, designed for city days, meetings and outfits where a polished silhouette matters. The envelope flap and gold hardware feel refined without looking heavy.\n\nShoulder strap for comfortable wear. Inside, a contrasting red lining offers room for a phone, wallet, keys and cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-flap-shoulder-tote-bag": {
    "title": {
      "ru": "Loretta — тоут с клапаном на замке",
      "ro": "Loretta — geantă tote",
      "en": "Loretta — tote bag"
    },
    "description": {
      "ru": "Loretta — тоут с клапаном на замке. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Loretta — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Loretta — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-placket-tote-with-pouch": {
    "title": {
      "ru": "Cressida — тоут с планкой на замке",
      "ro": "Cressida — geantă tote",
      "en": "Cressida — tote bag"
    },
    "description": {
      "ru": "Cressida — тоут с планкой на замке. Модель выполнена из фактурной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Cressida — geantă tote este o geantă tote din piele texturată, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Cressida — tote bag is a tote bag crafted from textured leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-turn-lock-top-handle-bag": {
    "title": {
      "ru": "Palmira — сумка с поворотным замком",
      "ro": "Palmira — geantă",
      "en": "Palmira — handbag"
    },
    "description": {
      "ru": "Palmira — сумка с поворотным замком. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Palmira — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Palmira — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-pebbled-leather-zip-hobo-bag": {
    "title": {
      "ru": "Amabel — сумка хобо на молнии",
      "ro": "Amabel — geantă",
      "en": "Amabel — handbag"
    },
    "description": {
      "ru": "Amabel — сумка хобо на молнии. Модель выполнена из фактурной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Amabel — geantă este o geantă din piele texturată, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Amabel — handbag is a handbag crafted from textured leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-smooth-leather-compact-baguette-bag": {
    "title": {
      "ru": "Ottilie — гладкий компактный багет",
      "ro": "Ottilie — geantă",
      "en": "Ottilie — handbag"
    },
    "description": {
      "ru": "Ottilie — гладкий компактный багет. Модель выполнена из гладкой кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Ottilie — geantă este o geantă din piele netedă, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Ottilie — handbag is a handbag crafted from smooth leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-smooth-leather-contrast-trim-flap-shoulder-bag": {
    "title": {
      "ru": "Perlette — сумка на плечо с клапаном",
      "ro": "Perlette — geantă de umăr",
      "en": "Perlette — shoulder bag"
    },
    "description": {
      "ru": "Perlette — сумка на плечо с клапаном. Модель выполнена из гладкой кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nПрактичная магнитная фиксация. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Perlette — geantă de umăr este o geantă de umăr din piele netedă, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFixare magnetică practică. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Perlette — shoulder bag is a shoulder bag crafted from smooth leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPractical magnetic fastening. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-smooth-leather-crescent-hobo-bag": {
    "title": {
      "ru": "Rosalind — гладкая хобо полумесяцем",
      "ro": "Rosalind — geantă",
      "en": "Rosalind — handbag"
    },
    "description": {
      "ru": "Rosalind — гладкая хобо полумесяцем. Модель выполнена из гладкой кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Rosalind — geantă este o geantă din piele netedă, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Rosalind — handbag is a handbag crafted from smooth leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-soft-leather-draped-flap-bag": {
    "title": {
      "ru": "Solaine — сумка с драпированным клапаном",
      "ro": "Solaine — geantă de umăr",
      "en": "Solaine — shoulder bag"
    },
    "description": {
      "ru": "Solaine — сумка с драпированным клапаном. Модель выполнена из натуральной кожи и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Solaine — geantă de umăr este o geantă de umăr din piele naturală, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Solaine — shoulder bag is a shoulder bag crafted from natural leather, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-tote-shopper-bag": {
    "title": {
      "ru": "Adalina — сумка-шоппер",
      "ro": "Adalina — geantă tote",
      "en": "Adalina — tote bag"
    },
    "description": {
      "ru": "Adalina — сумка-шоппер. Модель выполнена из натуральной кожи и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Adalina — geantă tote este o geantă tote din piele naturală, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Adalina — tote bag is a tote bag crafted from natural leather, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-drawstring-bucket-bag": {
    "title": {
      "ru": "Elowen — сумка-мешок с плетёным основанием",
      "ro": "Elowen — geantă bucket",
      "en": "Elowen — bucket bag"
    },
    "description": {
      "ru": "Elowen — сумка-мешок с плетёным основанием. Модель выполнена из плетёной фактуры с кожаными деталями и создана для летних образов, прогулок и расслабленного smart casual. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nМягкое закрытие на шнурке. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Elowen — geantă bucket este o geantă bucket din textură împletită cu detalii din piele, creată pentru ținute de vară, plimbări și smart casual relaxat. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere lejeră cu șnur. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Elowen — bucket bag is a bucket bag crafted from a woven texture with leather details, designed for summer looks, walks and relaxed smart casual styling. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRelaxed drawstring closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-leather-link-handle-hobo-bag": {
    "title": {
      "ru": "Fantine — хобо с плетёным основанием",
      "ro": "Fantine — geantă",
      "en": "Fantine — handbag"
    },
    "description": {
      "ru": "Fantine — хобо с плетёным основанием. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Fantine — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Fantine — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-open-top-structured-bag-with-pouch": {
    "title": {
      "ru": "Garance — структурная сумка с плетёным основанием",
      "ro": "Garance — geantă tote",
      "en": "Garance — tote bag"
    },
    "description": {
      "ru": "Garance — структурная сумка с плетёным основанием. Модель выполнена из плетёной фактуры с кожаными деталями и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Garance — geantă tote este o geantă tote din textură împletită cu detalii din piele, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Garance — tote bag is a tote bag crafted from a woven texture with leather details, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-round-bucket-bag": {
    "title": {
      "ru": "Herminie — круглая сумка-мешок",
      "ro": "Herminie — geantă bucket",
      "en": "Herminie — bucket bag"
    },
    "description": {
      "ru": "Herminie — круглая сумка-мешок. Модель выполнена из плетёной фактуры с кожаными деталями и создана для летних образов, прогулок и расслабленного smart casual. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nМягкий объём без лишней строгости. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Herminie — geantă bucket este o geantă bucket din textură împletită cu detalii din piele, creată pentru ținute de vară, plimbări și smart casual relaxat. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nVolum moale, fără rigiditate excesivă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Herminie — bucket bag is a bucket bag crafted from a woven texture with leather details, designed for summer looks, walks and relaxed smart casual styling. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSoft volume without excess structure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-turn-lock-top-handle-bag": {
    "title": {
      "ru": "Isolde — сумка с плетёным основанием и замком",
      "ro": "Isolde — geantă",
      "en": "Isolde — handbag"
    },
    "description": {
      "ru": "Isolde — сумка с плетёным основанием и замком. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nАккуратный поворотный замок. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Isolde — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncuietoare rotativă elegantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Isolde — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nPolished turn-lock closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-zip-top-compact-structured-bag": {
    "title": {
      "ru": "Jacinta — компактная структурная сумка на молнии",
      "ro": "Jacinta — geantă",
      "en": "Jacinta — handbag"
    },
    "description": {
      "ru": "Jacinta — компактная структурная сумка на молнии. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Jacinta — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Jacinta — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-base-zip-top-structured-bag": {
    "title": {
      "ru": "Kalina — структурная сумка на молнии",
      "ro": "Kalina — geantă",
      "en": "Kalina — handbag"
    },
    "description": {
      "ru": "Kalina — структурная сумка на молнии. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Kalina — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Kalina — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-buckle-handle-tote-bag": {
    "title": {
      "ru": "Lisette — тоут с пряжкой на ручке",
      "ro": "Lisette — geantă tote",
      "en": "Lisette — tote bag"
    },
    "description": {
      "ru": "Lisette — тоут с пряжкой на ручке. Модель выполнена из плетёной фактуры с кожаными деталями и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Lisette — geantă tote este o geantă tote din textură împletită cu detalii din piele, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Lisette — tote bag is a tote bag crafted from a woven texture with leather details, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-crescent-hobo-bag": {
    "title": {
      "ru": "Manon — плетёная хобо полумесяцем",
      "ro": "Manon — geantă",
      "en": "Manon — handbag"
    },
    "description": {
      "ru": "Manon — плетёная хобо полумесяцем. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Manon — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Manon — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-flap-top-handle-bag": {
    "title": {
      "ru": "Noriane — плетёная сумка с клапаном",
      "ro": "Noriane — geantă",
      "en": "Noriane — handbag"
    },
    "description": {
      "ru": "Noriane — плетёная сумка с клапаном. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобная застёжка на кнопку. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Noriane — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere comodă cu capsă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Noriane — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nEasy snap closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-oval-handle-tote-bag": {
    "title": {
      "ru": "Oriane — тоут с овальными ручками",
      "ro": "Oriane — geantă tote",
      "en": "Oriane — tote bag"
    },
    "description": {
      "ru": "Oriane — тоут с овальными ручками. Модель выполнена из плетёной фактуры с кожаными деталями и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Oriane — geantă tote este o geantă tote din textură împletită cu detalii din piele, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Oriane — tote bag is a tote bag crafted from a woven texture with leather details, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-oval-handle-tote-bag-natural-tan": {
    "title": {
      "ru": "Celia — тоут с овальными ручками",
      "ro": "Celia — geantă tote cu mânere ovale",
      "en": "Celia — oval handle tote bag"
    },
    "description": {
      "ru": "Celia — тоут с овальными ручками и плетёной фактурой полотна. Лёгкий открытый силуэт подойдёт для повседневных выходов, прогулок и тёплого сезона.\n\nВнутри одно просторное отделение для телефона, кошелька, ключей и небольших аксессуаров. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Celia — geantă tote cu mânere ovale și textură împletită. Silueta lejeră, cu partea superioară deschisă, este potrivită pentru ținute de zi, plimbări și sezonul cald.\n\nInteriorul are un compartiment încăpător pentru telefon, portofel, chei și accesorii mici. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Celia — oval handle tote bag with a woven texture. The light open-top silhouette works for everyday outings, walks and warm-season styling.\n\nThe interior has one roomy compartment for a phone, wallet, keys and small accessories. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-panel-crystal-accent-structured-top-handle-bag": {
    "title": {
      "ru": "Pernelle — структурная сумка с декоративной вставкой",
      "ro": "Pernelle — geantă",
      "en": "Pernelle — handbag"
    },
    "description": {
      "ru": "Pernelle — структурная сумка с декоративной вставкой. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Pernelle — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Pernelle — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-panel-pebbled-leather-top-handle-bag": {
    "title": {
      "ru": "Aveline — сумка с плетёной панелью",
      "ro": "Aveline — geantă",
      "en": "Aveline — handbag"
    },
    "description": {
      "ru": "Aveline — сумка с плетёной панелью. Модель выполнена из плетёной фактуры с кожаными деталями и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУниверсальный силуэт для города. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Aveline — geantă este o geantă din textură împletită cu detalii din piele, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSiluetă versatilă pentru oraș. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Aveline — handbag is a handbag crafted from a woven texture with leather details, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nVersatile city-ready shape. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-spiral-panel-shoulder-tote-bag": {
    "title": {
      "ru": "Cendrine — тоут со спиральным плетением",
      "ro": "Cendrine — geantă tote",
      "en": "Cendrine — tote bag"
    },
    "description": {
      "ru": "Cendrine — тоут со спиральным плетением. Модель выполнена из плетёной фактуры с кожаными деталями и создана для работы, поездок по городу и дней, когда с собой нужно взять больше обычного. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nВместительный формат на каждый день. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Cendrine — geantă tote este o geantă tote din textură împletită cu detalii din piele, creată pentru birou, drumuri prin oraș și zile în care aveți nevoie de mai mult spațiu. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nFormat încăpător pentru fiecare zi. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Cendrine — tote bag is a tote bag crafted from a woven texture with leather details, designed for work, city errands and days when you need to carry more. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nRoomy format for everyday use. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-triangular-shoulder-bag": {
    "title": {
      "ru": "Dorine — плетёная сумка треугольной формы",
      "ro": "Dorine — geantă de umăr",
      "en": "Dorine — shoulder bag"
    },
    "description": {
      "ru": "Dorine — плетёная сумка треугольной формы. Модель выполнена из плетёной фактуры с кожаными деталями и создана для городского дня, встреч и образов, где важны свобода движения и аккуратный силуэт. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобно носить на плече. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Dorine — geantă de umăr este o geantă de umăr din textură împletită cu detalii din piele, creată pentru zile active în oraș, întâlniri și ținute în care contează libertatea de mișcare. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nSe poartă comod pe umăr. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Dorine — shoulder bag is a shoulder bag crafted from a woven texture with leather details, designed for city days, meetings and outfits where easy movement matters. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nComfortable on the shoulder. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-woven-zip-crossbody-bag": {
    "title": {
      "ru": "Gwenaelle — плетёная сумка кроссбоди",
      "ro": "Gwenaelle — geantă crossbody",
      "en": "Gwenaelle — crossbody bag"
    },
    "description": {
      "ru": "Gwenaelle — плетёная сумка кроссбоди. Модель выполнена из плетёной фактуры с кожаными деталями и создана для прогулок, поездок и динамичных дней, когда руки должны оставаться свободными. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Gwenaelle — geantă crossbody este o geantă crossbody din textură împletită cu detalii din piele, creată pentru plimbări, călătorii și zile dinamice în care mâinile rămân libere. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Gwenaelle — crossbody bag is a crossbody bag crafted from a woven texture with leather details, designed for walks, travel and busy days when your hands should stay free. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "pelle-nova-wallet-cognac": {
    "title": {
      "ru": "Женский кошелёк Pelle Nova на молнии коньячного цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Женский кошелёк Pelle Nova на молнии коньячного цвета. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "pelle-nova-cardholder-brown": {
    "title": {
      "ru": "Картхолдер Pelle Nova из натуральной кожи коричневого цвета",
      "ro": "Suport pentru carduri",
      "en": "Card holder"
    },
    "description": {
      "ru": "Картхолдер Pelle Nova из натуральной кожи коричневого цвета. Модель выполнена из натуральной кожи и создана для карт, документов и компактной организации в сумке. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nКомпактно помещается в сумку. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Suport pentru carduri este un suport pentru carduri din piele naturală, creată pentru carduri, documente și organizare compactă în geantă. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncape ușor în geantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Card holder is a card holder crafted from natural leather, designed for cards, documents and compact organization inside a bag. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nFits easily into a bag. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "marrone-keyholder-cognac": {
    "title": {
      "ru": "Ключница Marrone из кожи коньячного цвета",
      "ro": "Suport pentru carduri",
      "en": "Card holder"
    },
    "description": {
      "ru": "Ключница Marrone из кожи коньячного цвета. Модель выполнена из натуральной кожи и создана для карт, документов и компактной организации в сумке. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобная застёжка на кнопку. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Suport pentru carduri este un suport pentru carduri din piele naturală, creată pentru carduri, documente și organizare compactă în geantă. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere comodă cu capsă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Card holder is a card holder crafted from natural leather, designed for cards, documents and compact organization inside a bag. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nEasy snap closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-cosmetic-bag-beige": {
    "title": {
      "ru": "Коcmетичка SÓRA Atelier из мягкой кожи бежевого цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Коcmетичка SÓRA Atelier из мягкой кожи бежевого цвета. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "pelle-nova-passport-cover-bordo": {
    "title": {
      "ru": "Обложка для паспорта Pelle Nova бордового цвета",
      "ro": "Suport pentru carduri",
      "en": "Card holder"
    },
    "description": {
      "ru": "Обложка для паспорта Pelle Nova бордового цвета. Модель выполнена из натуральной кожи и создана для карт, документов и компактной организации в сумке. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nКомпактно помещается в сумку. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Suport pentru carduri este un suport pentru carduri din piele naturală, creată pentru carduri, documente și organizare compactă în geantă. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎncape ușor în geantă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Card holder is a card holder crafted from natural leather, designed for cards, documents and compact organization inside a bag. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nFits easily into a bag. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "pelle-nova-belt-black": {
    "title": {
      "ru": "Ремень Pelle Nova из гладкой кожи чёрного цвета",
      "ro": "Curea",
      "en": "Belt"
    },
    "description": {
      "ru": "Ремень Pelle Nova из гладкой кожи чёрного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nЛегко сочетается с базовым гардеробом. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Curea este o curea din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nUșor de integrat în garderoba de bază. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Belt is a belt crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nEasy to pair with a core wardrobe. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-bag-charm-cognac": {
    "title": {
      "ru": "Подвеска для сумки SÓRA Atelier из кожи коньячного цвета",
      "ro": "Accesoriu pentru geantă",
      "en": "Bag accessory"
    },
    "description": {
      "ru": "Подвеска для сумки SÓRA Atelier из кожи коньячного цвета. Модель выполнена из натуральной кожи и создана для повседневного гардероба, офиса и спокойных вечерних выходов. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nДобавляет сумке аккуратный акцент. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Accesoriu pentru geantă este un accesoriu pentru geantă din piele naturală, creată pentru garderoba de zi cu zi, birou și ieșiri de seară relaxate. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nAdaugă genții un accent rafinat. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Bag accessory is a bag accessory crafted from natural leather, designed for everyday styling, office looks and relaxed evening plans. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nAdds a refined accent to a bag. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "luma-gift-set-black": {
    "title": {
      "ru": "Подарочный набор SÓRA Atelier: кошелёк и картхолдер чёрного цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Подарочный набор SÓRA Atelier: кошелёк и картхолдер чёрного цвета. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nПродуманная организация внутри. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nOrganizare interioară bine gândită. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nThoughtful interior organization. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "marrone-womens-wallet-rose": {
    "title": {
      "ru": "Женский кошелёк Marrone на кнопке пудрового цвета",
      "ro": "Portofel pentru femei",
      "en": "Women's wallet"
    },
    "description": {
      "ru": "Женский кошелёк Marrone на кнопке пудрового цвета. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nУдобная застёжка на кнопку. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель доступна под заказ: срок доставки 7–14 дней.",
      "ro": "Portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere comodă cu capsă. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este disponibil la comandă: livrare în 7–14 zile.",
      "en": "Women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nEasy snap closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is available to order, with delivery in 7–14 days."
    }
  },
  "womens-full-grain-leather-zip-around-wallet": {
    "title": {
      "ru": "Francesca — кошелёк на молнии",
      "ro": "Francesca — portofel pentru femei",
      "en": "Francesca — women's wallet"
    },
    "description": {
      "ru": "Francesca — кошелёк на молнии. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Francesca — portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Francesca — women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  },
  "womens-vintage-accordion-zip-wallet": {
    "title": {
      "ru": "Giulietta — кошелёк-гармошка на молнии",
      "ro": "Giulietta — portofel pentru femei",
      "en": "Giulietta — women's wallet"
    },
    "description": {
      "ru": "Giulietta — кошелёк-гармошка на молнии. Модель выполнена из натуральной кожи и создана для аккуратного хранения карт, купюр и ежедневных мелочей. Силуэт выглядит собранно, но остаётся лёгким в повседневной носке: аксессуар не перегружает образ и хорошо сочетается с базовым гардеробом.\n\nНадёжная застёжка на молнии. Внутреннее пространство рассчитано на ежедневные вещи — телефон, кошелёк, ключи и небольшую косметику. Модель есть в наличии: доставим за 1–3 дня.",
      "ro": "Giulietta — portofel pentru femei este un portofel pentru femei din piele naturală, creată pentru organizarea cardurilor, bancnotelor și lucrurilor mici de zi cu zi. Silueta rămâne elegantă fără să pară rigidă, iar proporțiile sunt ușor de integrat în garderoba de zi cu zi.\n\nÎnchidere sigură cu fermoar. Interiorul este gândit pentru lucrurile esențiale: telefon, portofel, chei și mici accesorii. Modelul este în stoc: livrare în 1–3 zile.",
      "en": "Giulietta — women's wallet is a women's wallet crafted from natural leather, designed for keeping cards, notes and everyday small essentials neatly arranged. The silhouette feels polished without looking stiff, making it easy to style with a considered everyday wardrobe.\n\nSecure zip closure. The interior is made for daily essentials such as a phone, wallet, keys and small cosmetics. This style is in stock, with delivery in 1–3 days."
    }
  }
};

function resolveProductSlug(productOrTitle: Product | string | undefined): string | undefined {
  return typeof productOrTitle === "object" ? productOrTitle.slug : undefined;
}

function resolveProductTitle(productOrTitle: Product | string | undefined): string | undefined {
  return typeof productOrTitle === "object" ? productOrTitle.title : productOrTitle;
}

function getProductCopy(productOrTitle: Product | string | undefined): ProductLocalizedCopy | undefined {
  const slug = resolveProductSlug(productOrTitle);
  return slug ? productCopyBySlug[slug] : undefined;
}

export function localizeProductTitle(
  productOrTitle: Product | string | undefined,
  locale: Locale = defaultLocale,
): string {
  const title = resolveProductTitle(productOrTitle);
  if (!title) return "";
  const copy = getProductCopy(productOrTitle)?.title;
  if (copy?.[locale]) return copy[locale]!;
  if (locale === "ru") return title;
  return productTitles[title]?.[locale] ?? title;
}

export function localizeStaticText(value: string | undefined, locale: Locale = defaultLocale): string {
  if (!value) return "";
  if (locale === "ru") return value;

  const mapped =
    lookupSpecTranslation(value, locale, [text, specLabels, specValues, colors]) ??
    localizeMeasurement(value, locale);

  return mapped ?? value;
}

export function localizeColorName(color: ProductColor | string | undefined, locale: Locale = defaultLocale): string {
  const value = typeof color === "string" ? color : color?.name;
  if (!value) return "";
  return colors[value]?.[locale] ?? value;
}

export function localizeProductDescription(product: Product, locale: Locale = defaultLocale): string {
  const localized = productCopyBySlug[product.slug]?.description?.[locale];
  if (localized) return localized;
  if (locale === "ru" || !/[А-Яа-яЁё]/.test(product.description)) {
    return product.description;
  }
  const material = localizeStaticText(product.material, locale);
  if (locale === "ro") {
    return `${localizeProductTitle(product, locale)} este o piesă atent selectată pentru garderoba de zi cu zi, cu accent pe forma elegantă, materiale de calitate și detalii practice.

Modelul este realizat din ${material} și este potrivit pentru ținute casual, business sau de seară. După plasarea comenzii, echipa SÓRA confirmă disponibilitatea, culoarea aleasă și termenul de livrare.`;
  }
  return `${localizeProductTitle(product, locale)} is a carefully selected piece for an everyday wardrobe, focused on an elegant shape, quality materials and practical details.

The model is made from ${material} and works well for casual, business or evening looks. After you place an order, the SÓRA team confirms availability, selected color and delivery timing.`;
}

export function localizeProductHighlights(product: Product, locale: Locale = defaultLocale): string[] {
  const localized = productCopyBySlug[product.slug]?.highlights?.[locale];
  if (localized?.length) return localized;
  return (product.highlights ?? []).map((item) => localizeStaticText(item, locale));
}

export function localizeProductSpec(
  spec: { label: string; value: string },
  locale: Locale = defaultLocale,
): { label: string; value: string } {
  return {
    label: localizeStaticText(spec.label, locale),
    value: localizeStaticText(spec.value, locale),
  };
}

const hiddenProductSpecLabels = new Set([
  "Пол",
  "Плетение",
  "Конструкция",
  "Фактура",
  "Сезон",
]);

export function getVisibleProductSpecs(
  specs: { label: string; value: string }[] | undefined,
): { label: string; value: string }[] {
  return (specs ?? []).filter((spec) => !hiddenProductSpecLabels.has(spec.label));
}
