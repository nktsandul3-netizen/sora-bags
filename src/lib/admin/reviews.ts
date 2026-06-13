import type { Filter } from "mongodb";
import { reviewsCollection, ObjectId } from "@/lib/mongodb";
import type { ReviewDoc, ReviewStatus } from "@/lib/mongodb";

export interface AdminReviewView {
  id: string;
  productSlug: string;
  productTitle?: string;
  customerName: string;
  rating: number;
  text: string;
  status: ReviewStatus;
  createdAt: string;
}

export async function listReviews(params: {
  status?: ReviewStatus | "all";
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  reviews: AdminReviewView[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const { status = "all", search, page = 1, pageSize = 20 } = params;
  const reviews = await reviewsCollection();
  const filter: Filter<ReviewDoc> = {};
  if (status !== "all") filter.status = status;
  if (search?.trim()) {
    const rx = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ customerName: rx }, { productSlug: rx }, { text: rx }];
  }
  const total = await reviews.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const docs = await reviews
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((safePage - 1) * pageSize)
    .limit(pageSize)
    .toArray();
  return {
    reviews: docs.map(toView),
    total,
    page: safePage,
    totalPages,
  };
}

export async function setReviewStatus(id: string, status: ReviewStatus): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const reviews = await reviewsCollection();
  const res = await reviews.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return res.matchedCount > 0;
}

function toView(doc: ReviewDoc): AdminReviewView {
  return {
    id: doc._id!.toString(),
    productSlug: doc.productSlug,
    productTitle: doc.productTitle,
    customerName: doc.customerName,
    rating: doc.rating,
    text: doc.text,
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
  };
}