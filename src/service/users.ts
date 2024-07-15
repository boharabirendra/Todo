import { IUser } from "../interface/user";
import * as UserModel from "../model/users";
import { ROLES } from "../utils/enum";
import { ConflictError, NotFoundError } from "../error/Errors";
import { users } from "../data/users";
import { hashPassword } from "../utils/hashPassword";

/**Add user by admin */
export async function signup(
  user: Pick<IUser, "name" | "email" | "password" | "role">
) {
  const existingUser = UserModel.getUserByEmail(user.email);
  if (existingUser) throw new ConflictError("Conflict: User already exist.");
  const hashPass = await hashPassword(user.password);
  const result = UserModel.signup({...user, password: hashPass});
  return result;
}

export function getUsers() {
  return UserModel.getUsers();
}

export function getUserByEmail(email: string) {
  const existingUser = UserModel.getUserByEmail(email);
  return existingUser;
}

export function fetchUserById(userId: string) {
  const user = UserModel.fetchUserById(userId);
  if (!user) throw new NotFoundError(`User with id ${userId} does not exist`);
  return user;
}

/**Update user */
export async function updateUser(userId: string, user: IUser) {
  const existingUser = UserModel.fetchUserById(userId);
  if (!existingUser){
    throw new NotFoundError(`User with id ${userId} does not exist`);
  }
  const hashPass = await hashPassword(user.password);
  const index = users.findIndex((user) => user.id === userId.toString());
  const response =  UserModel.updateUser(index, userId, {...user, password: hashPass});
  return response;
}

/** Delete user by id */
export function deleteUserById(id: string) {
  return UserModel.deleteUserById(id);
}
