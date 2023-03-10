import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";

/**
 * TODO: get user info / edit user info / delete user info
 * @param req
 * @param res
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    await dbConnect();

    switch (method) {
        case "GET":
            const id = req.query.id
            try {
                const user = await User.findById(id)
                if(user) {
                    res.status(200).json({
                        status:"success",
                        data: user
                    })
                }
            } catch (e: any) {
                console.log(e)
            }
            break
        case "PATCH":
            break
        case "DELETE":
            break
        default:
            break
    }
}

export default handler;