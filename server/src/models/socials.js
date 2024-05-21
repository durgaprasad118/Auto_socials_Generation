import mongoose from "mongoose";
const SocialsSchema = new mongoose.Schema(
  {
    domain: String,
    numberOfEmployees:Number,
    followersCount:Number
  },
  {
    timestamps: true,
  }
);

export const Socials = mongoose.model("Socials", SocialsSchema);