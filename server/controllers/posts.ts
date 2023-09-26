import mongoose from "mongoose";

import type { Request, Response } from "express";

import PostModel, { type Post } from "../models/post.js";

export async function getPosts(_: Request, res: Response) {
  try {
    const posts = await PostModel.find();

    res.status(200).json({ posts });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createPost(req: Request, res: Response) {
  const post = req.body as Post;

  const newPost = new PostModel({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function likePost(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = req.query;

  if (typeof userId !== "string")
    return res.status(400).json({ message: "userId is not of type string" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: `Post with ID ${id} doesn't exist.` });

  const post = await PostModel.findById(id);

  if (!post)
    return res
      .status(400)
      .json({ message: `Post with id ${id} doesn't exist` });

  if (post.likes.includes(userId))
    return res.status(403).json({ message: "Already liked" });

  post.likes.push(userId);

  const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: `Post with ID ${id} doesn't exist.` });

  try {
    await PostModel.findByIdAndDelete(id);

    res.status(204).json({ message: "Post deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updatePost(req: Request, res: Response) {
  const post = req.body as Post;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ message: `Post with ID ${id} doesn't exist.` });

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
