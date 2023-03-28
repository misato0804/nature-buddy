import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    const {email} = req.body
    try {
        const notification = await User
            .findOne({email})
            .select('notifications')
            .select('email')
            .populate({path: 'notifications', populate: {path:'received', model:'Notifications'}})
            .populate({path: 'notifications', populate: {path:'sent', model:'Notifications'}})
        res.status(200).json({
            status: 'success',
            data: notification
        })
    } catch (e: any) {
        console.log(e)
        res.status(500).json({
            status: 'failed',
            message: e.message
        })
    }
}

export default handler;