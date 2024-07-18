import { GetUserQuery, IUser } from "../interface/user";
import * as UserModel from "../model/users";
import { NotFoundError } from "../error/Errors";
import { hashPassword } from "../utils/hashPassword";

/**Add user by admin */
export async function signup(user: IUser) {
  try {
    const password = await hashPassword(user.password);
    await UserModel.UserModel.create({ ...user, password });
  } catch (error) {
    throw error;
  }
}

export function getUserByEmail(email: string) {
  return UserModel.UserModel.getUserByEmail(email);
}

export function getPermissions(userId: number) {
  return UserModel.UserModel.getPermissions(userId);
}
export async function getUserById(userId: string) {
  const user = await UserModel.UserModel.getUserById(userId);
  if (!user) throw new NotFoundError("No user found");
  return user;
}

export function getUsers(filter: GetUserQuery){
      return UserModel.UserModel.getUsers(filter);
}

/**Update user */
export async function updateUser(userId: string, user: IUser) {
  await getUserById(userId);
  const password = await hashPassword(user.password);
  await UserModel.UserModel.update(userId, { ...user, password });
}

/** Delete user by id */
export async function deleteUserById(userId: string) {
try {
    await getUserById(userId);
    await UserModel.UserModel.deleteUserById(userId);
} catch (error) {
  throw error;
}
}
