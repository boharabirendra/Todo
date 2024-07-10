import { IUser } from "../interface/user";
import bcryptjs from "bcryptjs";
import * as UserModel from "../model/users";
import * as TodoModel from "./todos";

export async function signup(user: Pick<IUser, "name" | "email" | "password">) {
  const hashPassword = await bcryptjs.hash(user.password, 10);
  user.password = hashPassword;
  const result = UserModel.signup(user);
  return result;
}

export function getUsers() {
  return UserModel.getUsers();
}

export function getUserByEmail(email: string) {
  const existingUser = UserModel.getUserByEmail(email);
  return existingUser;
}

export function deleteUserById(id: string){
  return UserModel.deleteUserById(id);
}


export function fetchTodos(userId: string){
   const allTodos = TodoModel.fetchTodos();
   const todos = allTodos.filter(todo => todo.userId = userId);
   return todos;
}
