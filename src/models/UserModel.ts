import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  auth0id: { type: String, required: true },
  name: { type: String },
  email: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

export default User;
