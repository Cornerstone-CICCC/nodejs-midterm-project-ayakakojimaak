"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentController = void 0;
const comment_model_1 = require("../models/comment.model");
const user_model_1 = require("../models/user.model");
function getAllComments(req, res) {
    const comments = comment_model_1.commentModel.getComments();
    res.json(comments);
}
function getCommentsByCocktailId(req, res) {
    const { id } = req.params;
    const comments = comment_model_1.commentModel.getCommentsByCocktailId(id);
    res.json(comments);
}
function getCommentsByAuthorId(req, res) {
    if (!req.session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const userId = req.session.id;
    const comments = comment_model_1.commentModel.getCommentsByAuthorId(userId);
    res.json(comments);
}
function addComment(req, res) {
    const { id } = req.params;
    console.log(req.body);
    const { rate, text, cocktailName } = req.body;
    console.log(rate, text, cocktailName);
    if (!req.session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const userId = req.session.id;
    const user = user_model_1.userModel.getUserById(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const newComment = comment_model_1.commentModel.addComment({
        cocktailId: id,
        cocktailName: cocktailName,
        authorId: userId,
        authorName: user.username,
        rate: rate,
        text: text,
    });
    res.status(200).json(newComment);
}
function editComment(req, res) {
    const { id } = req.params;
    if (!req.session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const userId = req.session.id;
    const user = user_model_1.userModel.getUserById(userId);
    if (!user) {
        return res.status(404).json({ error: "Unauthorized" });
    }
    const updatedComment = comment_model_1.commentModel.editComment(id, req.body, user);
    if (!updatedComment) {
        return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(updatedComment);
}
function deleteComment(req, res) {
    const { id } = req.params;
    if (!req.session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const userId = req.session.id;
    const user = user_model_1.userModel.getUserById(userId);
    if (!user) {
        return res.status(404).json({ error: "Unauthorized" });
    }
    const deletedComment = comment_model_1.commentModel.deleteComment(id, user);
    if (!deletedComment) {
        return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(deletedComment);
}
exports.commentController = {
    getAllComments,
    getCommentsByCocktailId,
    getCommentsByAuthorId,
    addComment,
    editComment,
    deleteComment,
};
