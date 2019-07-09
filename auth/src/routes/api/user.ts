import express, { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import config from "config";
import auth from "../../middleware/auth";

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
        check("email", "Please add an email in the correct format").isEmail(),
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
                res.clearCookie("token");
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
                res.cookie("token", token, { httpOnly: true });
                res.send(payload);
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

router.put("/profile/update", auth, async (req: any, res: any) => {
    console.log("TCL: req.body", req.body);
    let user = await User.findByIdAndUpdate(req.user.id, { profileSettings: req.body }, { new: true });
    res.send(user);
});

export default router;
