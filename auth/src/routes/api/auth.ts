import express, { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import config from "config";

const router = Router();

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public

router.post(
    "/",
    [
        check("email", "Please provide a valid email").isEmail(),
        check("password", "Password field is required").exists()
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        //NOTE check if the user does exist
        try {
            let user: any = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            //NOTE comparing the password with the encrypted one
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
            }
            //NOTE use json web token
            const payload = {
                user: {
                    id: user.id
                }
            };
            const jwtConfig = {
                expiresIn: 360000
            };
            jwt.sign(payload, config.get("jwtSecret"), jwtConfig, (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({ token });
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

export default router;
