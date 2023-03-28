import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Activity} from "@/lib/util/activitySchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    await dbConnect();

    switch (method) {
        case "GET": {
            //Get [genre] info
            const id = req.query.id
            const activity = await Activity.findById(id)
                .populate("host")
                .populate('buddies')
            res.status(200).json({
                status: "success",
                data: activity
            })
        }
        case "PATCH": {
            //Modify
            break
        }
        case "DELETE": {
            //Delete
            break
        }
        default:
            break
    }


}

export default handler;