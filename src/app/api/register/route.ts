import bcrypt from "bcryptjs";
import { z } from "zod";
import { usersCollection } from "@/lib/mongodb";

const schema = z.object({
  name: z.string().trim().min(2, "Укажите имя"),
  email: z.string().trim().email("Некорректный e-mail"),
  password: z.string().min(6, "Пароль не короче 6 символов"),
});

export async function POST(request: Request) {
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

  const email = parsed.data.email.toLowerCase();

  try {
    const users = await usersCollection();
    const existing = await users.findOne({ email });
    if (existing) {
      return Response.json(
        { error: "Пользователь с таким e-mail уже зарегистрирован" },
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
      { error: "Не удалось создать аккаунт. Попробуйте позже." },
      { status: 500 },
    );
  }
}