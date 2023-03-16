import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    hotelID: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    roomID: {
      type: String,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    payment_status: {
      type: String,
      default: "pending",
    },
    guestAdults: String,
    guestChildren: String,
    guestInfants: String,
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
