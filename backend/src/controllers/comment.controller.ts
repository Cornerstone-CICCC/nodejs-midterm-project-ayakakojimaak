import { Request, Response } from "express";
import type { Comment } from "../types/comment";
import { commentModel } from "../models/comment.model";
import { userModel } from "../models/user.model";

function getAllComments(req: Request, res: Response) {
  const comments = commentModel.getComments();
  res.json(comments);
}

function getCommentsByCocktailId(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const comments = commentModel.getCommentsByCocktailId(id);
  res.json(comments);
}

function getCommentsByAuthorId(req: Request, res: Response) {
  if (!req.session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const userId = req.session.id;
  const comments = commentModel.getCommentsByAuthorId(userId);
  res.json(comments);
}

function addComment(req: Request<{ id: string }, {}, Comment>, res: Response) {
  const { id } = req.params;
  console.log(req.body);
  const { rate, text, cocktailName } = req.body;
  console.log(rate, text, cocktailName);
  if (!req.session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const userId = req.session.id;
  const user = userModel.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const newComment = commentModel.addComment({
    cocktailId: id,
    cocktailName: cocktailName,
    authorId: userId,
    authorName: user.username,
    rate: rate,
    text: text,
  });
  res.status(200).json(newComment);
}

function editComment(req: Request<{ id: string }, {}, Comment>, res: Response) {
  const { id } = req.params;
  if (!req.session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const userId = req.session.id;
  const user = userModel.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: "Unauthorized" });
  }
  const updatedComment = commentModel.editComment(id, req.body, user);
  if (!updatedComment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.status(200).json(updatedComment);
}

function deleteComment(req: Request<{ id: string }, {}, Comment>, res: Response) {
  const { id } = req.params;
  if (!req.session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const userId = req.session.id;
  const user = userModel.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: "Unauthorized" });
  }
  const deletedComment = commentModel.deleteComment(id, user);
  if (!deletedComment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.status(200).json(deletedComment);
}

export const commentController = {
  getAllComments,
  getCommentsByCocktailId,
  getCommentsByAuthorId,
  addComment,
  editComment,
  deleteComment,
};
