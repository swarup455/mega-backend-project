import mongoose, {Schema}  from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { use } from "react";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // Create an index for faster searches
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true // Create an index for faster searches
    },
    avatar: {
        type: String, // URL to the user's avatar image
        required: true
    },
    coverImage: {
        type: String, // URL to the user's cover image
        required: true
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video" // Reference to the Video model
    }], // Array to store watch history
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String
    },
}, 
{
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next(); // Only hash the password if it has been modified
    this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);