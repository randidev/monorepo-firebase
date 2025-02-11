import { Request, Response } from "express";
import {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../repository/userCollection";

export const fetchUser = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json({ message: "User fetched", users });
  } catch (error: any) {
    console.log({ error });

    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    await addUser(req.body);
    const users = await getUsers();
    res.status(200).json({ message: "User added", users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await updateUser(id, req.body);
    const users = await getUsers();
    res.status(200).json({ message: "User updated", users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    const users = await getUsers();
    res.status(200).json({ message: "User deleted", users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
