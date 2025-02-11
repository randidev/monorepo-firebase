import express from "express";
import userRoutes from "../routes/userRoutes";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization", "ebuddy-api-key"], // Allow headers
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON
app.use("/api", userRoutes);

export default app;
