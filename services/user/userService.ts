import { UpdateQuery } from "mongoose";
import { IUserData } from "../../interfaces/user/userData";
import User from "../../models/user/userModel";

interface ExtendedUpdateData extends UpdateQuery<IUserData> {
  mode?: "replace" | string;
  education?: IUserData["education"];
}

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
    throw new Error(`Error fetching user ${userId}`);
  }
};

const updateUserById = async (
  userId: string,
  updateData: ExtendedUpdateData
) => {
  const { education, mode } = updateData;
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
    throw new Error(`Error updating user ${userId}`);
  }
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUserById
};
