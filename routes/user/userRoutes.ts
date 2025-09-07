import express from "express";
import { userController } from "../../controllers/user/userController";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("/:id", userController.updateUserById);

export default userRouter;