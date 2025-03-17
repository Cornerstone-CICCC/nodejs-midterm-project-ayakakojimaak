import { Router, Response, Request } from "express";
import type { User } from "../types/user";
import { userController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/get", userController.getUser);

userRouter.post("/create", userController.createUser);

userRouter.post("/signin", (req: Request<{}, {}, User>, res: Response) => {
  userController.signinUser(req, res);
});

userRouter.put("/update/:id", (req: Request<{ id: string }, {}, User>, res: Response) => {
  userController.updateUser(req, res);
});

userRouter.delete("/delete/:id", (req: Request<{ id: string }>, res: Response) => {
  userController.deleteUser(req, res);
});

export default userRouter;
