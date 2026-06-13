import type { Filter } from "mongodb";
import { productsCollection, ObjectId } from "@/lib/mongodb";
import type { ProductDoc, ProductStatus } from "@/lib/mongodb";

export interface AdminProductView {
  id: string;
  slug: string;
  title: string;
  brandSlug: string;
  section: "bags" | "accessories";
  categorySlug: string;
  price: number;
  oldPrice?: number;
  status: ProductStatus;
  inventory: number;
  images: string[];
  material: string;
  description: string;
  isNew: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface ProductInput {
  slug: string;
  title: string;
  brandSlug: string;
  section: "bags" | "accessories";
  categorySlug: string;
  price: number;
  oldPrice?: number;
  status: ProductStatus;
  inventory: number;
  images: string[];
  material: string;
  description: string;
  isNew: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ListProductsParams {
  search?: string;
  status?: ProductStatus | "all";
  page?: number;
  pageSize?: number;
}

export interface ListProductsResult {
  products: AdminProductView[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function listProducts(
  params: ListProductsParams = {},
): Promise<ListProductsResult> {
  const { search, status = "all", page = 1, pageSize = 20 } = params;
  const products = await productsCollection();

  const filter: Filter<ProductDoc> = {};
  if (status && status !== "all") filter.status = status;
  if (search && search.trim()) {
    const rx = new RegExp(escapeRegex(search.trim()), "i");
    filter.$or = [{ title: rx }, { slug: rx }, { brandSlug: rx }];
  }

  const total = await products.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const docs = await products
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((safePage - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return {
    products: docs.map(toView),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export async function getProductById(id: string): Promise<AdminProductView | null> {
  if (!ObjectId.isValid(id)) return null;
  const products = await productsCollection();
  const doc = await products.findOne({ _id: new ObjectId(id) });
  return doc ? toView(doc) : null;
}

export async function slugExists(slug: string, exceptId?: string): Promise<boolean> {
  const products = await productsCollection();
  const filter: Filter<ProductDoc> = { slug };
  if (exceptId && ObjectId.isValid(exceptId)) {
    filter._id = { $ne: new ObjectId(exceptId) };
  }
  const count = await products.countDocuments(filter);
  return count > 0;
}

export async function createProduct(input: ProductInput): Promise<string> {
  const products = await productsCollection();
  const now = new Date();
  const res = await products.insertOne({
    ...input,
    createdAt: now,
    updatedAt: now,
  });
  return res.insertedId.toString();
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const products = await productsCollection();
  const res = await products.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
  );
  return res.matchedCount > 0;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const products = await productsCollection();
  const res = await products.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}

export async function duplicateProduct(id: string): Promise<string | null> {
  if (!ObjectId.isValid(id)) return null;
  const products = await productsCollection();
  const doc = await products.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;

  let slug = `${doc.slug}-copy`;
  let n = 2;
  while (await slugExists(slug)) {
    slug = `${doc.slug}-copy-${n}`;
    n += 1;
  }

  const now = new Date();
  const { _id, createdAt, updatedAt, ...rest } = doc;
  void _id;
  void createdAt;
  void updatedAt;
  const res = await products.insertOne({
    ...rest,
    slug,
    title: `${doc.title} (копия)`,
    salesCount: 0,
    viewCount: 0,
    createdAt: now,
    updatedAt: now,
  });
  return res.insertedId.toString();
}

export async function incrementProductViewCount(slug: string): Promise<void> {
  const products = await productsCollection();
  await products.updateOne({ slug }, { $inc: { viewCount: 1 } });
}

export async function getLowStockProducts(threshold: number, limit = 8) {
  const products = await productsCollection();
  const docs = await products
    .find({ inventory: { $lte: threshold }, status: { $ne: "out_of_stock" } })
    .sort({ inventory: 1 })
    .limit(limit)
    .toArray();
  return docs.map((d) => ({
    id: d._id!.toString(),
    slug: d.slug,
    title: d.title,
    inventory: d.inventory,
    status: d.status,
  }));
}

function toView(doc: ProductDoc): AdminProductView {
  return {
    id: doc._id!.toString(),
    slug: doc.slug,
    title: doc.title,
    brandSlug: doc.brandSlug,
    section: doc.section,
    categorySlug: doc.categorySlug,
    price: doc.price,
    oldPrice: doc.oldPrice,
    status: doc.status,
    inventory: doc.inventory,
    images: doc.images ?? [],
    material: doc.material,
    description: doc.description,
    isNew: doc.isNew ?? false,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : null,
  };
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}