import { sign } from "jsonwebtoken";
import { IUser } from "../interface/user";
import { getUserByEmail } from "./users";
import bcryptjs from "bcryptjs";
import config from "../config";
import { ROLES } from "../utils/enum";

export async function login(user: Pick<IUser, "email" | "password">) {
  const { email, password } = user;
  const existingUser = getUserByEmail(email);
  if (!existingUser) {
    return {
      error: "Invalid email or password",
      status: 404,
    };
  }

  const isValidPassword = await bcryptjs.compare(
    password,
    existingUser.password
  );

  if (!isValidPassword) {
    return {
      error: "Invalid email or password",
      status: 400,
    };
  }

  /** Setting role based on email address */
  const role = existingUser.email === config.email ? ROLES.ADMIN : ROLES.USER;
  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role,
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
