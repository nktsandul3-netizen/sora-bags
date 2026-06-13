import { MongoClient, type Db, type Collection, ObjectId } from "mongodb";

// ──────────────────────────────────────────────────────────────
// Документы коллекций
// ──────────────────────────────────────────────────────────────

export type UserRole = "customer" | "admin";

export interface PasswordResetTokenDoc {
  _id?: ObjectId;
  userId: ObjectId;
  email: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface UserDoc {
  _id?: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role?: UserRole;
  phone?: string;
  createdAt: Date;
}

export interface AddressDoc {
  _id?: ObjectId;
  userId: ObjectId;
  label: string;
  recipient: string;
  phone: string;
  city: string;
  street: string;
  comment?: string;
  isDefault: boolean;
  createdAt: Date;
}

export interface OrderItem {
  slug: string;
  title: string;
  brand: string;
  color: string;
  qty: number;
  price: number;
}

/** Канонические статусы заказа (ключи). Метки — в src/lib/admin/constants.ts */
export type OrderStatus =
  | "new"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderPaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderNote {
  text: string;
  author: string;
  createdAt: Date;
}

export interface ShippingAddress {
  recipient: string;
  phone: string;
  city: string;
  street: string;
  comment?: string;
}

export type OrderTimelineType =
  | "created"
  | "status_change"
  | "note"
  | "tracking"
  | "payment";

export interface OrderTimelineEvent {
  type: OrderTimelineType;
  message: string;
  author?: string;
  createdAt: Date;
}

export interface OrderDoc {
  _id?: ObjectId;
  userId: ObjectId | null;
  number: string;
  order_number?: string;
  status: OrderStatus;
  order_status?: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  payment_status?: OrderPaymentStatus;
  paymentProvider?: string;
  paymentReference?: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    city?: string;
    address?: string;
    comment?: string;
  };
  customer_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  shippingAddress?: ShippingAddress;
  tracking_number?: string;
  trackingNumber?: string;
  items: OrderItem[];
  products?: OrderItem[];
  total: number;
  total_amount?: number;
  notes?: OrderNote[];
  timeline?: OrderTimelineEvent[];
  createdAt: Date;
  created_at?: Date;
  updatedAt?: Date;
  updated_at?: Date;
}

// ──────────────────────────────────────────────────────────────
// Каталог: товары и категории (управляются из админ-панели)
// ──────────────────────────────────────────────────────────────

export type ProductStatus = "in_stock" | "out_of_stock" | "pre_order";

export interface ProductDoc {
  _id?: ObjectId;
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
  isNew?: boolean;
  /** SEO-поля */
  seoTitle?: string;
  seoDescription?: string;
  /** Счётчики для аналитики */
  viewCount?: number;
  salesCount?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CategoryDoc {
  _id?: ObjectId;
  slug: string;
  name: string;
  section: "bags" | "accessories";
  createdAt: Date;
}

export interface NewsletterDoc {
  _id?: ObjectId;
  email: string;
  createdAt: Date;
}

export type PaymentStatus = "paid" | "pending" | "refunded";
export type PaymentMethod = "card" | "cash" | "bank_transfer" | "other";

export interface PaymentDoc {
  _id?: ObjectId;
  orderId: ObjectId;
  orderNumber: string;
  customerName: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: Date;
  updatedAt?: Date;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface ReviewDoc {
  _id?: ObjectId;
  productSlug: string;
  productTitle?: string;
  userId?: ObjectId;
  customerName: string;
  rating: number;
  text: string;
  status: ReviewStatus;
  createdAt: Date;
}

export type CouponType = "percentage" | "fixed";

export interface CouponDoc {
  _id?: ObjectId;
  code: string;
  type: CouponType;
  value: number;
  minOrder?: number;
  expiresAt?: Date;
  usedCount: number;
  maxUses?: number;
  active: boolean;
  createdAt: Date;
}

export interface MediaDoc {
  _id?: ObjectId;
  filename: string;
  url: string;
  folder: string;
  mimeType: string;
  size: number;
  createdAt: Date;
}

export interface StoreSettings {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
}

export interface ShippingSettings {
  freeFrom?: number;
  defaultCost?: number;
  deliveryDays?: string;
  regions?: string;
}

export interface EmailSettings {
  fromName?: string;
  fromEmail?: string;
  orderNotificationEmail?: string;
}

export interface TelegramSettings {
  botToken?: string;
  chatId?: string;
  notifyOrders?: boolean;
  notifyPayments?: boolean;
}

export interface SeoSettings {
  siteTitle?: string;
  siteDescription?: string;
  keywords?: string;
}

export interface SettingsDoc {
  _id?: ObjectId;
  key: "store";
  store?: StoreSettings;
  shipping?: ShippingSettings;
  email?: EmailSettings;
  telegram?: TelegramSettings;
  seo?: SeoSettings;
  updatedAt?: Date;
}

export interface WishlistDoc {
  _id?: ObjectId;
  userId: ObjectId;
  slugs: string[];
  updatedAt: Date;
}

// ──────────────────────────────────────────────────────────────
// Подключение (кэшируется между запросами, как рекомендовано для serverless)
// ──────────────────────────────────────────────────────────────

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI не задан. Добавьте строку подключения к MongoDB в .env.local — без неё личный кабинет не работает.",
    );
  }
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
  });
  return client.connect();
}

export function getClientPromise(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = createClientPromise();
  }
  return globalForMongo._mongoClientPromise;
}

let indexesEnsured = false;

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  const db = client.db(process.env.MONGODB_DB || "sora");
  if (!indexesEnsured) {
    indexesEnsured = true;
    await ensureIndexes(db).catch((err) => {
      indexesEnsured = false;
      throw err;
    });
  }
  return db;
}

async function ensureIndexes(db: Db): Promise<void> {
  await Promise.all([
    db.collection<UserDoc>("users").createIndex({ email: 1 }, { unique: true }),
    db.collection<AddressDoc>("addresses").createIndex({ userId: 1 }),
    db.collection<OrderDoc>("orders").createIndex({ userId: 1, createdAt: -1 }),
    db.collection<OrderDoc>("orders").createIndex({ createdAt: -1 }),
    db.collection<OrderDoc>("orders").createIndex({ status: 1 }),
    db.collection<OrderDoc>("orders").createIndex({ paymentStatus: 1, createdAt: -1 }),
    db.collection<OrderDoc>("orders").createIndex({ number: 1 }, { unique: true }),
    db.collection<OrderDoc>("orders").createIndex({ order_number: 1 }, { unique: true, sparse: true }),
    db.collection<WishlistDoc>("wishlists").createIndex({ userId: 1 }, { unique: true }),
    db.collection<ProductDoc>("products").createIndex({ slug: 1 }, { unique: true }),
    db.collection<ProductDoc>("products").createIndex({ section: 1, categorySlug: 1 }),
    db.collection<ProductDoc>("products").createIndex({ status: 1 }),
    db.collection<CategoryDoc>("categories").createIndex({ slug: 1 }, { unique: true }),
    db.collection<NewsletterDoc>("newsletters").createIndex({ email: 1 }, { unique: true }),
    db.collection<PaymentDoc>("payments").createIndex({ orderId: 1 }),
    db.collection<PaymentDoc>("payments").createIndex({ status: 1, createdAt: -1 }),
    db.collection<ReviewDoc>("reviews").createIndex({ productSlug: 1, status: 1 }),
    db.collection<ReviewDoc>("reviews").createIndex({ status: 1, createdAt: -1 }),
    db.collection<CouponDoc>("coupons").createIndex({ code: 1 }, { unique: true }),
    db.collection<MediaDoc>("media").createIndex({ folder: 1, createdAt: -1 }),
    db.collection<MediaDoc>("media").createIndex({ filename: "text" }),
    db.collection<SettingsDoc>("settings").createIndex({ key: 1 }, { unique: true }),
  ]);
}

export async function usersCollection(): Promise<Collection<UserDoc>> {
  return (await getDb()).collection<UserDoc>("users");
}

export async function addressesCollection(): Promise<Collection<AddressDoc>> {
  return (await getDb()).collection<AddressDoc>("addresses");
}

export async function ordersCollection(): Promise<Collection<OrderDoc>> {
  return (await getDb()).collection<OrderDoc>("orders");
}

export async function wishlistsCollection(): Promise<Collection<WishlistDoc>> {
  return (await getDb()).collection<WishlistDoc>("wishlists");
}

export async function productsCollection(): Promise<Collection<ProductDoc>> {
  return (await getDb()).collection<ProductDoc>("products");
}

export async function categoriesCollection(): Promise<Collection<CategoryDoc>> {
  return (await getDb()).collection<CategoryDoc>("categories");
}

export async function newslettersCollection(): Promise<Collection<NewsletterDoc>> {
  return (await getDb()).collection<NewsletterDoc>("newsletters");
}

export async function paymentsCollection(): Promise<Collection<PaymentDoc>> {
  return (await getDb()).collection<PaymentDoc>("payments");
}

export async function reviewsCollection(): Promise<Collection<ReviewDoc>> {
  return (await getDb()).collection<ReviewDoc>("reviews");
}

export async function couponsCollection(): Promise<Collection<CouponDoc>> {
  return (await getDb()).collection<CouponDoc>("coupons");
}

export async function mediaCollection(): Promise<Collection<MediaDoc>> {
  return (await getDb()).collection<MediaDoc>("media");
}

export async function settingsCollection(): Promise<Collection<SettingsDoc>> {
  return (await getDb()).collection<SettingsDoc>("settings");
}

let passwordResetIndexesReady = false;

async function ensurePasswordResetIndexes(
  collection: Collection<PasswordResetTokenDoc>,
): Promise<void> {
  if (passwordResetIndexesReady) return;
  try {
    await Promise.all([
      collection.createIndex({ tokenHash: 1 }, { unique: true }),
      collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      collection.createIndex({ userId: 1 }),
    ]);
    passwordResetIndexesReady = true;
  } catch (err) {
    console.warn("[mongodb] password_reset_tokens indexes:", err);
  }
}

export async function passwordResetTokensCollection(): Promise<
  Collection<PasswordResetTokenDoc>
> {
  const collection = (await getDb()).collection<PasswordResetTokenDoc>("password_reset_tokens");
  await ensurePasswordResetIndexes(collection);
  return collection;
}

export { ObjectId };