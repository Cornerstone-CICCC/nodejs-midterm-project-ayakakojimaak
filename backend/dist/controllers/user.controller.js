"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_model_1 = require("../models/user.model");
function getUser(req, res) {
    const users = user_model_1.userModel.readUsers();
    res.json(users);
}
function createUser(req, res) {
    const reqBody = req.body;
    const user = user_model_1.userModel.createUser(reqBody);
    res.json(user);
}
function getUserById(req, res) {
    const { id } = req.params;
    const user = user_model_1.userModel.getUserById(id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    else {
        return res.status(200).json(user);
    }
}
function updateUser(req, res) {
    const { id } = req.params;
    const user = user_model_1.userModel.updateUser(id, req.body);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
}
function deleteUser(req, res) {
    const { id } = req.params;
    const user = user_model_1.userModel.deleteUser(id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
}
exports.userController = {
    getUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
