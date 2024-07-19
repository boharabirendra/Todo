import { Response, Request } from "express";
import HttpStatusCode from "http-status-codes";
import * as UserService from "../service/users";
import loggerWithNameSpace from "../utils/logger";
import { GetUserQuery } from "../interface/user";
import { asyncHandler } from "../utils/asyncHandler";

const logger = loggerWithNameSpace("UserController");

/**Add user */
export const signup = asyncHandler(
  async (req: Request, res: Response) => {
      const user = req.body;
      logger.info("Called user signup");
      await UserService.signup(user);
      res.status(HttpStatusCode.OK).json({
        message: "User created",
        success: true
      });
  }
);

export const getUserById = asyncHandler(
  async (
    req: Request<any, any, any, GetUserQuery>,
    res: Response
  ) => {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    res.json({user,  success: true});
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.body;
    const { id } = req.params;
    logger.info("Called updateUser");
    await UserService.updateUser(id, user);
    res.status(HttpStatusCode.OK).json({
      message: `User with id ${id} updated`,
      success: true,
    });
  }
);

export const deleteUserById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    await UserService.deleteUserById(userId);
    res.status(HttpStatusCode.OK).json({
      message: `User with id ${userId} deleted`,
      success: true,
    });
  }
);

export const getUsers = asyncHandler(
  async (
    req: Request<any, any, any, GetUserQuery>,
    res: Response,
  ) => {
    const { query } = req;
    const users = await UserService.getUsers(query);
    res.status(HttpStatusCode.OK).json({ users, success: true });
  }
);
