import { users } from "../data/users";
import { IUser } from "../interface/user";
import { ROLES } from "../utils/enum";

let counter = users.length;
export function signup(user: Pick<IUser, "name" | "email" | "password">) {
  const { name, email, password } = user;
  users.push({
    id: counter.toString(),
    name,
    email,
    password,
    role: ROLES.USER
  });
  counter++;
  return {
    message: "User added successfully."
  };
}

export function getUsers() {
  return users;
}

export function getUserByEmail(email: string) {
  const existingUser = users.find((user) => user.email === email);
  return existingUser;
}

export function fetchUserById(userId: string){
  const user = users.find(user => user.id === userId);
  return user;
}

export function updateUser(index: number, userId: string, user: Omit<IUser, "role">){
  users[index].name = user.name;
  users[index].email = user.email;
  users[index].password = user.password;
  return {
    message: `User with id ${userId} updated.`,
  }
}

export function deleteUserById(id: string) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return {
      message: `User with id ${id} deleted.`,
    };
  }
  return {
    message: `User with id ${id} does not exist.`,
  };
}


