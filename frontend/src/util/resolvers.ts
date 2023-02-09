import userModel from "@/util/schema";

const resolvers = {
    Query: {
    //    users
        getAllUsers: async () => {
            try {
                return userModel.find()
            } catch (e : any) {
                console.log(e)
            }
        },
        getUser: async (parent: any, args: any) => {
            try {
                const user = await userModel.findById(args.id)
                return user
            } catch (e: any) {
                console.log(e)
            }
        }
    //    activity
    },
    Mutation: {
    //    users
        createUser: async (parent: any, args: any) => {
            try {
                const user = args.input;
                await userModel.create(user)
                return user
            } catch (e: any) {
                console.log(e)
            }
        }
    }
    
}

export default resolvers;