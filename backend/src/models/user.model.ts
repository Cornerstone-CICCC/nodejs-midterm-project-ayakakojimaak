import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import type { User } from "../types/user";
import fs from "fs";
import path from "path";

const filepath = path.join(__dirname, "../../");
const userDataFilePath = path.join(filepath, "data/users.json");

function getUsers() {
  const data = fs.readFileSync(userDataFilePath, "utf-8");
  return JSON.parse(data);
}

function createUser(user: User) {
  const users = getUsers();
  const existingUser = users.find((u: User) => u.email === user.email);
  if (existingUser) {
    return null;
  }
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  const newUser = { ...user, password: hashedPassword, id: uuidv4(), role: "member" };
  users.push(newUser);
  fs.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
  return newUser;
}

function getUserByEmail(email: string) {
  const users = getUsers();
  return users.find((user: User) => user.email === email);
}

function getUserById(id: string) {
  const users = getUsers();
  return users.find((user: User) => user.id === id);
}

function updateUser(id: string, user: User) {
  const users = getUsers();
  const oldUser = getUserById(id);
  if (!user) {
    return null;
  }
  const updatedUser = {
    username: user.username ? user.username : oldUser.username,
    email: user.email ? user.email : oldUser.email,
    password: oldUser.password,
    role: oldUser.role,
    id: id,
  };
  const userIndex = users.findIndex((user: User) => user.id === id);
  users[userIndex] = updatedUser;
  fs.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
  return updatedUser;
}

function deleteUser(id: string) {
  const users = getUsers();
  const userIndex = users.findIndex((user: User) => user.id === id);
  if (userIndex === -1) {
    return null;
  }
  const deletedUser = users.splice(userIndex, 1);
  fs.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
  return deletedUser;
}

export const userModel = {
  getUsers,
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
};
