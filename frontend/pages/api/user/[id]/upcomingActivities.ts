import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Activity} from "@/lib/util/activitySchema";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()
    const {id} = req.query
    try {
        const allActivities = await Activity.find().populate('host')
        const filteredArr = await allActivities.filter( activity => {
            return activity.host._id !== id && !activity.buddies.includes(id)
        })
        res.status(200).json({
            status: 'success',
            data: filteredArr
        })
    } catch (e: any) {
        console.log(e)
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
}

export default handler