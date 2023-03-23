import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Activity} from "@/lib/util/activitySchema";
import {User} from "@/lib/util/schema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect()
    try {
        const activity = await Activity.create(req.body.newEvent)
        await User.updateMany({email: req.body.email}, {$push: { hostedActivities: activity } } )
            .then(result => {console.log(result)})
        res.status(200).json({
            status: "success",
            data: activity
        })
    } catch (e: any) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
}

export default handler;