import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },

    association: {
      type: String,
    },

    expire: {
      type: Date,
      default: () => new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      expires: 0, 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);
