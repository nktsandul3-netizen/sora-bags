import crypto from "crypto";
import bcrypt from "bcryptjs";
import { brand } from "@/lib/config";
import {
  ObjectId,
  passwordResetTokensCollection,
  usersCollection,
} from "@/lib/mongodb";

const TOKEN_TTL_MS = 60 * 60 * 1000;

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getSiteUrl() {
  if (process.env.AUTH_URL) return process.env.AUTH_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

function getResetEmailFrom(): string {
  if (process.env.RESEND_FROM) return process.env.RESEND_FROM;
  if (process.env.PREORDER_FROM) return process.env.PREORDER_FROM;
  return `${brand.name} <noreply@${brand.domain}>`;
}

async function sendPasswordResetEmail(email: string, resetUrl: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = getResetEmailFrom();
  if (!apiKey) {
    console.warn("[password-reset] RESEND_API_KEY не задан, письмо не отправлено");
    return false;
  }

  const safeUrl = escapeHtml(resetUrl);
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#1c1917;max-width:560px;line-height:1.6;">
    <h2 style="margin:0 0 12px;font-family:Georgia,serif;font-weight:500;">Восстановление пароля</h2>
    <p style="margin:0 0 16px;">Вы запросили сброс пароля для аккаунта ${escapeHtml(brand.name)}.</p>
    <p style="margin:0 0 24px;">
      <a href="${safeUrl}" style="display:inline-block;background:#1c1917;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:600;">
        Задать новый пароль
      </a>
    </p>
    <p style="margin:0 0 8px;font-size:13px;color:#78716c;">Ссылка действует 1 час. Если вы не запрашивали сброс, просто проигнорируйте это письмо.</p>
    <p style="margin:0;font-size:12px;color:#a8a29e;word-break:break-all;">${safeUrl}</p>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: `Восстановление пароля — ${brand.name}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[password-reset] Resend error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[password-reset] Resend request failed:", err);
    return false;
  }
}

export async function requestPasswordReset(
  emailRaw: string,
): Promise<{ userFound: boolean; emailSent: boolean }> {
  const email = emailRaw.trim().toLowerCase();
  const users = await usersCollection();
  const user = await users.findOne({ email });
  if (!user?._id) {
    return { userFound: false, emailSent: false };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + TOKEN_TTL_MS);

  const tokens = await passwordResetTokensCollection();
  await tokens.deleteMany({ userId: user._id });
  await tokens.insertOne({
    userId: user._id,
    email,
    tokenHash,
    expiresAt,
    createdAt: now,
  });

  const resetUrl = `${getSiteUrl()}/account/reset-password?token=${token}`;
  const emailSent = await sendPasswordResetEmail(email, resetUrl);

  if (!emailSent) {
    console.error("[password-reset] token saved but email not sent for:", email);
  }

  return { userFound: true, emailSent };
}

export async function resetPasswordWithToken(
  token: string,
  password: string,
): Promise<{ ok: true; email: string } | { errorKey: string }> {
  const tokenHash = hashToken(token);
  const tokens = await passwordResetTokensCollection();
  const record = await tokens.findOne({ tokenHash });

  if (!record || record.expiresAt.getTime() <= Date.now()) {
    if (record) await tokens.deleteOne({ _id: record._id });
    return { errorKey: "api.errResetLinkInvalid" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const users = await usersCollection();
  const updated = await users.updateOne(
    { _id: record.userId },
    { $set: { passwordHash } },
  );

  if (updated.matchedCount === 0) {
    await tokens.deleteOne({ _id: record._id });
    return { errorKey: "api.errAccountNotFound" };
  }

  await tokens.deleteMany({ userId: record.userId as ObjectId });
  return { ok: true, email: record.email };
}
