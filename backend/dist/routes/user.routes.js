"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/get", user_controller_1.userController.getUser);
userRouter.post("/create", user_controller_1.userController.createUser);
userRouter.get("/get/:id", (req, res) => {
    user_controller_1.userController.getUserById(req, res);
});
userRouter.put("/update/:id", (req, res) => {
    user_controller_1.userController.updateUser;
});
userRouter.delete("/delete/:id", (req, res) => {
    user_controller_1.userController.deleteUser;
});
exports.default = userRouter;
