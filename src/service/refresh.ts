import { sign, verify } from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interface/user";

export function refreshTokens(refreshToken: string) {
  try {
    if (!refreshToken) {
      return {
        error: "Refresh token required.",
      };
    }

    const payload: any = verify(refreshToken, config.jwt.secret!);

    const newPayload = {
      id: payload.id,
      name: payload.name,
      email: payload.email
    };

    const newAccessToken = sign(newPayload, config.jwt.secret!, {
      expiresIn: config.jwt.accessTokenExpiryMS,
    });

    const newRefreshToken = sign(newPayload, config.jwt.secret!, {
      expiresIn: config.jwt.refereshTokenExpiryMS,
    });

    return {
      newAccessToken,
      newRefreshToken,
    };
  } catch (error) {
    return {
      error: "Invalid refresh token.",
    };
  }
}
