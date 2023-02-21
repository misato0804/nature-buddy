import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    const {email, password} = req.body;
    if(!email || !password) {
        return new Error("No email or No password")
    }
    await dbConnect();

    if(method !== "POST") {
        console.log(new Error("This router is accessible for only GET"))
    }
    try {
        const user = await User.find({email})
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (e: any) {
        console.log(e.message)
    }
}

export default handler;