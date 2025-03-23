import { Router, Request, Response } from "express";
import { commentController } from "../controllers/comment.controller";
import { Comment } from "../types/comment";

const commentRouter = Router();

commentRouter.get("/", commentController.getAllComments);
commentRouter.get("/cocktail/:id", commentController.getCommentsByCocktailId);
commentRouter.get("/author", commentController.getCommentsByAuthorId);
commentRouter.post("/cocktail/:id", (req: Request<{ id: string }, {}, Comment>, res: Response) => {
  commentController.addComment(req, res);
});
commentRouter.put("/:id", (req: Request<{ id: string }>, res: Response) => {
  commentController.editComment(req, res);
});
commentRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  commentController.deleteComment(req, res);
});

export default commentRouter;
