"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filepath = path_1.default.join(__dirname, "../../");
const commentsDataFilePath = path_1.default.join(filepath, "data/comments.json");
function getComments() {
    if (!fs_1.default.existsSync(commentsDataFilePath)) {
        fs_1.default.writeFileSync(commentsDataFilePath, JSON.stringify([], null, 2));
    }
    const data = fs_1.default.readFileSync(commentsDataFilePath, "utf-8");
    return JSON.parse(data);
}
function getCommentsByCocktailId(cocktailId) {
    const comments = getComments();
    return comments.filter((comment) => comment.cocktailId === cocktailId);
}
function getCommentsByAuthorId(authorId) {
    const comments = getComments();
    return comments.filter((comment) => comment.authorId === authorId);
}
function addComment(comment) {
    const comments = getComments();
    const newComment = Object.assign({ id: (0, uuid_1.v4)() }, comment);
    comments.push(newComment);
    fs_1.default.writeFileSync(commentsDataFilePath, JSON.stringify(comments, null, 2));
    return newComment;
}
function editComment(commentId, { text, rate }, user) {
    let comments = getComments();
    const oldComment = comments.find((comment) => comment.id === commentId);
    if (!oldComment) {
        return null;
    }
    if (oldComment.authorId !== user.id && user.role !== "admin") {
        return null;
    }
    const updatedComment = Object.assign(Object.assign({}, oldComment), { text: text || oldComment.text, rate: rate || oldComment.rate });
    comments = comments.map((comment) => (comment.id === commentId ? updatedComment : comment));
    fs_1.default.writeFileSync(commentsDataFilePath, JSON.stringify(comments, null, 2));
    return updatedComment;
}
function deleteComment(commentId, user) {
    let comments = getComments();
    const comment = comments.find((comment) => comment.id === commentId);
    if (!comment) {
        return null;
    }
    console.log(comment.authorId === user.id, user.role);
    if (comment.authorId !== user.id && user.role !== "admin") {
        return null;
    }
    comments = comments.filter((comment) => comment.id !== commentId);
    fs_1.default.writeFileSync(commentsDataFilePath, JSON.stringify(comments, null, 2));
    return comment;
}
exports.commentModel = {
    getComments,
    getCommentsByCocktailId,
    getCommentsByAuthorId,
    addComment,
    editComment,
    deleteComment,
};
