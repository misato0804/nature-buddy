import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Activity} from "@/lib/util/activitySchema";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()
    try {
        const allActivities = await Activity.find().populate('host')
        console.log(allActivities)
        res.status(200).json({
            status: 'success',
            data: allActivities
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