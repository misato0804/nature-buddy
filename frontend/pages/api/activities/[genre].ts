import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Activity} from "@/lib/util/activitySchema";
import {activitiesList} from "@/lib/util/activitiesList";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const { genre } = req.query;
    await dbConnect();
    const genreIsInList = (genre: string) => {
        activitiesList.forEach(activity => {
            if(activity.title === genre) {
                return true
            }
            return false
        })
    }
    if(!genreIsInList) {
        res.status(404).json({
            status: "failed",
            error: new Error("Wrong genre. Please try again")
        })
    }

    if(method === "GET") {
        try {
            const activities = await Activity.find({genre})
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