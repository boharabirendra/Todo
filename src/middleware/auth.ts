import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { UnauthenticatedError } from "../error/Errors";


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

    const payload: any = verify(token[1], config.jwt.secret!);
    req.body.userId = payload.id;
    req.body.role = payload.role;
    
    next();
  } catch (error) {
    next(new UnauthenticatedError("Invalid access token"));
  }
}
