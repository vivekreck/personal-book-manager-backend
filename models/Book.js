const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        genre: {
            type: String,
            default: "",
            trim: true,
        },
        status: {
            type: String,
            enum: ["Want to Read", "Reading", "Completed"],
            default: "Want to Read",
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 1,
        },
        notes: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);