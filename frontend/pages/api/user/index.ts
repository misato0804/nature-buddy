import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";

/**
 * TODO: LOGIN
 * @param req
 * @param res
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req
    await dbConnect();
    const {email} = req.body;
    if (method === 'POST') {
        if (!email) {
            res.status(500).json({
                status: 'failed',
                message: 'Please put your email'
            })
        }
        try {
            const user = await User.findOne({email})
            res.status(200).json({
                status: "success",
                data: {
                    user
                }
            })
        } catch (e: any) {
            console.log(e)
            res.status(500).json({
                status: 'failed',
                message: 'something happened'
            })
        }
    } else if (method === 'PATCH') {
        const {id, updateUser} = req.body
        try {
        const newUser = await User.updateMany({_id: id}, updateUser)
            res.status(200).json({
                status: 'success',
                data: newUser
            })
        } catch (e: any) {
            console.log(e)
            res.status(500).json({
                status: 'failed',
                message: e.message
            })
        }
    }
    // switch (method) {
    //     case 'POST': //get user info during ssr
    //         const {email} = req.body;
    //         if (!email) {
    //             res.status(500).json({
    //                 status: 'failed',
    //                 message: 'Please put your email'
    //             })
    //         }
    //         try {
    //             const user = await User.findOne({email})
    //             res.status(200).json({
    //                 status: "success",
    //                 data: {
    //                     user
    //                 }
    //             })
    //         } catch (e: any) {
    //             console.log(e)
    //             res.status(500).json({
    //                 status:'failed',
    //                 message: 'something happened'
    //             })
    //         }
    //     case 'PATCH':
    //         const {id} = req.query
    //         const {updateUser} = req.body
    //         //check what to update
    //         //make Set Obj
    //         const oldUser = User.findById(id)
    //         for (let item in oldUser) {
    //             console.log(item)
    //         }
    //         console.log(updateUser, id)
    //         res.status(200).json({
    //             status: 'success',
    //         })
    // }

}

export default handler;

