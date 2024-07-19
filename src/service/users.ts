import { GetUserQuery, IUser } from "../interface/user";
import * as UserModel from "../model/users";
import { ApiError } from "../utils/ApiError";
import { hashPassword } from "../utils/hashPassword";
import HtttpStatusCode from "http-status-codes";

/**Add user by admin */
export async function signup(user: IUser) {
    const existingUser = await UserModel.UserModel.getUserByEmail(user.email);
    if(existingUser) throw new ApiError(HtttpStatusCode.CONFLICT, `User with email ${user.email} already exist`);
    const password = await hashPassword(user.password);
    await UserModel.UserModel.create({ ...user, password });
}

export async function getUserByEmail(email: string) {
    const user = await UserModel.UserModel.getUserByEmail(email);
    if (!user)
      throw new ApiError(HtttpStatusCode.NOT_FOUND, `User with email ${email} not found`, "NOT FOUND");
    return user;
}

export function getPermissions(userId: number) {
  return UserModel.UserModel.getPermissions(userId);
}

export async function getUserById(userId: string) {
    const user = await UserModel.UserModel.getUserById(userId);
    if (!user)
      throw new ApiError(HtttpStatusCode.NOT_FOUND, `User with id ${userId} not found`, "NOT FOUND ERROR");
    return user;
}

export async function getUsers(filter: GetUserQuery) {
    const users = await UserModel.UserModel.getUsers(filter);
    if(!users.length) throw new ApiError(HtttpStatusCode.NOT_FOUND, `Users not found`, "NOT FOUND ERROR")
    return users;
}

/**Update user */
export async function updateUser(userId: string, user: IUser) {
    const existingUser = await UserModel.UserModel.getUserById(userId);
    if(!existingUser) new ApiError(HtttpStatusCode.NOT_FOUND, `User with id ${userId} not found`, "NOT FOUND ERROR");
    const password = await hashPassword(user.password);
    await UserModel.UserModel.update(userId, { ...user, password });
    return {...user, password};
}

/** Delete user by id */
export async function deleteUserById(userId: string) {
  const existingUser = await UserModel.UserModel.getUserById(userId);
  if(!existingUser) throw new ApiError(HtttpStatusCode.NOT_FOUND, `User with id ${userId} not found`, "NOT FOUND ERROR");
   await UserModel.UserModel.deleteUserById(userId);
   return "success";
}
