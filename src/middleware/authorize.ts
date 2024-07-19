import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import { ApiError } from "../utils/ApiError";

export function authorize(action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const permissions: string[] = req.body.permissions;
    if (!permissions.includes(action))
      return next(new ApiError(403, "Forbidden access."));
    next();
  };
}
