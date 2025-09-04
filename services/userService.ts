import { UpdateQuery } from "mongoose";
import User from "../models/userModel";
import { IUserData } from "../interfaces/userData";

// FOR ADMIN PAGE
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

// FOR USERS
const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error("Error fetching user");
  }
};

const updateUserById = async (
  userId: string,
  updateData: UpdateQuery<IUserData>
) => {
  const { education, mode } = updateData as any;
  try {
    if (mode === "replace" && Array.isArray(education)) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { education } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } else {
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      });
      return updatedUser;
    }
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUserById
};
