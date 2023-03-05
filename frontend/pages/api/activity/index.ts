import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Activity} from "@/lib/util/activitySchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    await dbConnect();

    switch (method) {
        case "POST": {
            //Create [genre]
            try {
                console.log(req.body)
                const activity = await Activity.create(req.body)
                res.status(200).json({
                    status: "success",
                    data: activity
                })
            } catch (e: any) {
                console.log(e)
            }
            break
        }
        case "GET": {
            //Get [genre] info
            break
        }
        case "PUT": {
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