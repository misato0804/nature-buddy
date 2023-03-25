import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import { User} from "@/lib/util/schema";
import {IActivityModel} from "@/lib/util/activitySchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    const {email, favouriteActivity} = req.body.data
    try {
        const user = await User.findOne({email}).populate('favouriteActivities').select('favouriteActivities')
        let favouriteActivityArr = user.favouriteActivities as IActivityModel[]
        const activity_id = favouriteActivity._id
        const favouriteAlready = favouriteActivityArr.filter(activity => activity._id.toString() === activity_id)
        if (favouriteAlready.length > 0) {
            favouriteActivityArr = favouriteActivityArr.filter(activity => {
                return activity._id.toString() !== activity_id
            })
        } else {
            favouriteActivityArr.push(favouriteActivity as IActivityModel)
        }
        await user.overwrite({favouriteActivities: favouriteActivityArr})
        await user.save();
        res.status(200).json({
            status: 'success',
            data: user
        })

    } catch (e: any) {
        console.log(e)
        res.status(500).json({
            status: 'failed',
            message: e.message
        })
    }

}

export default handler;