import { NextFunction, Response } from "express";
import HttpStatusCode from "http-status-codes";
import { IUser } from "../interface/user";
import * as UserService from "../service/users";
import loggerWithNameSpace from "../utils/logger";
import { Request } from "../interface/auth";


const logger = loggerWithNameSpace("UserController");

/**Add user */
export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.body;
    // logger.info("Called user signup");
    const result = await UserService.signup(user);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
}

export function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = UserService.getUsers();
    return users.length
      ? res.status(HttpStatusCode.OK).json(users)
      : res.status(HttpStatusCode.OK).json({ message: "No users found." });
  } catch (error) {
    next(error);
  }
}

export function fetchUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const user = UserService.fetchUserById(id);
    res.status(HttpStatusCode.OK).json(user);
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
    const user = req.user!;
    const { id } = req.params;
    logger.info("Called updateUser");
    const result = await UserService.updateUser(id, user);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
}

export function deleteUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    logger.info("Called deleteUserById");
    const result = UserService.deleteUserById(id);
    res.status(HttpStatusCode.OK).json({
      result,
    });
  } catch (error) {
    next(error);
  }
}

