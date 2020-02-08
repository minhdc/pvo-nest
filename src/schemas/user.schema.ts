import * as mongoose from "mongoose"


export const UserSchema = new mongoose.Schema(
    {
      email: { type: String, unique: true },
      password: String,
      passwordResetToken: String,
      passwordResetExpires: Date,
  
      facebookId: String,
      twitter: String,
      googleId: String,
      tokens: Array,
  
      profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
      },
  
      role: Number,
      iat: Date
    },
    { timestamps: true, collection: "Users" }
  );