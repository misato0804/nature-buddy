import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";
import jwt from "jsonwebtoken";
import {  setCookie } from 'cookies-next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    await dbConnect()
    switch (method) {
        case "POST":
            try{
                const double = await User.findOne({email: req.body.email})
                if(double) {
                    res.status(422).json({
                        status: "failed",
                        message: "This user existed"
                    })
                    return
                }

                const user = await User.create(req.body)
                console.log(req.headers)
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {
                    expiresIn: 30 * 24 * 60 * 60
                })
                setCookie("next-auth.session-token", token, { req, res })
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