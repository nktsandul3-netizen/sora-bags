import type { Filter } from "mongodb";
import { couponsCollection, ObjectId } from "@/lib/mongodb";
import type { CouponDoc, CouponType } from "@/lib/mongodb";

export interface AdminCouponView {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  minOrder?: number;
  expiresAt: string | null;
  usedCount: number;
  maxUses?: number;
  active: boolean;
  createdAt: string;
}

export interface CouponInput {
  code: string;
  type: CouponType;
  value: number;
  minOrder?: number;
  expiresAt?: Date;
  maxUses?: number;
  active: boolean;
}

export async function listCoupons(): Promise<AdminCouponView[]> {
  const coupons = await couponsCollection();
  const docs = await coupons.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toView);
}

export async function getCouponById(id: string): Promise<AdminCouponView | null> {
  if (!ObjectId.isValid(id)) return null;
  const coupons = await couponsCollection();
  const doc = await coupons.findOne({ _id: new ObjectId(id) });
  return doc ? toView(doc) : null;
}

export async function codeExists(code: string, exceptId?: string): Promise<boolean> {
  const coupons = await couponsCollection();
  const filter: Filter<CouponDoc> = { code: code.toUpperCase() };
  if (exceptId && ObjectId.isValid(exceptId)) {
    filter._id = { $ne: new ObjectId(exceptId) };
  }
  return (await coupons.countDocuments(filter)) > 0;
}

export async function createCoupon(input: CouponInput): Promise<string> {
  const coupons = await couponsCollection();
  const res = await coupons.insertOne({
    ...input,
    code: input.code.toUpperCase(),
    usedCount: 0,
    createdAt: new Date(),
  });
  return res.insertedId.toString();
}

export async function updateCoupon(id: string, input: CouponInput): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const coupons = await couponsCollection();
  const res = await coupons.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...input, code: input.code.toUpperCase() } },
  );
  return res.matchedCount > 0;
}

export async function deleteCoupon(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const coupons = await couponsCollection();
  const res = await coupons.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}

function toView(doc: CouponDoc): AdminCouponView {
  return {
    id: doc._id!.toString(),
    code: doc.code,
    type: doc.type,
    value: doc.value,
    minOrder: doc.minOrder,
    expiresAt: doc.expiresAt ? doc.expiresAt.toISOString() : null,
    usedCount: doc.usedCount,
    maxUses: doc.maxUses,
    active: doc.active,
    createdAt: doc.createdAt.toISOString(),
  };
}