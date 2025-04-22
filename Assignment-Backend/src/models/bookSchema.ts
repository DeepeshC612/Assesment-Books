import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    // required: true,
    ref: "userData",
  },
  isActive: {
    type: Boolean,
  },
});
bookSchema.set("timestamps", true);

export default mongoose.model("bookData", bookSchema);
