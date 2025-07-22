import connectDB from "./db/database.js";
import dotenv from "dotenv";

dotenv.config({
    path: ".env"
});

connectDB();









/*
import express from "express";
const app = express();

(async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error", (err) => {
            console.error("Express error:", err);
            throw err;
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
})()*/