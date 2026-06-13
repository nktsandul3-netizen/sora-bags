import { incrementProductViewCount } from "@/lib/admin/products";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!slug) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  try {
    await incrementProductViewCount(slug);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false });
  }
}