import { Schema } from "mongoose";

const MessageSchema = new Schema(
    {
        msg: {
            type: String,
            default: "example"
        },
        sent: {
            type: Boolean,
            default: true
        },
        roomId: {
            type: String,
            required: true
        }
    },
    { _id: false }
);
export default MessageSchema;
