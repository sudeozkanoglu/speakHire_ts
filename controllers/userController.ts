import { Request, Response } from "express";
import { userService } from "../services/userService";
import { userUpdateValidation } from "../validations/userValidation";


const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: `Error fetching user ${req.params.id}` });
    }
};

const updateUserById = async (req: Request, res: Response) => {
    try {
        const {error} = userUpdateValidation.validate(req.body);
        if (error) throw new Error(error.details[0].message);

        const updatedUser = await userService.updateUserById(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user: updatedUser });
    } catch (error: any) {
        console.error("controller update error:", error);
        return res.status(500).json({ message: error?.message || `Error fetching user ${req.params.id}` });
    }
};

export const userController = {
    getAllUsers,
    getUserById,
    updateUserById
};