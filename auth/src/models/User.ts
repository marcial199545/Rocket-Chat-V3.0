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
                type: String,
                default: "youtube"
            },
            twitter: {
                type: String,
                default: "twitter"
            },
            facebook: {
                type: String,
                default: "facebook",
                trim: true
            },
            linkedin: {
                type: String,
                default: "linkedin"
            },
            instagram: {
                type: String,
                default: "instagram"
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
