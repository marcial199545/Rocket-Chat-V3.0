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

// @route   POST api/notifications/handle/contact/request
// @desc    handle the contact request
// @access  Private
router.post("/handle/contact/request", async (req: any, res) => {
    const { desicion, contactInfo, currentUserInfo } = req.body;
    // NOTE Current user contacts
    let currentUserContacts: any = await UserNotification.findById(currentUserInfo._id, { contacts: 1 });

    // NOTE User being requested contacts
    let contactUserRequested: any = await UserNotification.findById(contactInfo.contact._id, { contacts: 1 });

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
        let contactToAccept = currentUserContacts.contacts.find((contact: any) => {
            return contact.contactProfile.email === contactInfo.contact.email;
        });
        contactToAccept.status = "friend";
        await currentUserContacts.save();

        let currentUserToAccept = contactUserRequested.contacts.find((contact: any) => {
            return contact.contactProfile.email === currentUserInfo.email;
        });
        currentUserToAccept.status = "friend";
        await contactUserRequested.save();
        res.send("accepted");
    }
});
export default router;
