import { Router } from "express";
import UserNotification from "../../models/Notifications";
import Messages from "../../models/Messages";
import uuid = require("uuid");
const router = Router();

// @route   POST api/notifications
// @desc    Register User on Notification service with the same id as in the auth service
// @access  Public
router.post("/", async (req, res) => {
    const userID = req.body.id;
    try {
        let newUserNotification = new UserNotification({ _id: userID });
        let newMessageCollection = new Messages({ _id: userID });
        await newUserNotification.save();
        await newMessageCollection.save();
        res.send("user notification created");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/notifications/add/contact
// @desc    Add a contact
// @access  Private
router.post("/add/contact", async (req: any, res) => {
    try {
        const { contact: contactInfo, userId } = req.body;
        let notificationUser: any = await UserNotification.findById(userId, { contacts: 1 });
        if (
            notificationUser.contacts.find((contact: any) => {
                return contact.contactProfile.email === contactInfo.email;
            })
        ) {
            return res.status(400).json({ errors: [{ msg: "Friend Request already sent" }] });
        }
        let contactModel = {
            contactProfile: contactInfo
        };
        notificationUser.contacts.push(contactModel);
        await notificationUser.save();

        res.json(contactInfo);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});
// @route   POST api/notifications/add/contact/request
// @desc    Add a contact request
// @access  Private
router.post("/add/contact/request", async (req: any, res) => {
    const { requestedId: userRequestedId } = req.body;
    const { name: requesterName, email: requesterEmail, avatar: requesterAvatar } = req.body.requesterInfo;
    let notificationUser: any = await UserNotification.findById(userRequestedId, { contacts: 1 });
    let contactModel = {
        contactProfile: {
            name: requesterName,
            email: requesterEmail,
            avatar: requesterAvatar
        },
        status: "requested"
    };
    notificationUser.contacts.push(contactModel);
    await notificationUser.save();
    res.send("add contact request");
});

// @route   POST api/notifications/me/contacts
// @desc    get all the contacts of an user
// @access  Private
router.post("/me/contacts", async (req: any, res) => {
    let { _id: userID } = req.body;
    let contactsNotificationUser: any = await UserNotification.findById(userID, { contacts: 1, _id: 0 });
    res.send(contactsNotificationUser);
});

// @route   POST api/notifications/handle/contact/request
// @desc    handle the contact request
// @access  Private
router.post("/handle/contact/request", async (req: any, res) => {
    const { desicion, contactInfo, currentUserInfo } = req.body;
    // NOTE Current user contacts
    let currentUserContacts: any = await UserNotification.findById(currentUserInfo._id, { contacts: 1 });
    let currentUserConversation: any = await UserNotification.findById(currentUserInfo._id, {
        conversations: 1
    });
    let currentUserMessages: any = await Messages.findById(currentUserInfo._id);

    // NOTE User being requested contacts
    let contactUserRequested: any = await UserNotification.findById(contactInfo.contact._id, { contacts: 1 });
    let conversationsUserRequested: any = await UserNotification.findById(contactInfo.contact._id, {
        conversations: 1
    });
    let contactUserMessages: any = await Messages.findById(contactInfo.contact._id);
    if (desicion === "rejected") {
        let contactToReject = currentUserContacts.contacts.find((contact: any) => {
            return contact.contactProfile.email === contactInfo.contact.email;
        });
        contactToReject.status = "rejected";
        currentUserContacts.contacts = currentUserContacts.contacts.filter((contact: any) => {
            return contact.status !== "rejected";
        });
        await currentUserContacts.save();

        let currentUserToReject = contactUserRequested.contacts.find((contact: any) => {
            return contact.contactProfile.email === currentUserInfo.email;
        });
        currentUserToReject.status = "rejected";
        contactUserRequested.contacts = contactUserRequested.contacts.filter((contact: any) => {
            return contact.status !== "rejected";
        });
        await contactUserRequested.save();
        res.send("rejected");
    } else if (desicion === "accepted") {
        let conversationsModel = {
            roomId: uuid.v4()
        };
        let messagesModel = {
            roomId: conversationsModel.roomId
        };
        let contactToAccept = currentUserContacts.contacts.find((contact: any) => {
            return contact.contactProfile.email === contactInfo.contact.email;
        });
        contactToAccept.status = "friend";
        contactToAccept.contactProfile.roomId = conversationsModel.roomId;
        currentUserConversation.conversations.push(conversationsModel);
        currentUserMessages.messages.push(messagesModel);
        await currentUserConversation.save();
        await currentUserContacts.save();
        await currentUserMessages.save();

        let currentUserToAccept = contactUserRequested.contacts.find((contact: any) => {
            return contact.contactProfile.email === currentUserInfo.email;
        });
        currentUserToAccept.status = "friend";
        currentUserToAccept.contactProfile.roomId = conversationsModel.roomId;
        conversationsUserRequested.conversations.push(conversationsModel);
        contactUserMessages.messages.push(messagesModel);
        await conversationsUserRequested.save();
        await contactUserRequested.save();
        await contactUserMessages.save();
        res.send("accepted");
    }
});
// @route   POST api/notifications/contact/conversation
// @desc    create a conversation between two contacts
// @access  Private
router.post("/contact/conversation", async (req: any, res) => {
    try {
        const { currentUserProfile, contactProfile, roomId } = req.body;
        // NOTE fetching the conversations collection
        let conversationsCurrentUser: any = await UserNotification.findById(currentUserProfile._id, {
            conversations: 1
        });
        let conversationsContact: any = await UserNotification.findById(contactProfile._id, { conversations: 1 });
        // NOTE fetching  the current conversation by the roomId
        let conversationOnCurrentUser = conversationsCurrentUser.conversations.find((conv: any) => {
            return conv.roomId === roomId;
        });
        let conversationOnContact = conversationsContact.conversations.find((conv: any) => {
            return conv.roomId === roomId;
        });
        // NOTE destructuring the participants array from the currentConvesation
        let { participants: participantsCurrentUser } = conversationOnCurrentUser;
        let { participants: participantsContact } = conversationOnContact;
        // NOTE checking if the arrays of participants is , if it is then push participants to it
        if (participantsCurrentUser.length === 0) {
            participantsCurrentUser.push(currentUserProfile, contactProfile);
            await conversationsCurrentUser.save();
        }
        if (participantsContact.length === 0) {
            participantsContact.push(contactProfile, currentUserProfile);
            await conversationsContact.save();
        }
        // NOTE Load the messages of the current user, they should be the same
        let messagesCurrentUser: any = await Messages.findById(currentUserProfile._id, { messages: 1 });
        let response = {
            messages: messagesCurrentUser.messages.filter((msgs: any) => {
                return roomId === msgs.roomId;
            }),
            roomId,
            participantsCurrentUser
        };
        res.send(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});
export default router;
