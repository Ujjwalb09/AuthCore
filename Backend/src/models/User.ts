import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/types";

export interface IUserDocument extends IUser, Document {
  matchedPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

//*hasing password

//mongoose middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.matchedPassword = async function (
  this: IUserDocument,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};
