import mongoose from "mongoose";

const hotelSchema  = new mongoose.Schema({
   name:{
    type:String,
    required:true
   }
});

export default mongoose.model('Hotel', hotelSchema)