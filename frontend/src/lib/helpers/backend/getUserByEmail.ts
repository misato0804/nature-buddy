import {User} from "@/lib/util/schema";

const getUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({email})
        return user
    } catch (e: any) {
        console.log(e)
        return new Error(e.message)
    }
}

export default getUserByEmail;