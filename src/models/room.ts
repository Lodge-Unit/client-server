import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotelID: {
      type: String,
      required: true,
    },
    reservationID: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price_per_night: {
      type: String,
      required: true,
    },
    maximum_capacity: {
      type: String,
      required: true,
    },
    facilities: Array,
    images: Array,
    number_of_beds: {
      type: String,
      required: true,
    },
    number_of_baths: {
      type: String,
      required: true,
    },
    number_of_bedrooms: {
      type: Number,
      default: 0,
    },
    stay_information: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "available",
    },

    commentCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    reviewStart: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    like: {
      type: Boolean,
      default: false,
    },
    saleOff: {
      type: String,
      default: "",
    },
    isAds: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
