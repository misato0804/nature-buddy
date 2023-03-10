import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = req.query.id
    await dbConnect();
    try {
        const user = await User.findById(userId)

    } catch (e: any) {

    }


}

export default handler;