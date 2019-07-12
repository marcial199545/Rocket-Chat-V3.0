import { Router } from "express";
import UserNotification from "../../models/Notifications";
const router = Router();

// @route   POST api/notifications
// @desc    Register User on Notification service with the same id as in the auth service
// @access  Public
router.post("/", async (req, res) => {
    const userID = req.body.id;
    try {
        let newUserNotification = new UserNotification({ _id: userID });
        await newUserNotification.save();
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
export default router;
