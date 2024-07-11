import { IUser } from "../interface/user";
import bcryptjs from "bcryptjs";
import * as UserModel from "../model/users";
import * as TodoModel from "./todos";
import { ROLES } from "../utils/enum";
import {
  ConflictError,
  NotFoundError,
} from "../error/Errors";
import { users } from "../data/users";
import { forbiddenRoleChecker } from "../utils/forbiddenRoleChecker";

/**Add user by admin */
export async function signup(
  user: Pick<IUser, "name" | "email" | "password" | "role">
) {
  forbiddenRoleChecker(user.role);
  const existingUser = UserModel.getUserByEmail(user.email);
  if (existingUser) throw new ConflictError("Conflict: User already exist.");

  const hashPassword = await bcryptjs.hash(user.password, 10);
  user.password = hashPassword;
  const result = UserModel.signup(user);
  return result;
}

export function getUsers(role: ROLES) {
  forbiddenRoleChecker(role);
  return UserModel.getUsers();
}

export function getUserByEmail(email: string) {
  const existingUser = UserModel.getUserByEmail(email);
  return existingUser;
}

export function fetchUserById(userId: string, role: ROLES) {
  forbiddenRoleChecker(role);
  const user = UserModel.fetchUserById(userId);
  if (!user) throw new NotFoundError(`User with id ${userId} does not exist`);
  return user;
}

/**Update user */
export async function updateUser(userId: string, user: IUser) {
  const { email, role } = user;
  forbiddenRoleChecker(role);
  const existingUser = UserModel.fetchUserById(userId);
  if (!existingUser)
    throw new NotFoundError(`User with id ${userId} does not exist`);
  const hashPassword = await bcryptjs.hash(user.password, 10);
  user.password = hashPassword;
  const index = users.findIndex(user => user.id === userId);
  return UserModel.updateUser(index, userId, user);
}

/** Delete user by id */
export function deleteUserById(id: string, role: ROLES) {
  forbiddenRoleChecker(role);
  return UserModel.deleteUserById(id);
}

