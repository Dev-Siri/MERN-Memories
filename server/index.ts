import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import envSchema from "./env.js";

import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";

const PORT = process.env.PORT || 5000;

envSchema.parse(process.env);

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

try {
  await mongoose.connect(process.env.CONNECTION_URL);
  console.log("Database Connected.");
} catch (error) {
  console.error("Failed to connect to database:", error);
}

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
