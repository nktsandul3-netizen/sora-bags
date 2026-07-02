"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import {
  addressesCollection,
  usersCollection,
  ObjectId,
} from "@/lib/mongodb";
import { getServerLocale } from "@/lib/server-i18n";
import { translate, type TranslationKey } from "@/lib/messages";

type Translator = (key: TranslationKey) => string;

async function getT(): Promise<Translator> {
  const locale = await getServerLocale();
  return (key: TranslationKey) => translate(locale, key);
}

async function requireUserId(): Promise<string> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) throw new Error("unauthorized");
  return id;
}

export type ActionResult = { ok: true } | { ok: false; error: string };

const addressSchema = (t: Translator) =>
  z.object({
    label: z.string().trim().min(1, t("api.errAddressLabel")),
    recipient: z.string().trim().min(2, t("api.errAddressRecipient")),
    phone: z.string().trim().min(6, t("api.errAddressPhone")),
    city: z.string().trim().min(2, t("api.errAddressCity")),
    street: z.string().trim().min(2, t("api.errAddressStreet")),
    comment: z.string().trim().optional(),
    isDefault: z.boolean().optional(),
  });

export type AddressInput = z.input<ReturnType<typeof addressSchema>>;

export async function addAddress(input: AddressInput): Promise<ActionResult> {
  const t = await getT();
  let userId: string;
  try {
    userId = await requireUserId();
  } catch {
    return { ok: false, error: t("api.errSessionExpired") };
  }

  const parsed = addressSchema(t).safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? t("api.errCheckFields") };
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
    return { ok: false, error: t("api.errSaveAddress") };
  }
}

export async function deleteAddress(id: string): Promise<ActionResult> {
  const t = await getT();
  let userId: string;
  try {
    userId = await requireUserId();
  } catch {
    return { ok: false, error: t("api.errSessionExpired") };
  }

  try {
    const addresses = await addressesCollection();
    const uid = new ObjectId(userId);
    const target = await addresses.findOne({ _id: new ObjectId(id), userId: uid });
    if (!target) return { ok: false, error: t("api.errAddressNotFound") };

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
    return { ok: false, error: t("api.errDeleteAddress") };
  }
}

export async function setDefaultAddress(id: string): Promise<ActionResult> {
  const t = await getT();
  let userId: string;
  try {
    userId = await requireUserId();
  } catch {
    return { ok: false, error: t("api.errSessionExpired") };
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
    return { ok: false, error: t("api.errUpdateAddress") };
  }
}

const profileSchema = (t: Translator) =>
  z.object({
    name: z.string().trim().min(2, t("api.errNameShort")),
  });

export type ProfileInput = z.input<ReturnType<typeof profileSchema>>;

export async function updateProfile(input: ProfileInput): Promise<ActionResult> {
  const t = await getT();
  let userId: string;
  try {
    userId = await requireUserId();
  } catch {
    return { ok: false, error: t("api.errSessionExpired") };
  }

  const parsed = profileSchema(t).safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? t("api.errCheckFields") };
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
    return { ok: false, error: t("api.errUpdateProfile") };
  }
}
