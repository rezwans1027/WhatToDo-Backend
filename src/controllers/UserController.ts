import { Request, Response } from "express";
import User from "../models/UserModel";

export const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0id } = req.body;
    const existingUser = await User.findOne({ auth0id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = await User.create(req.body);
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Creating User" });
  }
};