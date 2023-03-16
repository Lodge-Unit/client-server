import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hotelID: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    maximum_capacity: {
      type: String,
      required: true,
    },
    facilities: {
      type: String,
      required: true,
    },
    images: [],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
