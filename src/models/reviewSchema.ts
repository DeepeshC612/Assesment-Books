import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "userData",
  },
  companyId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "companyData",
  },
  likes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      value: { type: Number, enum: [0, 1], default: 0 },
    },
  ],
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});
reviewSchema.set("timestamps", true);

export default mongoose.model("reviewData", reviewSchema);
