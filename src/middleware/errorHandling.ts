import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { ApiError } from "../utils/ApiError";

export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatusCodes.NOT_FOUND).json({
    message: "No Path Found",
  });
}

export function genericErrorHandler(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(error.statusCode || 500).json({
    errorType: error.errorType,
    message: error.message,
    success: error.success,
  });
}
