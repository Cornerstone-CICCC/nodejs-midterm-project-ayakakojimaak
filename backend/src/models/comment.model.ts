import { v4 as uuidv4 } from "uuid";
import type { Comment } from "../types/comment";
import type { User } from "../types/user";
import fs from "fs";
import path from "path";

const filepath = path.join(__dirname, "../../");
const commentsDataFilePath = path.join(filepath, "data/comments.json");

function getComments() {
  if (!fs.existsSync(commentsDataFilePath)) {
    fs.writeFileSync(commentsDataFilePath, JSON.stringify([], null, 2));
  }
  const data = fs.readFileSync(commentsDataFilePath, "utf-8");
  return JSON.parse(data);
}

function getCommentsByCocktailId(cocktailId: string) {
  const comments = getComments();
  return comments.filter((comment: Comment) => comment.cocktailId === cocktailId);
}

function getCommentsByAuthorId(authorId: string) {
  const comments = getComments();
  return comments.filter((comment: Comment) => comment.authorId === authorId);
}

function addComment(comment: Omit<Comment, "id">) {
  const comments = getComments();
  const newComment: Comment = {
    id: uuidv4(),
    ...comment,
  };
  comments.push(newComment);
  fs.writeFileSync(commentsDataFilePath, JSON.stringify(comments, null, 2));
  return newComment;
}

function editComment(commentId: string, { text, rate }: Omit<Comment, "id">, user: User) {
  let comments = getComments();
  const oldComment = comments.find((comment: Comment) => comment.id === commentId);
  if (!oldComment) {
    return null;
  }
  if (oldComment.authorId !== user.id && user.role !== "admin") {
    return null;
  }

  const updatedComment = {
    ...oldComment,
    text: text || oldComment.text,
    rate: rate || oldComment.rate,
  };

  comments = comments.map((comment: Comment) => (comment.id === commentId ? updatedComment : comment));
  fs.writeFileSync(commentsDataFilePath, JSON.stringify(comments, null, 2));
  return updatedComment;
}

function deleteComment(commentId: string, user: User) {
  let comments = getComments();
  const comment = comments.find((comment: Comment) => comment.id === commentId);
  if (!comment) {
    return null;
  }
  console.log(comment.authorId === user.id, user.role);
  if (comment.authorId !== user.id && user.role !== "admin") {
    return null;
  }
  comments = comments.filter((comment: Comment) => comment.id !== commentId);
  fs.writeFileSync(commentsDataFilePath, JSON.stringify(comments, null, 2));
  return comment;
}

export const commentModel = {
  getComments,
  getCommentsByCocktailId,
  getCommentsByAuthorId,
  addComment,
  editComment,
  deleteComment,
};
