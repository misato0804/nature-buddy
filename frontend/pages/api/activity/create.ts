import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Activity, IActivityModel} from "@/lib/util/activitySchema";
import {ObjectId} from "mongoose";
import {IActivity} from "@/types/IActivity";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    await dbConnect()

    try {
        const activity = await Activity.create(req.body)
        res.status(200).json({
            status: "success",
            data: activity
        })

    } catch (e: any) {
        console.log(e)
    }
}

export default handler;