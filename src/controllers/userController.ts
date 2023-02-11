import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import _ from "lodash"
import bcrypt from "bcryptjs"

dotenv.config()

class UserController {
    async signUp(args: any) {
      // Check if the user exists
      const user = await User.find({ phone: args.phone })
      if (user.length >= 1) {
        return {response: {
          message: "User already exists",
          status: "failed"
        }}
      } 

      // Create a new user
     try {
      const hash = await bcrypt.hash(args.password, 10)
      const newUser = new User({
        fname: args.fname,
        lname: args.lname,
        email: args.email,
        phone: args.phone,
        password: hash
      });
      const result = await  newUser.save()
      const token: string = jwt.sign(
            {
              userId: result._id,
              email: result.email,
              phone: result.phone,
            },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "1h",
            }
          );
      return {
            response:{   
            message: "Account created",
            token: token,
            status: "success"
          }
          };
      
     } catch (error:any) {
        return {
          response:{
            message: error.message,
          }
        };
     }
    }


  async login(args:any){
   return User.find({ phone: args.phone, })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return {
          response:{
            message: "Authentication Failed",
          }         
         }
      }

      bcrypt.compare(
        args.password,
        user[0].password,
        (err: any, result: any) => {
          if (err) {
            return {
              response:{
                message: "Authentication Failed",
              }
            }
          }
          if (result) {
            const token: string = jwt.sign(
              {
                userId: result[0]._id,
                email: result[0].email,
                phone: result[0].phone,
              },
              process.env.JWT_SECRET as string,
              {
                expiresIn: "1h",
              }
            );
            return {
              response:{
                message: "Login Successful",
                token: token,
              }
            }
          }
         return {
          response:{message: "Authentication Failed",}
         }
        }
      );
    })
    .catch((err) => {
      return {
        response:{
          message: err.message,
        }
      };
    });
  }
  async update(args:any){}
  async  forgotPassword(args:any){}
  async resetPassword(args:any){}
  async  updatePassword(args:any){}

}


export default UserController;