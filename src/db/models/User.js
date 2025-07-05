import { Schema, model } from 'mongoose';


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,

    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

export default User;