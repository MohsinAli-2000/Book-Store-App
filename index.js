import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware for parsing request body
app.use(express.json());
app.use(cors());

// Define the port (assuming you have a PORT variable in your .env file)
const PORT = process.env.PORT || 5000;

// Define the MongoDB connection URL
const mongoDBURL = process.env.MONGODB_URL;

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App is connected to Database.`);
    app.listen(PORT, () => {
      console.log(`App is listening on PORT : ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
