import express, { Router, Request, Response } from "express";
import config from "config";

const router = Router();

router.get("/", (req, res) => {
    res.send("/api/notifications");
});

export default router;
