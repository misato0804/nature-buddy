import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req
    await dbConnect();
    const {email} = req.body;
    if (method === 'POST') {
        if (!email) {
            res.status(500).json({
                status: 'failed',
                message: 'Please put your email'
            })
        }
        try {
            const user = await User.findOne({email})
                .populate('hostedActivities')
                .populate('favouriteActivities')
                .populate('joinedActivities')
            res.status(200).json({
                status: "success",
                data: {
                    user
                }
            })
        } catch (e: any) {
            console.log(e)
            res.status(500).json({
                status: 'failed',
                message: 'something happened'
            })
        }
    } else if (method === 'PATCH') {
        const {id, updateUser} = req.body
        try {
            const newUser = await User.updateMany({_id: id}, updateUser)
            res.status(200).json({
                status: 'success',
                data: newUser
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

