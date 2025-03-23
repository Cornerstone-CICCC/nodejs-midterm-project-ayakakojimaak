import { Request, Response } from "express";
import type { User } from "../types/user";
import { userModel } from "../models/user.model";
import bcrypt from "bcrypt";

function createUser(req: Request<{}, {}, User>, res: Response) {
  const user = userModel.createUser(req.body);
  if (!user) {
    res.status(400).json({ error: "User not created" });
    return;
  }
  if (req.session) {
    req.session.id = user.id;
    req.session.isLoggedIn = true;
  }
  res.status(200).json({ msg: "User created" });
}

function updateUser(req: Request<{}, {}, User>, res: Response) {
  if (!req.session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const id = req.session.id;
  const user = userModel.updateUser(id, req.body);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(200).json(user);
}

function signinUser(req: Request<{}, {}, Partial<User>>, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }
  const user = userModel.getUserByEmail(email);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  if (req.session) {
    req.session.id = user.id;
    req.session.isLoggedIn = true;
  }
  res.status(200).json({ msg: "User signed in" });
}

function signOutUser(req: Request, res: Response) {
  req.session = null;
  res.status(200).json({ msg: "User signed out" });
}

function checkAuth(req: Request, res: Response) {
  console.log(req.session);
  if (req.session!.isLoggedIn) {
    const id = req.session!.id;
    const user = userModel.getUserById(id);
    const data = {
      username: user.username,
      email: user.email,
      role: user.role,
      id: user.id,
    };
    res.status(200).json(data);
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

function deleteUser(req: Request, res: Response) {
  if (!req.session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const id = req.session.id;
  const user = userModel.deleteUser(id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.status(200).json({ msg: "User deleted" });
}

export const userController = {
  createUser,
  signinUser,
  signOutUser,
  checkAuth,
  updateUser,
  deleteUser,
};
