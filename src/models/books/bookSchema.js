import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    status: { type: String, default: "inactive" },
    year: { type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imgUI: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: { type: String, required: true },
    available: { type: Boolean, default: false },
    averageRating: { type: Number },
    addBy: {
      name: { type: String },
      adminId: { type: mongoose.Types.ObjectId, required: true },
    },
    lastUpdatedBy: {
      name: { type: String },
      adminId: { type: mongoose.Types.ObjectId, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
