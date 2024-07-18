import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "http-status-codes";
import * as UserService from "../service/users";
import loggerWithNameSpace from "../utils/logger";
import { GetUserQuery } from "../interface/user";

const logger = loggerWithNameSpace("UserController");

/**Add user */
export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.body;
    logger.info("Called user signup");
    const result = await UserService.signup(user);
    res.status(HttpStatusCode.OK).json({
      message: "User created",
    });
  } catch (error) {
    
    next(error);
  }
}

export async function getUserById(
  req: Request<any, any, any, GetUserQuery>,
  res: Response,
  next: NextFunction
) {
 try {
   const { id } = req.params;
   const user = await UserService.getUserById(id);
   res.json(user);
 } catch (error) {
   next(error);
 }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.body;
    const { id } = req.params;
    logger.info("Called updateUser");
    const result = await UserService.updateUser(id, user);
    res.status(HttpStatusCode.OK).json({
      message: "User updated",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.params;
    logger.info("Called deleteUserById");
    await UserService.deleteUserById(userId);
    res.status(HttpStatusCode.OK).json({
      message: "User deleted",
    });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req: Request<any, any, any, GetUserQuery>,
  res: Response,
  next: NextFunction) {
  try {
    const {query} = req;
    const users = await UserService.getUsers(query);
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    next(error);
  }
}
