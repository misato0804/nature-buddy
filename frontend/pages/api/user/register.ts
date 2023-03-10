import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";
import jwt from "jsonwebtoken";
import {setCookie} from 'cookies-next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    await dbConnect()
    switch (method) {
        case "POST":
            try {
                const duplicate = await User.findOne({email: req.body.email})
                if (duplicate) {
                    res.status(422).json({
                        status: "failed",
                        message: "This user existed"
                    })
                }
                const hasToken = req.cookies.hasOwnProperty('next-auth.session-token')
                const user = await User.create(req.body)
                const userId = await user._id.toString()
                if (!hasToken) {
                    const token = jwt.sign({id: userId}, process.env.JWT_SECRET as string, {
                        expiresIn: 30 * 24 * 60 * 60
                    })
                    setCookie("next-auth.session-token", token, {req, res})
                }

                setCookie("userId", userId, {req, res})
                res.status(200).json({
                    status: "success",
                    data: user
                })
            } catch (e: any) {
                console.log("something happended")
                console.log(e)
            }
    }
}

export default handler;