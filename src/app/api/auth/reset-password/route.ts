import { z } from "zod";
import { resetPasswordWithToken } from "@/lib/password-reset";
import { clientIpFromHeaders, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z
  .object({
    token: z.string().min(1, "Отсутствует ссылка для восстановления"),
    password: z.string().min(6, "Пароль не короче 6 символов"),
    confirm: z.string().min(1),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Пароли не совпадают",
    path: ["confirm"],
  });

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers);
  const limited = rateLimit(`reset-password:${ip}`, { limit: 10, windowMs: 60 * 60 * 1000 });
  if (!limited.ok) {
    return Response.json(
      { error: "Слишком много попыток. Попробуйте позже." },
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
    const first = parsed.error.issues[0]?.message ?? "Проверьте введённые данные";
    return Response.json({ error: first }, { status: 400 });
  }

  try {
    const result = await resetPasswordWithToken(parsed.data.token, parsed.data.password);
    if ("error" in result) {
      return Response.json({ error: result.error }, { status: 400 });
    }
    return Response.json({ ok: true, email: result.email });
  } catch (err) {
    console.error("[reset-password] error:", err);
    return Response.json(
      { error: "Не удалось обновить пароль. Попробуйте позже." },
      { status: 500 },
    );
  }
}
