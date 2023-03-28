import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Notifications} from "@/lib/util/notificationSchema";
import getUserAndAddNotification from "@/lib/helpers/backend/getUserAndAddNotification";
import {Activity} from "@/lib/util/activitySchema";
import {User} from "@/lib/util/schema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    const {notification} = req.body
    const {method} = req

    if (method === 'POST') {
        try {
            const events = await Notifications.find({activity_id: notification.activity_id})
            const duplicated = events.filter(event => event.sender.email === notification.sender.email)
            if (duplicated.length === 0) {
                const newNotification = await Notifications.create(notification)
                await getUserAndAddNotification(notification.host.email, newNotification._id.toString(), true)
                await getUserAndAddNotification(notification.sender.email, newNotification._id.toString(), false)
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
    } else if (method === 'PATCH') {
        try {
            const modifiedNotification = await Notifications.updateMany({_id: notification._id}, {$set: {replied: true}})
            const newBuddy = await User.findOne({email: notification.sender.email})
            await Activity.updateMany({_id: notification.activity_id},{$push: {buddies: newBuddy._id}})
            await User.updateMany({_id: newBuddy._id}, {$push: {joinedActivities: notification.activity_id}})
            res.status(200).json({
                status: 'success',
                message: modifiedNotification
            })
        } catch (e: any) {
            console.log(e)
            res.status(500).json({
                status: 'failed',
                message: e.message
            })
        }
    }
}

export default handler;