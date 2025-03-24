import { Router, Response, Request } from "express";
import type { User } from "../types/user";
import { userController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/create", (req: Request<{}, {}, User>, res: Response) => {
  userController.createUser(req, res);
});

userRouter.put("/update", (req: Request<{}, {}, User>, res: Response) => {
  userController.updateUser(req, res);
});

userRouter.delete("/delete/:id", (req: Request, res: Response) => {
  userController.deleteUser(req, res);
});

userRouter.post("/signin", (req: Request<{}, {}, Partial<User>>, res: Response) => {
  userController.signinUser(req, res);
});

userRouter.get("/signout", (req: Request, res: Response) => {
  userController.signOutUser(req, res);
});

userRouter.get("/check", (req: Request, res: Response) => {
  userController.checkAuth(req, res);
});
export default userRouter;
