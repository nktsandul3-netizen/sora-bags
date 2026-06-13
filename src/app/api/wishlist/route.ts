import { z } from "zod";
import { auth } from "@/auth";
import {
  getWishlistSlugs,
  setWishlistSlugs,
  mergeWishlistSlugs,
} from "@/lib/account";

const bodySchema = z.object({
  slugs: z.array(z.string()).max(500),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Не авторизован" }, { status: 401 });
  }
  const slugs = await getWishlistSlugs(session.user.id);
  return Response.json({ slugs });
}

/** Объединяет переданные slug'и с сохранёнными (используется при входе). */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Не авторизован" }, { status: 401 });
  }
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Некорректный запрос" }, { status: 400 });
  }
  const slugs = await mergeWishlistSlugs(session.user.id, parsed.data.slugs);
  return Response.json({ slugs });
}

/** Полностью перезаписывает избранное (используется при изменении в кабинете/каталоге). */
export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Не авторизован" }, { status: 401 });
  }
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Некорректный запрос" }, { status: 400 });
  }
  const slugs = await setWishlistSlugs(session.user.id, parsed.data.slugs);
  return Response.json({ slugs });
}