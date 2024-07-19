import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interface/user";
import { Request } from "../interface/auth";
import { getPermissions } from "../service/users";
import { ApiError } from "../utils/ApiError";

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) next(new ApiError(401, "Access token required"));

    const token = authorization.split(" ");
    if (token.length !== 2 || token[0] !== "Bearer")
      next(new ApiError(401, "Invalid access token"));

    const user = verify(token[1], config.jwt.secret!) as IUser;
    let permissions = await getPermissions(user.id);
    permissions = permissions.map((permission) => permission.permissionName);
    console.log(permissions);
    req.body.permissions = permissions;
    req.body.userId = user.id;
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid access token"));
  }
}
