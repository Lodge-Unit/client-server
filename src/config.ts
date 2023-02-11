import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()


export const connectDatabase =  () => {
    // database connection 
    mongoose.connect(process.env.DATABASE_URL as string)
    .then(()=>{
        console.log("Database connectecd 👍")
    })
    .catch(()  => {
        console.log("Connection Failed 😢😢")
    })
}




