import { Request, Response } from "express";
import type { User } from "../types/user";
import { userModel } from "../models/user.model";

function getUser(req: Request, res: Response) {
  const users = userModel.readUsers();
  res.json(users);
}

function createUser(req: Request<{}, {}, Omit<User, "id">>, res: Response) {
  const reqBody = req.body;
  const user = userModel.createUser(reqBody);
  res.json(user);
}

function updateUser(req: Request<{ id: string }, {}, User>, res: Response) {
  const { id } = req.params;
  const user = userModel.updateUser(id, req.body);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json(user);
}

function signinUser(req: Request<{}, {}, User>, res: Response) {
  const { email, password } = req.body;
  const user = userModel.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const isPasswordValid = userModel.signinUser(email, password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  return res.status(200).json(user);
}

function signOutUser(req: Request, res: Response) {
  const user = userModel.signOutUser();
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json(user);
}

function checkAuth(req: Request, res: Response) {
  const user = userModel.checkAuth();
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json(user);
}

function deleteUser(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const user = userModel.deleteUser(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json({ msg: "User deleted" });
}

export const userController = {
  getUser,
  createUser,
  signinUser,
  signOutUser,
  checkAuth,
  updateUser,
  deleteUser,
};
