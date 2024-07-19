import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";

export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatusCodes.NOT_FOUND).json({
    message: "No Path Found",
  });
}

export function genericErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(error.statusCode || 500).json({
    message: error.message,
    success: error.success,
  });
}
