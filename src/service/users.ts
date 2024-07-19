import { GetUserQuery, IUser } from "../interface/user";
import * as UserModel from "../model/users";
import { hashPassword } from "../utils/hashPassword";

/**Add user by admin */
export async function signup(user: IUser) {
  const password = await hashPassword(user.password);
  return UserModel.UserModel.create({ ...user, password });
}

export function getUserByEmail(email: string) {
  return UserModel.UserModel.getUserByEmail(email);
}

export function getPermissions(userId: number) {
  return UserModel.UserModel.getPermissions(userId);
}

export function getUserById(userId: string) {
  return UserModel.UserModel.getUserById(userId);
}

export function getUsers(filter: GetUserQuery) {
  return UserModel.UserModel.getUsers(filter);
}

/**Update user */
export async function updateUser(userId: string, user: IUser) {
  const password = await hashPassword(user.password);
  return UserModel.UserModel.update(userId, { ...user, password });
}

/** Delete user by id */
export function deleteUserById(userId: string) {
  return UserModel.UserModel.deleteUserById(userId);
}
