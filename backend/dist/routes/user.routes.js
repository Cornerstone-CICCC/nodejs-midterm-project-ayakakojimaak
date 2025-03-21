"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/create", (req, res) => {
    user_controller_1.userController.createUser;
});
userRouter.put("/update/:id", (req, res) => {
    user_controller_1.userController.updateUser(req, res);
});
userRouter.delete("/delete/:id", (req, res) => {
    user_controller_1.userController.deleteUser(req, res);
});
userRouter.post("/signin", (req, res) => {
    user_controller_1.userController.signinUser(req, res);
});
userRouter.get("/signout", (req, res) => {
    user_controller_1.userController.signOutUser(req, res);
});
userRouter.get("/check", (req, res) => {
    user_controller_1.userController.checkAuth(req, res);
});
exports.default = userRouter;
