import mongoose from "mongoose";

export interface Post {
  title: string;
  description: string;
  image: string;
  creator: string;
  createdAt: Date;
  tags: string[];
  likes: string[];
}

const postSchema = new mongoose.Schema<Post>({
  title: String,
  description: String,
  image: String,
  creator: String,
  tags: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostModel = mongoose.model<Post>("posts", postSchema);

export default PostModel;
