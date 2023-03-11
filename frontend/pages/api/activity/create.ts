import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Activity} from "@/lib/util/activitySchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    await dbConnect()
    const newActivity = req.body
    console.log("newActivity", newActivity)

    try {
        const activity = await Activity.create(newActivity)
        res.status(200).json({
            status: "success",
            data: activity
        })

    } catch (e: any) {
        console.log(e)
    }
}

export default handler;