import {NextApiRequest, NextApiResponse} from "next";
import connectDB from "@/lib/util/mongo";
import userModel from "@/lib/util/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB()
    const users = await userModel.find()
    res.status(200).json(users)
}
