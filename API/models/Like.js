import mongoose from "mongoose"


export const likeSchema = new mongoose.Schema({
        create_at: Date,
        user: { type: mongoose.Types.ObjectId, ref: "User" },
        video: { type: mongoose.Types.ObjectId, ref: "Video" },

});


export const Like = mongoose.model("Like", likeSchema, "likes");