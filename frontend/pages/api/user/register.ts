import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    await dbConnect()
    switch (method) {
        case "POST":
            try{ 
                const user = await User.create(req.body)
                res.status(200).json({
                    status: "success",
                    data: user
                })
            } catch (e: any) {
                console.log(e)
            }
    }
}

export default handler;