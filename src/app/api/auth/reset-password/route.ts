import { z } from "zod";
import { resetPasswordWithToken } from "@/lib/password-reset";
import { clientIpFromHeaders, rateLimit } from "@/lib/rate-limit";
import { localeFromRequest } from "@/lib/i18n";
import { translate, type TranslationKey } from "@/lib/messages";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const locale = localeFromRequest(request);
  const t = (key: TranslationKey) => translate(locale, key);
  const schema = z
    .object({
      token: z.string().min(1, t("api.errMissingResetLink")),
      password: z.string().min(6, t("api.errPasswordShort")),
      confirm: z.string().min(1),
    })
    .refine((data) => data.password === data.confirm, {
      message: t("api.errPasswordsMismatch"),
      path: ["confirm"],
    });

  const ip = clientIpFromHeaders(request.headers);
  const limited = rateLimit(`reset-password:${ip}`, { limit: 10, windowMs: 60 * 60 * 1000 });
  if (!limited.ok) {
    return Response.json(
      { error: t("api.errTooManyAttempts") },
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
    const first = parsed.error.issues[0]?.message ?? t("api.errCheckData");
    return Response.json({ error: first }, { status: 400 });
  }

  try {
    const result = await resetPasswordWithToken(parsed.data.token, parsed.data.password);
    if ("errorKey" in result) {
      return Response.json({ error: t(result.errorKey) }, { status: 400 });
    }
    return Response.json({ ok: true, email: result.email });
  } catch (err) {
    console.error("[reset-password] error:", err);
    return Response.json(
      { error: t("api.errUpdatePasswordFailed") },
      { status: 500 },
    );
  }
}
