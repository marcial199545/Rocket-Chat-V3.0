import express, { Application } from "express";
import config from "config";
import connectDB from "./db";
// import notificationsRoutes from "./routes/api/notifications";

// SECTION DB
connectDB();
// SECTION Express
const app: Application = express();
const PORT = process.env.PORT || 5001;
// NOTE parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// NOTE Routes
// app.use("/api/notifications", notificationsRoutes);
app.get("/", (req, res) => {
    res.send("notification server");
});
app.listen(PORT, () => {
    console.log(`listening to port ${PORT} notification service 🌀 `);
});
