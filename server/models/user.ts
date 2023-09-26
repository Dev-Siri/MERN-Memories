import mongoose from "mongoose";

export interface User {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  username: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model<User>("users", userSchema);

export default UserModel;
