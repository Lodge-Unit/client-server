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
      if (args.token) {
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
        const result = await User.updateOne(
          { _id: tokenResult.userId },
          {
            $set: {
              fname: args.fname,
              lname: args.lname,
              email: args.email,
              phone: args.phone,
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
      } else {
        const result = await User.updateOne(
          { _id: args.id },
          {
            $set: {
              fname: args.fname,
              lname: args.lname,
              email: args.email,
              phone: args.phone,
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
      // check if the user exist
      const user = await User.findOne({ email: args.email });
      if (!user) {
        return {
          response: {
            message: "User with this email does not exist",
            status: "failed",
          },
        };
      }
      // generate the reset token
      const token: string = jwt.sign(
        {
          userId: user._id,
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
          message: "User with this email does not exist",
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
      let result = await User.updateOne(
        { _id: tokenResult.userId },
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
      let result = await User.updateOne(
        { _id: tokenResult.userId },
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
    if (args.id) {
      try {
        return await User.findById(args.id);
      } catch (error) {
        console.error(error);
        return {
          response: {
            message: "Operation failed, please try again !!",
            status: "failed",
          },
        };
      }
    } else {
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
        return await User.findById(tokenResult.userId);
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
  async getUsers() {
    try {
      return await User.find({});
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

export default UserController;
