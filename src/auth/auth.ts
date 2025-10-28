import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb } from "@/utils/user"
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/utils/prisma";
import {signInSchema} from "@/schema/zod";
import bcryptjs from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Account",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
            // throw new Error("Email и пароль обязательны");
          }

          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await getUserFromDb(email);

          if (!user || !user.password) {
            return null;
            // throw new Error("Неверный email или пароль");
          }

          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          )

          if (!isPasswordValid) {
            return null;
            // throw new Error("Неверный email или пароль");
          }

          return {id: user.id, email: user.email};
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error("Неверный формат email или пароль");
          }
          throw error; // Пробрасываем ошибку дальше
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  // Добавьте эти настройки
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
})