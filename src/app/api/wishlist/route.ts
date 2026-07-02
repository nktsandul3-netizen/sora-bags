import { z } from "zod";
import { auth } from "@/auth";
import {
  getWishlistSlugs,
  setWishlistSlugs,
  mergeWishlistSlugs,
} from "@/lib/account";
import { localeFromRequest } from "@/lib/i18n";
import { translate } from "@/lib/messages";

const bodySchema = z.object({
  slugs: z.array(z.string()).max(500),
});

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json(
      { error: translate(localeFromRequest(request), "api.errUnauthorized") },
      { status: 401 },
    );
  }
  const slugs = await getWishlistSlugs(session.user.id);
  return Response.json({ slugs });
}

/** Объединяет переданные slug'и с сохранёнными (используется при входе). */
export async function POST(request: Request) {
  const locale = localeFromRequest(request);
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: translate(locale, "api.errUnauthorized") }, { status: 401 });
  }
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: translate(locale, "api.errBadRequest") }, { status: 400 });
  }
  const slugs = await mergeWishlistSlugs(session.user.id, parsed.data.slugs);
  return Response.json({ slugs });
}

/** Полностью перезаписывает избранное (используется при изменении в кабинете/каталоге). */
export async function PUT(request: Request) {
  const locale = localeFromRequest(request);
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: translate(locale, "api.errUnauthorized") }, { status: 401 });
  }
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: translate(locale, "api.errBadRequest") }, { status: 400 });
  }
  const slugs = await setWishlistSlugs(session.user.id, parsed.data.slugs);
  return Response.json({ slugs });
}