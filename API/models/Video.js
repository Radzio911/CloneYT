import mongoose from "mongoose"


export const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,
    url: String,
    upload_date: Date,
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    views: Number,
    hidden: Boolean,

});


export const Video = mongoose.model("Video", videoSchema, "videos");