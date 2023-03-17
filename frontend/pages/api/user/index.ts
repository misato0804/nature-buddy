import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";

/**
 * TODO: LOGIN
 * @param req
 * @param res
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {email} = req.body;
    if (!email) {
        res.status(500).json({
            status: 'failed',
            message: 'Please put your email'
        })
    }
    await dbConnect();
    try {
        const user = await User.findOne({email})
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })

    } catch (e: any) {
            console.log(e)
    }
}

export default handler;

