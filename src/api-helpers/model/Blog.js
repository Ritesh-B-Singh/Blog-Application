import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    comments: {
        type: [{ username: String, comment: String }],
    },
    date: {
        type: String,
        required: true
    }
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema)