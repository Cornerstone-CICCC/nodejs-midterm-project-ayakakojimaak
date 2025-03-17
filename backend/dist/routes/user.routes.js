"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get("/get", user_controller_1.userController.getUser);
userRouter.post("/create", user_controller_1.userController.createUser);
userRouter.post("/signin", (req, res) => {
    user_controller_1.userController.signinUser(req, res);
});
userRouter.put("/update/:id", (req, res) => {
    user_controller_1.userController.updateUser(req, res);
});
userRouter.delete("/delete/:id", (req, res) => {
    user_controller_1.userController.deleteUser(req, res);
});
exports.default = userRouter;
