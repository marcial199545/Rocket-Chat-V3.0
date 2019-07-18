import { Schema } from "mongoose";
const ContactSchema = new Schema(
    {
        contactProfile: {
            name: {
                type: String
            },
            email: {
                type: String
            },
            avatar: {
                type: String
            },
            roomId: {
                type: String
            }
        },
        status: {
            type: String,
            default: "pending"
        }
    },
    { _id: false }
);
export default ContactSchema;
