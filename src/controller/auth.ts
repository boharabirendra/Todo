import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import { IUser } from "../interface/user";
import * as AuthService from "../service/auth";

export async function login(req: Request, res: Response, next: NextFunction){
  try {
      const body: Pick<IUser, "email" | "password"> = req.body; 
      const authResult = await AuthService.login(body);
      res.status(HttpStatusCode.OK).json(authResult); 
  } catch (error) {
      next(error);
  }
}