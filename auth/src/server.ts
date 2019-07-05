import express, { Application, Request, Response } from "express";
// import bcrypt from "bcryptjs";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";
import connectDB from "./db";
import cookieParser from "cookie-parser";
const app: Application = express();
const PORT = process.env.PORT || 5000;

// SECTION Express
// NOTE parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// NOTE Routes
app.get("/", (req: Request, res: Response) => {
    res.send("hello from auth service");
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// SECTION Database connection
connectDB();

// NOTE Express Listen
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
