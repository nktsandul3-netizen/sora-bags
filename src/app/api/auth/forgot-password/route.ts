import { z } from "zod";
import { requestPasswordReset } from "@/lib/password-reset";
import { clientIpFromHeaders, rateLimit } from "@/lib/rate-limit";
import { localeFromRequest } from "@/lib/i18n";
import { translate, type TranslationKey } from "@/lib/messages";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const locale = localeFromRequest(request);
  const t = (key: TranslationKey) => translate(locale, key);
  const schema = z.object({
    email: z.string().trim().email(t("api.errInvalidEmail")),
  });

  const ip = clientIpFromHeaders(request.headers);
  const limited = rateLimit(`forgot-password:${ip}`, { limit: 8, windowMs: 60 * 60 * 1000 });
  if (!limited.ok) {
    return Response.json(
      { error: t("api.errTooMany") },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: t("api.errBadRequest") }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? t("api.errCheckEmail");
    return Response.json({ error: first }, { status: 400 });
  }

  const emailLimited = rateLimit(`forgot-password:email:${parsed.data.email.toLowerCase()}`, {
    limit: 3,
    windowMs: 60 * 60 * 1000,
  });
  if (!emailLimited.ok) {
    return Response.json(
      { error: t("api.errTooManyEmail") },
      { status: 429 },
    );
  }

  try {
    const result = await requestPasswordReset(parsed.data.email, locale);

    if (result.userFound && !result.emailSent) {
      return Response.json(
        { error: t("api.errResetEmailNotSent") },
        { status: 503 },
      );
    }

    return Response.json({ ok: true, message: t("auth.forgotSuccess") });
  } catch (err) {
    console.error("[forgot-password] error:", err);
    return Response.json(
      { error: t("api.errServiceUnavailable") },
      { status: 500 },
    );
  }
}
