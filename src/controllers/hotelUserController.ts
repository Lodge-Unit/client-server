import HotelUser from "../models/hotelUser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import _ from "lodash";
import bcrypt from "bcryptjs";
dotenv.config();

class hotelHotelUserController {
  async signUp(args: any) {
    // Check if the HotelUser exists
    const hotelUser = await HotelUser.find({ phone: args.phone });
    if (hotelUser.length >= 1) {
      return {
        response: {
          message: "HotelUser already exists",
          status: "failed",
        },
      };
    }

    // Create a new HotelUser
    try {
      const hash = await bcrypt.hash(args.password, 10);
      const newHotelUser = new HotelUser({
        fname: args.fname,
        lname: args.lname,
        email: args.email,
        phone: args.phone,
        role: args.role,
        password: hash,
      });
      const result = await newHotelUser.save();
      const token: string = jwt.sign(
        {
          HotelUserId: result._id,
          email: result.email,
          phone: result.phone,
        },
        process.env.JWT_SECRET as string
      );
      return {
        response: {
          message: "Account created",
          token: token,
          status: "success",
        },
      };
    } catch (error: any) {
      console.error(error);
      return {
        response: {
          message: error.message,
        },
      };
    }
  }
  async login(args: any) {
    try {
      const hotelUser = await HotelUser.find({ phone: args.phone });

      if (hotelUser.length < 1) {
        return {
          response: {
            message: "HotelUser not found !!",
            status: "failed",
          },
        };
      }

      // Compare password
      const result = await bcrypt.compare(args.password, hotelUser[0].password);
      if (result) {
        const token: string = jwt.sign(
          {
            HotelUserId: hotelUser[0]._id,
            email: hotelUser[0].email,
            phone: hotelUser[0].phone,
          },
          process.env.JWT_SECRET as string
        );
        return {
          response: {
            message: "Login Successful",
            token: token,
            status: "success",
          },
        };
      } else {
        return {
          response: {
            message: "Authentication failed !!",
            status: "failed",
          },
        };
      }
    } catch (error) {
      console.error(error);
      return {
        response: {
          message: "Authentication failed !!",
          status: "failed",
        },
      };
    }
  }
  async update(args: any) {
    try {
      const result = await HotelUser.updateOne(
        { _id: args.id },
        {
          $set: {
            fname: args.fname,
            lname: args.lname,
            email: args.email,
            phone: args.phone,
            role: args.role,
          },
        }
      );
      if (result.acknowledged) {
        return {
          response: {
            message: "Account updated successfully !!",
            status: "success",
          },
        };
      }
    } catch (error) {
      console.error(error);
      return {
        response: {
          message: "Unable to update acount !!",
          status: "failed",
        },
      };
    }
  }
  async forgotPassword(args: any) {
    try {
      // check if the HotelUser exist
      const hotelUser = await HotelUser.findOne({ email: args.email });
      if (!hotelUser) {
        return {
          response: {
            message: "HotelUser with this email does not exist",
            status: "failed",
          },
        };
      }
      // generate the reset token
      const token: string = jwt.sign(
        {
          HotelUserId: hotelUser._id,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );
      // Send Email
      return {
        response: {
          token: token,
          message: "Check your email to reset password !!",
          status: "success",
        },
      };
    } catch (error) {
      console.error(error);
      return {
        response: {
          message: "HotelUser with this email does not exist",
          status: "failed",
        },
      };
    }
  }
  async resetPassword(args: any) {
    try {
      const tokenResult: any = jwt.verify(
        args.token,
        process.env.JWT_SECRET as string
      );
      if (!tokenResult) {
        return {
          response: {
            message: "Invalid or Expired reset token",
            status: "failed",
          },
        };
      }

      // Hash the password
      const hash = await bcrypt.hash(args.password, 10);
      let result = await HotelUser.updateOne(
        { _id: tokenResult.HotelUserId },
        {
          $set: {
            password: hash,
          },
        }
      );
      if (result.acknowledged) {
        return {
          response: {
            message: "Password reseted successfully !!",
            status: "success",
          },
        };
      }
    } catch (error) {
      console.error(error);
      return {
        response: {
          message: "Operation failed, please try again !!",
          status: "failed",
        },
      };
    }
  }
  async updatePassword(args: any) {
    try {
      const tokenResult: any = jwt.verify(
        args.token,
        process.env.JWT_SECRET as string
      );
      if (!tokenResult) {
        return {
          response: {
            message: "Invalid or Expired token",
            status: "failed",
          },
        };
      }

      // Hash the password
      const hash = await bcrypt.hash(args.password, 10);
      let result = await HotelUser.updateOne(
        { _id: tokenResult.HotelUserId },
        {
          $set: {
            password: hash,
          },
        }
      );
      if (result.acknowledged) {
        return {
          response: {
            message: "Password updated successfully !!",
            status: "success",
          },
        };
      }
    } catch (error) {
      console.error(error);
      return {
        response: {
          message: "Operation failed, please try again !!",
          status: "failed",
        },
      };
    }
  }
  async getUser(args: any) {
    try {
      return await HotelUser.findById(args.id);
    } catch (error) {
      console.error(error);
      return {
        response: {
          message: "Operation failed, please try again !!",
          status: "failed",
        },
      };
    }
  }
  async getUsers() {
    try {
      return await HotelUser.find({});
    } catch (error) {
      console.error(error);
      return {
        response: {
          message: "Operation failed, please try again !!",
          status: "failed",
        },
      };
    }
  }
}

export default hotelHotelUserController;
