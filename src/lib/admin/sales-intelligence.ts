import {
  analyticsEventsCollection,
  ordersCollection,
  productsCollection,
  usersCollection,
  type AnalyticsEventType,
} from "@/lib/mongodb";
import { products as staticProducts } from "@/lib/data";
import type { ObjectId as MongoObjectId } from "mongodb";

const TZ = "Europe/Chisinau";

export interface IntelligenceKpis {
  visitorsToday: number;
  visitors7d: number;
  visitors30d: number;
  productViews: number;
  wishlistAdds: number;
  cartAdds: number;
  orders: number;
  siteConversion: number;
}

export interface IntelligenceProductRow {
  slug: string;
  productId?: string;
  title: string;
  imageSrc?: string;
  price: number;
  views: number;
  wishlistAdds: number;
  cartAdds: number;
  purchases: number;
  conversion: number;
  potentialSales: number;
  potentialRevenue: number;
  score: number;
  signals: string[];
}

export interface ProductRanking {
  topViewed?: IntelligenceProductRow;
  topWishlisted?: IntelligenceProductRow;
  topCarted?: IntelligenceProductRow;
  topSelling?: IntelligenceProductRow;
}

export interface FunnelStep {
  key: string;
  label: string;
  value: number;
  previousDrop: number;
}

export interface DailyMetric {
  label: string;
  visits: number;
  productViews: number;
  wishlistAdds: number;
  cartAdds: number;
  orders: number;
}

export interface TrafficSourceRow {
  source: string;
  visitors: number;
  visits: number;
}

export interface WishlistCustomerLead {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  productSlug: string;
  productId?: string;
  productTitle: string;
  adds: number;
  firstAddedAt: string;
  lastAddedAt: string;
}

export type IntelligencePeriod = "today" | "7d" | "30d" | "all";

export interface SalesIntelligenceDashboard {
  kpis: IntelligenceKpis;
  daily: DailyMetric[];
  popularProducts: IntelligenceProductRow[];
  highInterestLowPurchase: IntelligenceProductRow[];
  topViewed: IntelligenceProductRow[];
  missedRevenue: IntelligenceProductRow[];
  rankings: ProductRanking;
  wishlistLeads: WishlistCustomerLead[];
  funnel: FunnelStep[];
  trafficSources: TrafficSourceRow[];
  period: IntelligencePeriod;
  periodLabel: string;
}

export interface ProductAnalyticsSummary {
  period: string;
  views: number;
  wishlistAdds: number;
  cartAdds: number;
  purchases: number;
  conversion: number;
  score: number;
}

function daysAgo(days: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - (days - 1));
  return d;
}

export function parseIntelligencePeriod(value?: string): IntelligencePeriod {
  if (value === "today" || value === "7d" || value === "30d" || value === "all") return value;
  return "30d";
}

function periodLabel(period: IntelligencePeriod) {
  if (period === "today") return "сегодня";
  if (period === "7d") return "7 дней";
  if (period === "30d") return "30 дней";
  return "всё время";
}

function sinceForPeriod(period: IntelligencePeriod) {
  if (period === "today") return startOfToday();
  if (period === "7d") return daysAgo(7);
  if (period === "30d") return daysAgo(30);
  return new Date(0);
}

function chartDaysForPeriod(period: IntelligencePeriod) {
  if (period === "today") return 1;
  if (period === "7d") return 7;
  if (period === "30d") return 30;
  return 90;
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function pct(part: number, total: number) {
  return total > 0 ? Math.round((part / total) * 1000) / 10 : 0;
}

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function buildEmptyDaily(days: number) {
  const since = daysAgo(days);
  const map = new Map<string, DailyMetric>();
  for (let i = 0; i < days; i += 1) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    const key = dateKey(d);
    map.set(key, {
      label: d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }),
      visits: 0,
      productViews: 0,
      wishlistAdds: 0,
      cartAdds: 0,
      orders: 0,
    });
  }
  return map;
}

async function distinctVisitorsSince(since: Date) {
  const events = await analyticsEventsCollection();
  const rows = await events
    .distinct("sessionId", { type: "visit", createdAt: { $gte: since } });
  return rows.filter(Boolean).length;
}

async function countEvents(type: AnalyticsEventType, since: Date) {
  const events = await analyticsEventsCollection();
  return events.countDocuments({ type, createdAt: { $gte: since } });
}

async function countDistinctEventSessions(type: AnalyticsEventType, since: Date) {
  const events = await analyticsEventsCollection();
  const rows = await events.distinct("sessionId", { type, createdAt: { $gte: since } });
  return rows.filter(Boolean).length;
}

async function aggregateProductEvents(since: Date) {
  const events = await analyticsEventsCollection();
  const rows = await events
    .aggregate<{
      _id: string;
      views?: number;
      wishlistAdds?: number;
      cartAdds?: number;
    }>([
      {
        $match: {
          createdAt: { $gte: since },
          productSlug: { $exists: true, $ne: "" },
          type: { $in: ["product_view", "wishlist_add", "cart_add"] },
        },
      },
      {
        $group: {
          _id: "$productSlug",
          views: { $sum: { $cond: [{ $eq: ["$type", "product_view"] }, 1, 0] } },
          wishlistAdds: { $sum: { $cond: [{ $eq: ["$type", "wishlist_add"] }, 1, 0] } },
          cartAdds: { $sum: { $cond: [{ $eq: ["$type", "cart_add"] }, 1, 0] } },
        },
      },
    ])
    .toArray();

  return rows;
}

async function aggregatePurchases(since: Date) {
  const orders = await ordersCollection();
  return orders
    .aggregate<{ _id: string; purchases: number }>([
      { $match: { createdAt: { $gte: since }, status: { $ne: "cancelled" } } },
      { $unwind: "$items" },
      { $group: { _id: "$items.slug", purchases: { $sum: "$items.qty" } } },
    ])
    .toArray();
}

async function buildProductRows(since: Date): Promise<IntelligenceProductRow[]> {
  const [eventRows, purchaseRows] = await Promise.all([
    aggregateProductEvents(since),
    aggregatePurchases(since),
  ]);
  const slugs = new Set<string>();
  eventRows.forEach((row) => slugs.add(row._id));
  purchaseRows.forEach((row) => slugs.add(row._id));

  const products = await productsCollection();
  const productDocs = await products
    .find({ slug: { $in: Array.from(slugs) } }, { projection: { _id: 1, slug: 1, title: 1, price: 1, images: 1 } })
    .toArray();
  const titleBySlug = new Map(productDocs.map((p) => [p.slug, p.title]));
  const priceBySlug = new Map(productDocs.map((p) => [p.slug, p.price ?? 0]));
  const productBySlug = new Map(productDocs.map((p) => [p.slug, p]));
  const staticBySlug = new Map(staticProducts.map((p) => [p.slug, p]));
  const eventBySlug = new Map(eventRows.map((row) => [row._id, row]));
  const purchaseBySlug = new Map(purchaseRows.map((row) => [row._id, row.purchases]));

  return Array.from(slugs).map((slug) => {
    const event = eventBySlug.get(slug);
    const views = event?.views ?? 0;
    const wishlistAdds = event?.wishlistAdds ?? 0;
    const cartAdds = event?.cartAdds ?? 0;
    const purchases = purchaseBySlug.get(slug) ?? 0;
    const dbProduct = productBySlug.get(slug);
    const staticProduct = staticBySlug.get(slug);
    const staticImage =
      staticProduct?.images?.[0]?.src ?? staticProduct?.colors?.[0]?.images?.[0]?.src;
    const price = priceBySlug.get(slug) || staticProduct?.price || 0;
    const expectedSales = Math.round(wishlistAdds * 0.15 + cartAdds * 0.35);
    const potentialSales = Math.max(0, expectedSales - purchases);
    return {
      slug,
      productId: dbProduct?._id?.toString(),
      title: titleBySlug.get(slug) ?? staticProduct?.title ?? slug,
      imageSrc: dbProduct?.images?.[0] ?? staticImage,
      price,
      views,
      wishlistAdds,
      cartAdds,
      purchases,
      conversion: pct(purchases, Math.max(views, 1)),
      potentialSales,
      potentialRevenue: potentialSales * price,
      score: views + wishlistAdds * 3 + cartAdds * 5 + purchases * 10,
      signals: productSignals({ views, wishlistAdds, cartAdds, purchases }),
    };
  });
}

export async function getWishlistCustomerLeads(
  period: IntelligencePeriod = "30d",
  limit = 30,
): Promise<WishlistCustomerLead[]> {
  const since = sinceForPeriod(period);
  const events = await analyticsEventsCollection();
  const rows = await events
    .aggregate<{
      _id: { userId: MongoObjectId; productSlug: string };
      adds: number;
      firstAddedAt: Date;
      lastAddedAt: Date;
    }>([
      {
        $match: {
          type: "wishlist_add",
          createdAt: { $gte: since },
          userId: { $ne: null },
          productSlug: { $exists: true, $ne: "" },
        },
      },
      {
        $group: {
          _id: { userId: "$userId", productSlug: "$productSlug" },
          adds: { $sum: 1 },
          firstAddedAt: { $min: "$createdAt" },
          lastAddedAt: { $max: "$createdAt" },
        },
      },
      { $sort: { lastAddedAt: -1 } },
      { $limit: limit * 3 },
    ])
    .toArray();

  if (rows.length === 0) return [];

  const userIds = Array.from(new Map(rows.map((row) => [row._id.userId.toString(), row._id.userId])).values());
  const slugs = Array.from(new Set(rows.map((row) => row._id.productSlug)));
  const [users, products, orders] = await Promise.all([
    usersCollection(),
    productsCollection(),
    ordersCollection(),
  ]);
  const [userDocs, productDocs, orderDocs, recentOrderDocs] = await Promise.all([
    users.find({ _id: { $in: userIds } }).toArray(),
    products
      .find({ slug: { $in: slugs } }, { projection: { _id: 1, slug: 1, title: 1 } })
      .toArray(),
    orders
      .find(
        {
          userId: { $in: userIds },
          status: { $ne: "cancelled" },
          $or: [{ "items.slug": { $in: slugs } }, { "products.slug": { $in: slugs } }],
        },
        { projection: { userId: 1, items: 1, products: 1 } },
      )
      .toArray(),
    orders
      .find(
        { userId: { $in: userIds } },
        { projection: { userId: 1, customer: 1, phone: 1, createdAt: 1 } },
      )
      .sort({ createdAt: -1 })
      .toArray(),
  ]);

  const usersById = new Map(userDocs.map((user) => [user._id!.toString(), user]));
  const productsBySlug = new Map(productDocs.map((product) => [product.slug, product]));
  const bought = new Set<string>();
  for (const order of orderDocs) {
    const userId = order.userId?.toString();
    if (!userId) continue;
    for (const item of [...(order.items ?? []), ...(order.products ?? [])]) {
      bought.add(`${userId}:${item.slug}`);
    }
  }

  const phoneByUser = new Map<string, string>();
  for (const order of recentOrderDocs) {
    const userId = order.userId?.toString();
    if (!userId || phoneByUser.has(userId)) continue;
    const phone = order.customer?.phone ?? order.phone;
    if (phone) phoneByUser.set(userId, phone);
  }

  return rows
    .map((row): WishlistCustomerLead | null => {
      const customerId = row._id.userId.toString();
      const productSlug = row._id.productSlug;
      if (bought.has(`${customerId}:${productSlug}`)) return null;

      const user = usersById.get(customerId);
      if (!user) return null;
      const product = productsBySlug.get(productSlug);

      return {
        customerId,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: user.phone ?? phoneByUser.get(customerId),
        productSlug,
        productId: product?._id?.toString(),
        productTitle: product?.title ?? productSlug,
        adds: row.adds,
        firstAddedAt: row.firstAddedAt.toISOString(),
        lastAddedAt: row.lastAddedAt.toISOString(),
      };
    })
    .filter((row): row is WishlistCustomerLead => Boolean(row))
    .slice(0, limit);
}

function productSignals(row: {
  views: number;
  wishlistAdds: number;
  cartAdds: number;
  purchases: number;
}) {
  const signals: string[] = [];
  if (row.views >= 5 && row.purchases === 0) signals.push("Много смотрят, не покупают");
  if (row.wishlistAdds >= 2 && row.purchases === 0) signals.push("Много избранного, мало покупок");
  if (row.cartAdds >= 2 && row.purchases === 0) signals.push("Кладут в корзину, не оформляют");
  if (row.views > 0 && pct(row.purchases, row.views) >= 20) signals.push("Хорошая конверсия");
  return signals;
}

async function getDailyMetrics(days: number): Promise<DailyMetric[]> {
  const since = daysAgo(days);
  const buckets = buildEmptyDaily(days);
  const events = await analyticsEventsCollection();
  const eventRows = await events
    .aggregate<{ _id: { day: string; type: AnalyticsEventType }; count: number }>([
      {
        $match: {
          createdAt: { $gte: since },
          type: { $in: ["visit", "product_view", "wishlist_add", "cart_add", "order_created"] },
        },
      },
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: TZ } },
            type: "$type",
          },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  for (const row of eventRows) {
    const bucket = buckets.get(row._id.day);
    if (!bucket) continue;
    if (row._id.type === "visit") bucket.visits = row.count;
    if (row._id.type === "product_view") bucket.productViews = row.count;
    if (row._id.type === "wishlist_add") bucket.wishlistAdds = row.count;
    if (row._id.type === "cart_add") bucket.cartAdds = row.count;
    if (row._id.type === "order_created") bucket.orders = row.count;
  }

  return Array.from(buckets.values());
}

async function getTrafficSources(since: Date): Promise<TrafficSourceRow[]> {
  const events = await analyticsEventsCollection();
  return events
    .aggregate<TrafficSourceRow>([
      { $match: { type: "visit", createdAt: { $gte: since } } },
      {
        $group: {
          _id: "$source",
          visits: { $sum: 1 },
          sessions: { $addToSet: "$sessionId" },
        },
      },
      {
        $project: {
          _id: 0,
          source: { $ifNull: ["$_id", "direct"] },
          visits: 1,
          visitors: { $size: "$sessions" },
        },
      },
      { $sort: { visitors: -1, visits: -1 } },
      { $limit: 12 },
    ])
    .toArray();
}

export async function getSalesIntelligenceDashboard(
  period: IntelligencePeriod = "30d",
): Promise<SalesIntelligenceDashboard> {
  const sincePeriod = sinceForPeriod(period);
  const chartDays = chartDaysForPeriod(period);
  const since30 = daysAgo(30);
  const since7 = daysAgo(7);
  const today = startOfToday();

  const [
    visitorsToday,
    visitors7d,
    visitors30d,
    productViews,
    wishlistAdds,
    cartAdds,
    orders,
    paid,
    productRows,
    daily,
    trafficSources,
    wishlistLeads,
  ] = await Promise.all([
    distinctVisitorsSince(today),
    distinctVisitorsSince(since7),
    distinctVisitorsSince(since30),
    countEvents("product_view", sincePeriod),
    countEvents("wishlist_add", sincePeriod),
    countEvents("cart_add", sincePeriod),
    countEvents("order_created", sincePeriod),
    countEvents("payment_paid", sincePeriod),
    buildProductRows(sincePeriod),
    getDailyMetrics(chartDays),
    getTrafficSources(sincePeriod),
    getWishlistCustomerLeads(period, 30),
  ]);

  const kpis: IntelligenceKpis = {
    visitorsToday,
    visitors7d,
    visitors30d,
    productViews,
    wishlistAdds,
    cartAdds,
    orders,
    siteConversion: pct(orders, await countDistinctEventSessions("visit", sincePeriod)),
  };

  const funnelSource = [
    { key: "visitors", label: "Посетители сайта", value: await countDistinctEventSessions("visit", sincePeriod) },
    { key: "views", label: "Просмотр товара", value: productViews },
    { key: "wishlist", label: "Добавление в избранное", value: wishlistAdds },
    { key: "cart", label: "Добавление в корзину", value: cartAdds },
    { key: "orders", label: "Оформление заказа", value: orders },
    { key: "paid", label: "Оплата", value: paid },
  ];
  const funnel = funnelSource.map((step, index): FunnelStep => {
    const previous = funnelSource[index - 1]?.value ?? step.value;
    return {
      ...step,
      previousDrop: index === 0 || previous === 0 ? 0 : Math.max(0, 100 - pct(step.value, previous)),
    };
  });
  const highInterestLowPurchase = [...productRows]
    .filter((row) => row.views + row.wishlistAdds + row.cartAdds > 0)
    .sort((a, b) => {
      const aSignal = a.views + a.wishlistAdds * 3 + a.cartAdds * 5 - a.purchases * 8;
      const bSignal = b.views + b.wishlistAdds * 3 + b.cartAdds * 5 - b.purchases * 8;
      return bSignal - aSignal;
    })
    .slice(0, 20);
  const topViewed = [...productRows].sort((a, b) => b.views - a.views);

  return {
    kpis,
    daily,
    popularProducts: [...productRows].sort((a, b) => b.score - a.score).slice(0, 30),
    highInterestLowPurchase,
    topViewed: topViewed.slice(0, 50),
    missedRevenue: [...productRows]
      .filter((row) => row.potentialRevenue > 0)
      .sort((a, b) => b.potentialRevenue - a.potentialRevenue)
      .slice(0, 20),
    rankings: {
      topViewed: topViewed[0],
      topWishlisted: [...productRows].sort((a, b) => b.wishlistAdds - a.wishlistAdds)[0],
      topCarted: [...productRows].sort((a, b) => b.cartAdds - a.cartAdds)[0],
      topSelling: [...productRows].sort((a, b) => b.purchases - a.purchases)[0],
    },
    wishlistLeads,
    funnel,
    trafficSources,
    period,
    periodLabel: periodLabel(period),
  };
}

export async function getProductAnalyticsSummary(
  productSlug: string,
): Promise<ProductAnalyticsSummary[]> {
  const periods: { key: string; since: Date }[] = [
    { key: "сегодня", since: startOfToday() },
    { key: "7 дней", since: daysAgo(7) },
    { key: "30 дней", since: daysAgo(30) },
    { key: "всё время", since: new Date(0) },
  ];

  return Promise.all(
    periods.map(async ({ key, since }) => {
      const [events, purchases] = await Promise.all([
        aggregateProductEvents(since),
        aggregatePurchases(since),
      ]);
      const event = events.find((row) => row._id === productSlug);
      const purchase = purchases.find((row) => row._id === productSlug);
      const views = event?.views ?? 0;
      const wishlistAdds = event?.wishlistAdds ?? 0;
      const cartAdds = event?.cartAdds ?? 0;
      const purchaseCount = purchase?.purchases ?? 0;
      return {
        period: key,
        views,
        wishlistAdds,
        cartAdds,
        purchases: purchaseCount,
        conversion: pct(purchaseCount, Math.max(views, 1)),
        score: views + wishlistAdds * 3 + cartAdds * 5 + purchaseCount * 10,
      };
    }),
  );
}
