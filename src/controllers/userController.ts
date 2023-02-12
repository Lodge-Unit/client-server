import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import _ from "lodash";
import bcrypt from "bcryptjs";

dotenv.config();

class UserController {
  async signUp(args: any) {
    // Check if the user exists
    const user = await User.find({ phone: args.phone });
    if (user.length >= 1) {
      return {
        response: {
          message: "User already exists",
          status: "failed",
        },
      };
    }

    // Create a new user
    try {
      const hash = await bcrypt.hash(args.password, 10);
      const newUser = new User({
        fname: args.fname,
        lname: args.lname,
        email: args.email,
        phone: args.phone,
        password: hash,
      });
      const result = await newUser.save();
      const token: string = jwt.sign(
        {
          userId: result._id,
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
      return {
        response: {
          message: error.message,
        },
      };
    }
  }

  async login(args: any) {
    try {
      const user = await User.find({ phone: args.phone });

      if (user.length < 1) {
        return {
          response: {
            message: "User not found !!",
            status: "failed",
          },
        };
      }

      // Compare password
      const result = await bcrypt.compare(args.password, user[0].password);
      if (result) {
        const token: string = jwt.sign(
          {
            userId: user[0]._id,
            email: user[0].email,
            phone: user[0].phone,
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
      return {
        response: {
          message: "Authentication failed !!",
          status: "failed",
        },
      };
    }
  }
  async update(args: any) {}
  async forgotPassword(args: any) {}
  async resetPassword(args: any) {}
  async updatePassword(args: any) {}
}

export default UserController;
