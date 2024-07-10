import { users } from "../data/users";
import { IUser } from "../interface/user";

let counter = users.length;
export function signup(user: Pick<IUser, "name" | "email" | "password">) {
  const { name, email, password } = user;
  users.push({
    id: counter.toString(),
    name,
    email,
    password,
  });
  counter++;
  return {
    message: "User added successfully.",
    status: 200,
  };
}

export function getUsers() {
  return users;
}

export function getUserByEmail(email: string) {
  const existingUser = users.find((user) => user.email === email);
  return existingUser;
}

export function deleteUserById(id: string) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return {
      message: `User with id ${id} deleted.`,
      status: 200,
    };
  }
  return {
    message: `User with id ${id} does not exist.`,
    status: 404,
  };
}


