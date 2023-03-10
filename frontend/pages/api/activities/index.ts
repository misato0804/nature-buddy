import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {Activity} from "@/lib/util/activitySchema";

/**
 * TODO: return all activities
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    await dbConnect();

    switch (method) {
        case "GET":
            try {

            } catch (e: any) {

            }
        case "PUT":
            try {

            } catch (e: any) {

            }
        case "DELETE":
            try {

            } catch (e: any) {

            }
        default:
            try {

            } catch (e: any) {

            }
    }


}

export default handler;