"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const commentRouter = (0, express_1.Router)();
commentRouter.get("/", comment_controller_1.commentController.getAllComments);
commentRouter.get("/cocktail/:id", comment_controller_1.commentController.getCommentsByCocktailId);
commentRouter.get("/author", comment_controller_1.commentController.getCommentsByAuthorId);
commentRouter.post("/cocktail/:id", (req, res) => {
    comment_controller_1.commentController.addComment(req, res);
});
commentRouter.put("/:id", (req, res) => {
    comment_controller_1.commentController.editComment(req, res);
});
commentRouter.delete("/:id", (req, res) => {
    comment_controller_1.commentController.deleteComment(req, res);
});
exports.default = commentRouter;
