import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case "POST": {
            //Create [activity]
            break
        }
        case "GET": {
            //Get [activity] info
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