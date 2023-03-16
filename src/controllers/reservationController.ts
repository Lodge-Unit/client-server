import Reservation from "../models/reservation";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mailer from "../services/email";
import { getUserId } from "../utils";
dotenv.config();

class ReservationController {
  async reserve(args: any, token: any) {
    try {
      const id = getUserId(token);
      if (!id) {
        return {
          response: {
            message: "Invalid or Expired token",
            status: "failed",
          },
        };
      }
      const newReservation = new Reservation({
        hotelID: args.hotelID,
        userID: id,
        roomID: args.roomID,
        checkIn: args.checkIn,
        checkOut: args.checkOut,
        guestAdults: args.guestAdults,
        guestChildren: args.guestChildren,
        guestInfants: args.guestInfants,
      });
      const result = await newReservation.save();
      if (result) {
        return {
          response: {
            message: "Reservation successfully",
            status: "success",
            reservation: result,
          },
        };
      } else {
        return {
          response: {
            message: "Operation failed !!",
            status: "failed",
          },
        };
      }
    } catch (error: any) {
      console.error(error);
      return {
        response: {
          message: error.message,
        },
      };
    }
  }

  async getReservations() {
    try {
      return await Reservation.find({});
    } catch (error) {
      console.error(error);
      return {
        response: {
          message: "Operation failed !!",
          status: "failed",
        },
      };
    }
  }

  async getReservation(args: any, token: any) {
    try {
      const id = getUserId(token);
      if (!id) {
        return {
          response: {
            message: "Invalid or Expired token",
            status: "failed",
          },
        };
      }
      return await Reservation.findById(args.id);
    } catch (error) {
      console.error(error);
      return {
        response: {
          message: "Operation failed !!",
          status: "failed",
        },
      };
    }
  }

  async cancelReservation(args: any, token: any) {
    try {
      const id = getUserId(token);
      if (!id) {
        return {
          response: {
            message: "Invalid or Expired token",
            status: "failed",
          },
        };
      }
      const result = await Reservation.updateOne(
        { _id: args.id },
        {
          $set: {
            status: "canceled",
          },
        }
      );
      if (result.acknowledged) {
        return {
          response: {
            message: "Reservation canceled !!",
            status: "success",
          },
        };
      }
    } catch (error) {
      console.error(error);
      return {
        response: {
          message: "Operation failed !!",
          status: "failed",
        },
      };
    }
  }
}

export default ReservationController;
