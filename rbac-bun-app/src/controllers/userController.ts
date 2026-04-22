import { Request, Response } from "express";
import { getAllUsers, createUser, deleteUser } from "../models/userModel";

export const listUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();

  res.render("users/list", {
    title: "Users",
    users
  });
};