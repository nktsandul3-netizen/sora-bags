import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/auth";
import { createMediaRecord } from "@/lib/admin/media";

const MAX_SIZE = 8 * 1024 * 1024; // 8 MB
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "admin") {
    return Response.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const file = formData.get("file");
  const folderRaw = String(formData.get("folder") ?? "general").trim();
  const folder = folderRaw.replace(/[^a-z0-9-_]/gi, "") || "general";

  if (!(file instanceof File)) {
    return Response.json({ error: "Файл не передан" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return Response.json({ error: "Допустимы JPEG, PNG, WebP, GIF" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return Response.json({ error: "Файл больше 8 МБ" }, { status: 400 });
  }

  const ext = path.extname(file.name) || ".jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const dir = path.join(process.cwd(), "public", "media", folder);
  await mkdir(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, safeName), buffer);

  const url = `/media/${folder}/${safeName}`;
  const id = await createMediaRecord({
    filename: file.name,
    url,
    folder,
    mimeType: file.type,
    size: file.size,
  });

  return Response.json({ ok: true, id, url, filename: file.name });
}