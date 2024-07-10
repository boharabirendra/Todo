import { Request, Response } from "express";
import { IUser } from "../interface/user";
import * as UserService from "../service/users";

export async function signup(
  req: Request<any, any, Pick<IUser, "email" | "name" | "password">>,
  res: Response
) {
  const user: Pick<IUser, "name" | "email" | "password"> = req.body;
  const result = await UserService.signup(user);
  res.json({ result });
}

export function getUsers(req: Request, res: Response) {
  const users = UserService.getUsers();
  return users.length
    ? res.json(users)
    : res.json({ message: "No users found." });
}

export function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;
  const result = UserService.deleteUserById(id);
  res.json({
    result,
  });
}


