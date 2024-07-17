import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  TransactionFail,
  UnauthenticatedError,
} from "../error/Errors";

export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatusCodes.NOT_FOUND).json({
    message: "Not Found",
  });
}

export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ForbiddenError) {
    return res.status(HttpStatusCodes.FORBIDDEN).json({
      message: error.message,
    });
  }
  if (error instanceof ConflictError) {
    return res.status(HttpStatusCodes.CONFLICT).json({
      message: error.message,
    });
  }
  if (error instanceof UnauthenticatedError) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  }
  if (error instanceof NotFoundError) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      message: error.message,
    });
  }
  if (error instanceof BadRequestError) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }

  if (error instanceof TransactionFail) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}
