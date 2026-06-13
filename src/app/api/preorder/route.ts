import { auth } from "@/auth";
import { createOrder } from "@/lib/account";
import { notifyNewOrder } from "@/lib/notify";

interface PreorderItem {
  slug: string;
  title: string;
  brand: string;
  color: string;
  qty: number;
  price: number;
}

interface PreorderPayload {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
  comment?: string;
  consent?: boolean;
  items?: PreorderItem[];
  total?: number;
}

export async function POST(request: Request) {
  let data: PreorderPayload;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const name = data.name?.trim();
  const phone = data.phone?.trim();

  if (!name || name.length < 2) {
    return Response.json({ error: "Укажите имя" }, { status: 400 });
  }
  if (!phone || phone.replace(/\D/g, "").length < 6) {
    return Response.json({ error: "Укажите корректный телефон" }, { status: 400 });
  }
  if (!data.consent) {
    return Response.json(
      { error: "Необходимо согласие на обработку данных" },
      { status: 400 },
    );
  }
  if (!data.items || data.items.length === 0) {
    return Response.json({ error: "Корзина пуста" }, { status: 400 });
  }
  const items = data.items.map((item) => ({
    slug: String(item.slug),
    title: String(item.title),
    brand: String(item.brand),
    color: String(item.color),
    qty: Math.max(1, Number(item.qty) || 1),
    price: Math.max(0, Number(item.price) || 0),
  }));
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Сохраняем заказ в БД: без этого интернет-магазин не должен принимать заказ.
  let createdOrder: { id: string; number: string };
  try {
    const session = await auth();
    createdOrder = await createOrder({
      userId: session?.user?.id ?? null,
      customer: {
        name,
        phone,
        email: data.email,
        city: data.city,
        address: data.address,
        comment: data.comment,
      },
      items,
      total,
    });
  } catch (err) {
    console.error("[preorder] Заказ не сохранён в БД:", err);
    return Response.json(
      { error: "Не удалось сохранить заказ. Попробуйте ещё раз." },
      { status: 500 },
    );
  }

  // Уведомления администратору (Telegram + email). Не блокируют покупателя.
  const { telegram, email } = await notifyNewOrder({
    orderNumber: createdOrder.number,
    name,
    phone,
    email: data.email,
    city: data.city,
    comment: [data.address, data.comment].filter(Boolean).join("\n"),
    items: items.map((it) => ({
      title: it.title,
      color: it.color,
      qty: it.qty,
      price: it.price,
    })),
    total,
  });

  return Response.json({
    ok: true,
    delivered: telegram || email,
    orderId: createdOrder.id,
    orderNumber: createdOrder.number,
  });
}