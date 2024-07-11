import { Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import * as RefreshService from "../service/refresh";

export function refreshToken(req: Request, res: Response) {
  const { refreshtoken } = req.headers;
  const result = RefreshService.refreshTokens(refreshtoken as string);
  res.setHeader("Authorization", `Bearer ${result.newAccessToken}`);
  res.status(HttpStatusCode.OK).json({ result });
}
