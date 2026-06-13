"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import {
  addressesCollection,
  usersCollection,
  ObjectId,
} from "@/lib/mongodb";

async function requireUserId(): Promise<string> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) throw new Error("Не авторизован");
  return id;
}

export type ActionResult = { ok: true } | { ok: false; error: string };

const addressSchema = z.object({
  label: z.string().trim().min(1, "Укажите название адреса"),
  recipient: z.string().trim().min(2, "Укажите получателя"),
  phone: z.string().trim().min(6, "Укажите телефон"),
  city: z.string().trim().min(2, "Укажите город"),
  street: z.string().trim().min(2, "Укажите улицу и дом"),
  comment: z.string().trim().optional(),
  isDefault: z.boolean().optional(),
});

export type AddressInput = z.input<typeof addressSchema>;

export async function addAddress(input: AddressInput): Promise<ActionResult> {
  let userId: string;
  try {
    userId = await requireUserId();
  } catch {
    return { ok: false, error: "Сессия истекла. Войдите снова." };
  }

  const parsed = addressSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Проверьте поля" };
  }

  try {
    const addresses = await addressesCollection();
    const uid = new ObjectId(userId);
    const count = await addresses.countDocuments({ userId: uid });
    const makeDefault = parsed.data.isDefault || count === 0;

    if (makeDefault) {
      await addresses.updateMany({ userId: uid }, { $set: { isDefault: false } });
    }

    await addresses.insertOne({
      userId: uid,
      label: parsed.data.label,
      recipient: parsed.data.recipient,
      phone: parsed.data.phone,
      city: parsed.data.city,
      street: parsed.data.street,
      comment: parsed.data.comment,
      isDefault: makeDefault,
      createdAt: new Date(),
    });

    revalidatePath("/account");
    return { ok: true };
  } catch (err) {
    console.error("[addAddress] error:", err);
    return { ok: false, error: "Не удалось сохранить адрес." };
  }
}

export async function deleteAddress(id: string): Promise<ActionResult> {
  let userId: string;
  try {
    userId = await requireUserId();
  } catch {
    return { ok: false, error: "Сессия истекла. Войдите снова." };
  }

  try {
    const addresses = await addressesCollection();
    const uid = new ObjectId(userId);
    const target = await addresses.findOne({ _id: new ObjectId(id), userId: uid });
    if (!target) return { ok: false, error: "Адрес не найден." };

    await addresses.deleteOne({ _id: new ObjectId(id), userId: uid });

    // Если удалили основной — назначаем основным самый свежий из оставшихся.
    if (target.isDefault) {
      const next = await addresses
        .find({ userId: uid })
        .sort({ createdAt: -1 })
        .limit(1)
        .next();
      if (next) {
        await addresses.updateOne({ _id: next._id }, { $set: { isDefault: true } });
      }
    }

    revalidatePath("/account");
    return { ok: true };
  } catch (err) {
    console.error("[deleteAddress] error:", err);
    return { ok: false, error: "Не удалось удалить адрес." };
  }
}

export async function setDefaultAddress(id: string): Promise<ActionResult> {
  let userId: string;
  try {
    userId = await requireUserId();
  } catch {
    return { ok: false, error: "Сессия истекла. Войдите снова." };
  }

  try {
    const addresses = await addressesCollection();
    const uid = new ObjectId(userId);
    await addresses.updateMany({ userId: uid }, { $set: { isDefault: false } });
    await addresses.updateOne(
      { _id: new ObjectId(id), userId: uid },
      { $set: { isDefault: true } },
    );
    revalidatePath("/account");
    return { ok: true };
  } catch (err) {
    console.error("[setDefaultAddress] error:", err);
    return { ok: false, error: "Не удалось обновить адрес." };
  }
}

const profileSchema = z.object({
  name: z.string().trim().min(2, "Имя не короче 2 символов"),
});

export type ProfileInput = z.input<typeof profileSchema>;

export async function updateProfile(input: ProfileInput): Promise<ActionResult> {
  let userId: string;
  try {
    userId = await requireUserId();
  } catch {
    return { ok: false, error: "Сессия истекла. Войдите снова." };
  }

  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Проверьте поля" };
  }

  try {
    const users = await usersCollection();
    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { name: parsed.data.name } },
    );
    revalidatePath("/account");
    return { ok: true };
  } catch (err) {
    console.error("[updateProfile] error:", err);
    return { ok: false, error: "Не удалось обновить профиль." };
  }
}