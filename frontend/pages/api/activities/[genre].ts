import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const {genre} = req.query;
    await dbConnect();

}