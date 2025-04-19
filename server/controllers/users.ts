import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import type { Request, Response } from "express";

import UserModel, { type User } from "../models/user.js";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as Omit<User, "username">;

  try {
    const user = await UserModel.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ message: `No user found with email ${email}` });

    const passwordsMatch = bcryptjs.compareSync(password, user.password);

    if (!passwordsMatch)
      return res.status(400).json({ message: "Passwords do not match" });

    const token = jsonwebtoken.sign(
      {
        username: user.username,
        email,
        userId: user._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "2h",
      }
    );

    res.status(201).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function signup(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jsonwebtoken.sign(
      {
        username,
        email,
        userId: newUser._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "2h",
      }
    );

    res.status(201).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
