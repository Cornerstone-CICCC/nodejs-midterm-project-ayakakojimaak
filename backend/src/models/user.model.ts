import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import type { User } from "../types/user";
import fs from "fs";
import path from "path";

const filepath = path.join(__dirname, "../../");
const userDataFilePath = path.join(filepath, "data/users.json");

function readUsers() {
  const data = fs.readFileSync(userDataFilePath, "utf-8");
  return JSON.parse(data);
}

function createUser(user: Omit<User, "id">) {
  const users = readUsers();
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  const newUser = { ...user, password: hashedPassword, id: uuidv4() };
  users.push(newUser);
  fs.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
  return newUser;
}

function getUserByEmail(email: string) {
  const users = readUsers();
  return users.find((user: User) => user.email === email);
}

function signinUser(email: string, password: string) {
  const user = getUserByEmail(email);
  if (!user) {
    return null;
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return user;
}

function updateUser(id: string, user: User) {
  const users = readUsers();
  const userIndex = users.findIndex((user: User) => user.id === id);
  if (userIndex === -1) {
    return null;
  }
  const updatedUser = { ...user, id };
  users[userIndex] = updatedUser;
  fs.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
  return updatedUser;
}

function deleteUser(id: string) {
  const users = readUsers();
  const userIndex = users.findIndex((user: User) => user.id === id);
  if (userIndex === -1) {
    return null;
  }
  const deletedUser = users.splice(userIndex, 1);
  fs.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
  return deletedUser;
}

export const userModel = {
  readUsers,
  createUser,
  getUserByEmail,
  signinUser,
  updateUser,
  deleteUser,
};
