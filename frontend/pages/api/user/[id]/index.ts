import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = req.query.id
    await dbConnect();
    try {
        const user = await User.findById(userId)
        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch (e: any) {
        console.log(e)
        res.status(500).json({
            status: 'failed',
            message: e.message
        })
    }
}

export default handler;