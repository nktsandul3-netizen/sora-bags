import type { Filter } from "mongodb";
import { mediaCollection, ObjectId } from "@/lib/mongodb";
import type { MediaDoc } from "@/lib/mongodb";

export interface MediaView {
  id: string;
  filename: string;
  url: string;
  folder: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export async function listMedia(params: {
  folder?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  media: MediaView[];
  folders: string[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const { folder, search, page = 1, pageSize = 48 } = params;
  const media = await mediaCollection();
  const filter: Filter<MediaDoc> = {};
  if (folder && folder !== "all") filter.folder = folder;
  if (search?.trim()) {
    filter.filename = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  }
  const [total, docs, folderAgg] = await Promise.all([
    media.countDocuments(filter),
    media
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((Math.max(1, page) - 1) * pageSize)
      .limit(pageSize)
      .toArray(),
    media.distinct("folder"),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return {
    media: docs.map(toView),
    folders: ["all", ...folderAgg.sort()],
    total,
    page: Math.min(page, totalPages),
    totalPages,
  };
}

export async function createMediaRecord(input: Omit<MediaDoc, "_id" | "createdAt">): Promise<string> {
  const media = await mediaCollection();
  const res = await media.insertOne({ ...input, createdAt: new Date() });
  return res.insertedId.toString();
}

export async function deleteMedia(id: string): Promise<MediaView | null> {
  if (!ObjectId.isValid(id)) return null;
  const media = await mediaCollection();
  const doc = await media.findOneAndDelete({ _id: new ObjectId(id) });
  return doc ? toView(doc) : null;
}

function toView(doc: MediaDoc): MediaView {
  return {
    id: doc._id!.toString(),
    filename: doc.filename,
    url: doc.url,
    folder: doc.folder,
    mimeType: doc.mimeType,
    size: doc.size,
    createdAt: doc.createdAt.toISOString(),
  };
}