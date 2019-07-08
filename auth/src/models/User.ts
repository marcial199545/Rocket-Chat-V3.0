import mongoose, { Schema, model, Model } from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    profileSettings: {
        language: {
            type: String,
            default: "english"
        },
        socials: {
            youtube: {
                type: String
            },
            twitter: {
                type: String
            },
            facebook: {
                type: String
            },
            linkedin: {
                type: String
            },
            instagram: {
                type: String
            }
        }
    }
});
UserSchema.pre("save", async function(next) {
    const user: any = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = model("user", UserSchema);
export default User;
