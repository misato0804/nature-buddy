import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";
import {setCookie} from 'cookies-next';
import {serialize} from "cookie";
import jwt from "jsonwebtoken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;
    await dbConnect()
    switch (method) {
        case "POST":
            try {
                // const duplicate = await User.findOne({email: req.body.email})
                // if (duplicate) {
                //     res.status(422).json({
                //         status: "failed",
                //         message: "This user existed"
                //     })
                // }
                const user = await User.create(req.body)
                // const userId = user._id.toString()
                // const token = jwt.sign({userId}, process.env.JWT_SECRET, {
                //     expiresIn: 30 * 24 * 60 * 60
                // })
                // const cookie = serialize('next-auth.session-token', token)
                // res.setHeader('Set-Cookie', cookie)
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