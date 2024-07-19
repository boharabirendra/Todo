import { sign } from "jsonwebtoken";
import { IUser } from "../interface/user";
import { getUserByEmail } from "./users";
import bcryptjs from "bcryptjs";
import config from "../config";
import { ApiError } from "../utils/ApiError";

export async function login(user: Pick<IUser, "email" | "password">) {
  const { email, password } = user;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) throw new ApiError(404, "Invalid username or password");
  const isValidPassword = await bcryptjs.compare(
    password,
    existingUser.password
  );
  if (!isValidPassword) throw new ApiError(401, "Invalid username or password");

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refereshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
}
