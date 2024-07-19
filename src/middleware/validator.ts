import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { ApiError } from "../utils/ApiError";

export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);
    if (error) next(new ApiError(400, error.message));
    req.query = value;
    next();
  };
}

export function validateReqParams(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);
    if (error) next(new ApiError(400, error.message));
    req.params = value;
    next();
  };
}

export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) next(new ApiError(400, error.message));
    req.body = value;
    next();
  };
}
