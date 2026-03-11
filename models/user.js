import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  field: { type: String, default: "Pure Mathematics" },
  level: { type: Number, default: 1 },
  achievements: [String],
});

const User = mongoose.model("User", UserSchema);

export default User;