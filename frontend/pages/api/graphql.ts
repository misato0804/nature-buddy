// import { ApolloServer } from "apollo-server-micro";
// import {NextApiRequest, NextApiResponse} from "next";
// import "refrect-metadata"
//
// // @ObjectType()
// // export class Dog {
// //     @Field(type => ID)
// //     id:string;
// //     @Field()
// //     name: string;
// // }
// //
// // @Resolver(Dog)
// // export class DogResolver {
// //     @Query(() => [Dog])
// //     dogs() : Dog[] {
// //         return [
// //             {name: "Misa"},
// //             {name: "Misato"}
// //         ]
// //     }
// // }
// //
// // const schema = await buildSchema({
// //     resolvers: [DogResolver]
// // })
// //
// const server = new ApolloServer({
//     // schema
// })
//
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }
//
// const startServer = server.start()
//
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     await startServer;
//     await server.createHandler({path: "/api/graphql"})(req, res)
// }
import {} from "apollo-server-micro";

