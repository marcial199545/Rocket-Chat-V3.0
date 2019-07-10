import { Schema } from "mongoose";
import MessageSchema from "./MessageSchema";
const ConversationSchema = new Schema(
    {
        participants: [Schema.Types.ObjectId],
        roomId: {
            type: String,
            required: true
        }
    },
    { _id: false }
);
export default ConversationSchema;
