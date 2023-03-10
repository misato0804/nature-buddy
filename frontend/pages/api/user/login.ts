import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";

/**
 * TODO: LOGIN
 * @param req
 * @param res
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    const {email, password} = req.body;
    await dbConnect();
    console.log(method)
    switch (method) {
        case "GET":
            console.log("HI")
            res.status(200).json({
                status: "SUCCESS",
                data: {user: "Misa"}
            })
            break
        case "POST":
            if(!email || !password) {
                return new Error("No email or No password")
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
}

export default handler;