import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Notifications} from "@/lib/util/notificationSchema";
import getUserAndAddNotification from "@/lib/helpers/backend/getUserAndAddNotification";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    const {notification} = req.body
    try {
        const events = await Notifications.find({activity_id: notification.activity_id})
        const duplicated = events.filter(event => event.sender.email === notification.sender.email)
        if (duplicated.length === 0) {
            const newNotification = await Notifications.create(notification)
            const host = await getUserAndAddNotification(notification.host.email, newNotification._id.toString(), true)
            const sender = await getUserAndAddNotification(notification.sender.email, newNotification._id.toString(), false)
            console.log(host, sender)
            res.status(200).json({
                status: 'success',
                data: newNotification
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: "You already applied to join"
            })
        }
    } catch (e: any) {
        console.log(e)
        res.status(500).json({
            status: 'failed',
            message: e.message
        })
    }
}

export default handler;