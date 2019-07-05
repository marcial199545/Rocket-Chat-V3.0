import express, { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import config from "config";
// const config = require("config");

const router = Router();

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
    "/",
    [
        check("name", "Name field is required")
            .not()
            .isEmpty(),
        check("email", "Please add an email in the orrect format").isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({
            min: 6
        })
    ],
    async (req: Request, res: Response) => {
        // NOTE check if errors on the req
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        try {
            //NOTE fetch user by email to see if it exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "Email provided is already in use" }] });
            }
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "identicon"
            });
            user = new User({ name, email, avatar, password });
            await user.save();
            const payload = {
                id: user.id
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
