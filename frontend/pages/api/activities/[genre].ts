import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Activity} from "@/lib/util/activitySchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    let { genre } = req.query;
    genre = genre as string
    genre = genre!.charAt(0).toUpperCase() + genre.slice(1)
    await dbConnect();
    if(method === "GET") {
        try {
            const activities = await Activity.find({genre})
            console.log(activities)
            res.status(200).json({
                status:"success",
                data: activities
            })
        } catch (e: any) {
            res.status(400).json({
                status:"failed",
                error: e.message
            })
        }
    } else {
        res.status(405).json({
            status: "failed",
            error: "Method not allowed"
        })
    }
}

export default handler;