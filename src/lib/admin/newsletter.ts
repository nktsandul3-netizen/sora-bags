import type { Filter } from "mongodb";
import { newslettersCollection } from "@/lib/mongodb";
import type { NewsletterDoc } from "@/lib/mongodb";

export interface SubscriberView {
  id: string;
  email: string;
  createdAt: string;
}

export async function listSubscribers(params: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  subscribers: SubscriberView[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const { search, page = 1, pageSize = 50 } = params;
  const newsletters = await newslettersCollection();
  const filter: Filter<NewsletterDoc> = {};
  if (search?.trim()) {
    filter.email = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  }
  const total = await newsletters.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const docs = await newsletters
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((safePage - 1) * pageSize)
    .limit(pageSize)
    .toArray();
  return {
    subscribers: docs.map((d) => ({
      id: d._id!.toString(),
      email: d.email,
      createdAt: d.createdAt.toISOString(),
    })),
    total,
    page: safePage,
    totalPages,
  };
}

export async function exportSubscribersCsv(search?: string): Promise<string> {
  const { subscribers } = await listSubscribers({ search, page: 1, pageSize: 10000 });
  const header = "email,subscribed_at\n";
  const rows = subscribers
    .map((s) => `${s.email},${s.createdAt}`)
    .join("\n");
  return header + rows;
}