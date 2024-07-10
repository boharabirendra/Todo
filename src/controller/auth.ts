import { Request, Response } from "express";
import { IUser } from "../interface/user";
import * as AuthService from "../service/auth";

export async function login(req: Request, res: Response){
    const body: Pick<IUser, "email" | "password"> = req.body; 
    const authResult = await AuthService.login(body);
    res.setHeader('Authorization', `Bearer ${authResult.accessToken}`);
    res.json(authResult); 
}