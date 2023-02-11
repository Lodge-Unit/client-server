import mongoose from "mongoose";

const houseSchema  = new mongoose.Schema({
   name:{
    type:String,
    required:true
   }
});

export default mongoose.model('House', houseSchema)