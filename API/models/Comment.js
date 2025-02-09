import mongoose from "mongoose"


export const commentSchema = new mongoose.Schema({
   text: String,
   create_at: Date,
   user: { type: mongoose.Types.ObjectId, ref: "User" },
   video: { type: mongoose.Types.ObjectId, ref: "Video" },
   

});


export const Comment = mongoose.model("Comment", commentSchema, "comments");