import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hotelID: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    guests: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
