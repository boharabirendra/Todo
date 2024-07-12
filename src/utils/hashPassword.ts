import bcryptjs from "bcryptjs";
export async function hashPassword(password: string): Promise<string> {
  return await bcryptjs.hash(password, 10);
}
