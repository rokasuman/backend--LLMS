import { number, required, string, types } from "joi";
import mongoose from "mongoose";

const bookschema = new mongoose.Schema(
  {
    status: { type: String, default: "inactive" },
    year: { type: Number, required: true },
    title: { type: String, required: true },
    auther: { type: String, required: true },
    imgUI: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: { type: String, required: true },
    avaiable: { type: String, required: true },
    averageRating: { type: Number, required: true },
    addBy: {
      name: { type: String, required: true },
      adminId: { type: mongoose.Types.ObjectId, required: true },
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Book",bookschema)
