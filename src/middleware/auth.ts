import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { UnauthenticatedError } from "../error/Errors";
import { IUser } from "../interface/user";
import { Request } from "../interface/auth";


export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      next(new UnauthenticatedError("Access token required"));
      return;
    }

    const token = authorization.split(" ");
    if (token.length !== 2 || token[0] !== "Bearer") {
       next(new UnauthenticatedError("Invalid access token"));
       return;
    }

    const user = verify(token[1], config.jwt.secret!) as IUser;
    req.body.userId = user.id;
    req.user = user;
    
    next();
  } catch (error) {
    next(new UnauthenticatedError("Invalid access token"));
  }
}
