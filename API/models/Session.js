import mongoose from "mongoose"


export const sessionSchema = new mongoose.Schema({
   key: String,
   user:{ type: mongoose.Types.ObjectId, ref: "User" },
   data: Object,
   expire: Date,

});


export const Session = mongoose.model("Session", sessionSchema, "sessions");