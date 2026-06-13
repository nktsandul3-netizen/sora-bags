import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { usersCollection } from "@/lib/mongodb";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/account",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const users = await usersCollection();
        const user = await users.findOne({ email: email.toLowerCase() });
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user._id!.toString(),
          name: user.name,
          email: user.email,
          role: user.role ?? "customer",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "customer";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (token.id) session.user.id = token.id as string;
        session.user.role = (token.role as "customer" | "admin") ?? "customer";
      }
      return session;
    },
  },
});