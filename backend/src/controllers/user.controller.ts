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

function getUserById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const user = userModel.getUserById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    return res.status(200).json(user);
  }
}

function updateUser(req: Request<{ id: string }, {}, User>, res: Response) {
  const { id } = req.params;
  const user = userModel.updateUser(id, req.body);
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
  return res.status(200).json(user);
}

export const userController = {
  getUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
