import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      long: String,
      lat: String,
    },
    pool: {
      type: Boolean,
      required: true,
    },
    restaurant: {
      type: Boolean,
      required: true,
    },
    club: {
      type: Boolean,
      required: true,
    },
    wifi: {
      type: Boolean,
      required: true,
    },
    parking_space: {
      type: Boolean,
      required: true,
    },
    hall: {
      type: Boolean,
      required: true,
    },
    transport_service: {
      type: Boolean,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    images: [],
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
