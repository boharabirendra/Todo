import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interface/user";

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error("Unauthenticated");
    }

    const token = authorization.split(" ");
    if (token.length !== 2 || token[0] !== "Bearer") {
      throw new Error("Unauthenticated");
    }

    const payload: any = verify(token[1], config.jwt.secret!);
    req.body.userId = payload.id;
    
    next();
  } catch (error) {
    res.status(401).json({
      error: "Unauthorized access.",
    });
  }
}
