import {NextApiRequest, NextApiResponse} from "next";
import userModel from "@/lib/util/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log(req.body)
        const newUser = req.body
        // console.log(newUser)
        res.status(200).json({
            status: "Success",
            data: {
                newUser
            }
        })
    } catch (e: any) {
        console.log(e.message)
    }
}