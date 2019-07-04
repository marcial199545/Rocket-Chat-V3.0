import express, { Application, Request, Response } from "express";
const app: Application = express();
const PORT = process.env.PORT || 5000;

// NOTE parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("hello from auth service");
});

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
