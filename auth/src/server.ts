import express, { Application, Request, Response } from "express";
// import bcrypt from "bcryptjs";
import userRoutes from "./routes/api/user";
import connectDB from "./db";
const app: Application = express();
const PORT = process.env.PORT || 5000;

// SECTION Express
// NOTE parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// NOTE Routes
app.get("/", (req: Request, res: Response) => {
    res.send("hello from auth service");
});
app.use("/api/users", userRoutes);

// SECTION Database connection
connectDB();

// NOTE Express Listen
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
