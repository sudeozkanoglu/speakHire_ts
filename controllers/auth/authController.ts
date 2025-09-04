import { Request, Response } from "express";
import httpStatus from "http-status";
import type { IUserData } from "../../interfaces/user/userData";
import {
  loginValidation,
  registerValidation,
} from "../../validation/auth/authValidation";
import { loginService, registerService } from "../../services/auth/authService";

export const registerController = async (req: Request, res: Response) => {
  const { error } = registerValidation.validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const { user, token } = await registerService(req.body as IUserData);
  res.status(httpStatus.CREATED).json({ user, token });
};

export const loginController = async (req: Request, res: Response) => {
  const { error } = loginValidation.validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const { user, token } = await loginService(req.body);
  res.status(200).json({ user, token });
};
