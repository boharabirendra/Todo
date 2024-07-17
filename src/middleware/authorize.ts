import { NextFunction, Response } from "express";
import { ROLES } from "../utils/enum";
import { Request } from "../interface/auth";
import { ForbiddenError } from "../error/Errors";

export function authorize(action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissions:string[]  = req.body.permissions;
    if (!permissions.includes(action)) {
      return next(
        new ForbiddenError("Forbidden access.")
      );
    }
    next();
  };
}
