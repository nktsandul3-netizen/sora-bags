import { z } from "zod";
import { requestPasswordReset } from "@/lib/password-reset";
import { clientIpFromHeaders, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email("Некорректный e-mail"),
});

const successMessage =
  "Если аккаунт с таким e-mail существует, мы отправили ссылку для восстановления пароля.";

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers);
  const limited = rateLimit(`forgot-password:${ip}`, { limit: 8, windowMs: 60 * 60 * 1000 });
  if (!limited.ok) {
    return Response.json(
      { error: "Слишком много запросов. Попробуйте позже." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Проверьте e-mail";
    return Response.json({ error: first }, { status: 400 });
  }

  const emailLimited = rateLimit(`forgot-password:email:${parsed.data.email.toLowerCase()}`, {
    limit: 3,
    windowMs: 60 * 60 * 1000,
  });
  if (!emailLimited.ok) {
    return Response.json(
      { error: "Слишком много запросов для этого e-mail. Попробуйте позже." },
      { status: 429 },
    );
  }

  try {
    const result = await requestPasswordReset(parsed.data.email);

    if (result.userFound && !result.emailSent) {
      return Response.json(
        {
          error:
            "Ссылка создана, но письмо сейчас не отправилось. Проверьте e-mail позже или свяжитесь с нами по телефону.",
        },
        { status: 503 },
      );
    }

    return Response.json({ ok: true, message: successMessage });
  } catch (err) {
    console.error("[forgot-password] error:", err);
    return Response.json(
      { error: "Сервис временно недоступен. Попробуйте позже." },
      { status: 500 },
    );
  }
}
