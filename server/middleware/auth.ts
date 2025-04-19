import jsonwebtoken from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.slice(7);

  try {
    jsonwebtoken.verify(token, process.env.JWT_SECRET);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }

  next();
}
