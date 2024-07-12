import { NextFunction, Response } from "express";
import { ROLES } from "../utils/enum";
import { Request } from "../interface/auth";
import { ForbiddenError } from "../error/Errors";

export function authorize(requiredRole: ROLES) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user!;
    if (role !== requiredRole) {
      return next(
        new ForbiddenError("Forbidden access.")
      );
    }
    next();
  };
}
