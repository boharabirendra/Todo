import { NextFunction, Response, Request } from "express";
import HttpStatusCode from "http-status-codes";
import * as UserService from "../service/users";
import loggerWithNameSpace from "../utils/logger";
import { GetUserQuery } from "../interface/user";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const logger = loggerWithNameSpace("UserController");

/**Add user */
export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      logger.info("Called user signup");
      await UserService.signup(user);
      res.status(HttpStatusCode.OK).json({
        message: "User created",
      });
    } catch (error: any) {
      next(new ApiError(500, error.detail));
    }
  }
);

export const getUserById = asyncHandler(
  async (
    req: Request<any, any, any, GetUserQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) next(new ApiError(404, `User with id ${id} does not exist`));
    res.json(user);
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const { id } = req.params;
      logger.info("Called updateUser");
      const response = await UserService.updateUser(id, user);
      if (!response)
        next(new ApiError(404, `User with id ${id} does not exist`));
      res.status(HttpStatusCode.OK).json({
        message: "User updated",
      });
    } catch (error) {
      next(new ApiError(500, "DB operation failed"));
    }
  }
);

export const deleteUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.params;
    const response = await UserService.deleteUserById(userId);
    if (!response) throw new ApiError(500, "Deletion failed");
    res.status(HttpStatusCode.OK).json({
      message: "User deleted",
    });
  }
);

export const getUsers = asyncHandler(async(
  req: Request<any, any, any, GetUserQuery>,
  res: Response,
  next: NextFunction
) =>{
  try {
    const { query } = req;
    const users = await UserService.getUsers(query);
    res.status(HttpStatusCode.OK).json(users);
  } catch (error) {
    next(error);
  }
})
