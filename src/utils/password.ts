import bcryptjs from "bcryptjs"

export async function saltAndHashPassword(password: string): Promise<string> {
  const saltRounds = 10;

  return bcryptjs.hash(password, saltRounds);
}