import User from "../models/userModel";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";
import type { IUserData } from "../interfaces/userData";
import { AppError } from "../utils/appError";

export const registerService = async (userData: IUserData) => {
  // TO DO => how can I use ternary operator ? Which place should be change for using it ?

  const existingUser = await User.findOne({ userName: userData.userName });
  if (existingUser) {
    throw new AppError("User already exists");
  }
  
  const hashedPassword = await hashPassword(userData.password);

  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
  });

  const token = await generateToken(newUser._id.toString(), newUser.userType);
  return { user: newUser, token };
};

export const loginService = async ({userName, password}: {userName: string, password: string}) => {
    const user = await User.findOne({userName});
    if(!user) {
        throw new Error("User Name is incorrect !");
    }

    const isMatch = await comparePassword(password, user.password);
    if(!isMatch) {
        throw new Error("Password is incorrect !");
    }

    const token = await generateToken(user._id.toString(), user.userType);
    return { user, token };
};