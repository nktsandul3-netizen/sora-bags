import bcrypt from "bcryptjs";
import { z } from "zod";
import { usersCollection } from "@/lib/mongodb";
import { localeFromRequest } from "@/lib/i18n";
import { translate, type TranslationKey } from "@/lib/messages";

export async function POST(request: Request) {
  const locale = localeFromRequest(request);
  const t = (key: TranslationKey) => translate(locale, key);
  const schema = z.object({
    name: z.string().trim().min(2, t("checkout.errName")),
    email: z.string().trim().email(t("api.errInvalidEmail")),
    password: z.string().min(6, t("api.errPasswordShort")),
  });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: t("api.errBadRequest") }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? t("api.errCheckData");
    return Response.json({ error: first }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();

  try {
    const users = await usersCollection();
    const existing = await users.findOne({ email });
    if (existing) {
      return Response.json(
        { error: t("api.errEmailTaken") },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    await users.insertOne({
      name: parsed.data.name,
      email,
      passwordHash,
      createdAt: new Date(),
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[register] error:", err);
    return Response.json(
      { error: t("api.errRegisterFailed") },
      { status: 500 },
    );
  }
}
