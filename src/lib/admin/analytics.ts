import {
  ordersCollection,
  productsCollection,
  usersCollection,
  wishlistsCollection,
} from "@/lib/mongodb";
import { normalizeOrderStatus } from "@/lib/admin/constants";
import { getSalesSeries } from "@/lib/admin/stats";

export interface MonthlySales {
  month: string;
  label: string;
  revenue: number;
  orders: number;
}

export interface ProductRank {
  slug: string;
  title: string;
  value: number;
}

export async function getOrdersSeries(days = 14) {
  const series = await getSalesSeries(days);
  return series.map((s) => ({ label: s.label, orders: s.orders }));
}

export async function getMonthlySales(months = 12): Promise<MonthlySales[]> {
  const orders = await ordersCollection();
  const since = new Date();
  since.setDate(1);
  since.setHours(0, 0, 0, 0);
  since.setMonth(since.getMonth() - (months - 1));

  const docs = await orders
    .find({ createdAt: { $gte: since } }, { projection: { total: 1, createdAt: 1, status: 1 } })
    .toArray();

  const buckets = new Map<string, { revenue: number; orders: number }>();
  for (let i = 0; i < months; i++) {
    const d = new Date(since);
    d.setMonth(since.getMonth() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    buckets.set(key, { revenue: 0, orders: 0 });
  }

  for (const o of docs) {
    const d = new Date(o.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const bucket = buckets.get(key);
    if (!bucket) continue;
    bucket.orders += 1;
    if (normalizeOrderStatus(o.status as string) !== "cancelled") {
      bucket.revenue += o.total ?? 0;
    }
  }

  return Array.from(buckets.entries()).map(([month, v]) => ({
    month,
    label: new Date(month + "-01").toLocaleDateString("ru-RU", { month: "short", year: "2-digit" }),
    revenue: v.revenue,
    orders: v.orders,
  }));
}

export async function getTopSellingProducts(limit = 10): Promise<ProductRank[]> {
  const products = await productsCollection();
  const docs = await products
    .find({ salesCount: { $gt: 0 } })
    .sort({ salesCount: -1 })
    .limit(limit)
    .toArray();
  return docs.map((p) => ({
    slug: p.slug,
    title: p.title,
    value: p.salesCount ?? 0,
  }));
}

export async function getMostViewedProducts(limit = 10): Promise<ProductRank[]> {
  const products = await productsCollection();
  const docs = await products
    .find({ viewCount: { $gt: 0 } })
    .sort({ viewCount: -1 })
    .limit(limit)
    .toArray();
  return docs.map((p) => ({
    slug: p.slug,
    title: p.title,
    value: p.viewCount ?? 0,
  }));
}

export async function getMostWishlistedProducts(limit = 10): Promise<ProductRank[]> {
  const wishlists = await wishlistsCollection();
  const agg = await wishlists
    .aggregate<{ _id: string; count: number }>([
      { $unwind: "$slugs" },
      { $group: { _id: "$slugs", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ])
    .toArray();

  const products = await productsCollection();
  const result: ProductRank[] = [];
  for (const row of agg) {
    const p = await products.findOne({ slug: row._id }, { projection: { title: 1 } });
    result.push({
      slug: row._id,
      title: p?.title ?? row._id,
      value: row.count,
    });
  }
  return result;
}

export async function getNewCustomersCount(days = 30): Promise<number> {
  const users = await usersCollection();
  const since = new Date();
  since.setDate(since.getDate() - days);
  return users.countDocuments({ createdAt: { $gte: since }, role: { $ne: "admin" } });
}