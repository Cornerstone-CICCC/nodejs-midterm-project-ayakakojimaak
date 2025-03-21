"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
function createUser(req, res) {
    const reqBody = req.body;
    const user = user_model_1.userModel.createUser(reqBody);
    if (!user) {
        res.status(400).json({ error: "User not created" });
        return;
    }
    res.status(200).json({ msg: "User created" });
}
function updateUser(req, res) {
    const { id } = req.params;
    const user = user_model_1.userModel.updateUser(id, req.body);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.status(200).json(user);
}
function signinUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }
    const user = user_model_1.userModel.getUserByEmail(email);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid password" });
        return;
    }
    if (req.session) {
        req.session.id = user.id;
        req.session.isLoggedIn = true;
    }
    console.log(req.session);
    res.status(200).json({ msg: "User signed in" });
}
function signOutUser(req, res) {
    req.session = null;
    res.status(200).json({ msg: "User signed out" });
}
function checkAuth(req, res) {
    console.log(req.session);
    if (req.session.isLoggedIn) {
        const id = req.session.id;
        const user = user_model_1.userModel.getUserById(id);
        const data = {
            username: user.username,
            email: user.email,
            role: user.role,
        };
        res.status(200).json(data);
    }
    else {
        res.status(401).json({ error: "Unauthorized" });
    }
}
function deleteUser(req, res) {
    const { id } = req.params;
    const user = user_model_1.userModel.deleteUser(id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.status(200).json({ msg: "User deleted" });
}
exports.userController = {
    createUser,
    signinUser,
    signOutUser,
    checkAuth,
    updateUser,
    deleteUser,
};
