import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyLocation: {
    type: String,
    required: true,
  },
  foundedOn: {
    type: Date,
    required: true,
  },
  companyCity: {
    type: String,
    required: true,
  },
  companyPic: {
    type: String,
    // required: true,
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
companySchema.set("timestamps", true);

export default mongoose.model("companyData", companySchema);
