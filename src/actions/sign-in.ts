"use server";

import { signIn } from "@/auth/auth";
import { AuthError } from "next-auth";

export async function signInWithCredentials(email: string, password: string) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.url) {
      return { success: true, url: result.url };
    }

    return { success: true, result };
  } catch (error) {
    console.error("Ошибка авторизации: ", error);

    let errorMessage = "Произошла ошибка при авторизации";

    if (error instanceof AuthError) {
      // Извлекаем оригинальное сообщение об ошибке из cause
      const originalError = error.cause?.err?.message || error.message;

      switch (error.type) {
        case "CredentialsSignin":
          errorMessage = "Неверный email или пароль";
          break;
        case "CallbackRouteError":
          // Извлекаем сообщение из вложенной ошибки
          if (error.cause?.err?.message) {
            errorMessage = error.cause.err.message;
          } else {
            errorMessage = "Ошибка при обработке запроса";
          }
          break;
        default:
          errorMessage = originalError || "Произошла ошибка при авторизации";
      }
    } else if (error instanceof Error) {
      // Для обычных Error
      errorMessage = error.message;
    }

    return { error: errorMessage };
  }
}