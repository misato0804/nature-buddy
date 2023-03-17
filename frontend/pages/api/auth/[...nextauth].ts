import NextAuth, {Awaitable, Session, SessionStrategy} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";
import {NextApiRequest, NextApiResponse} from "next";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/util/mongoClient";

const nextAuthOptions = async (req: NextApiRequest, res: NextApiResponse) => {
    return {
        adapter: MongoDBAdapter(clientPromise, {
            databaseName: 'NatureBuddy'
        }),
        providers: [
            GithubProvider({
                clientId: process.env.GITHUB_ID as string,
                clientSecret: process.env.GITHUB_SECRET as string
            }),
            GoogleProvider({
                clientId: process.env.GOODLE_CLIENT_ID as string,
                clientSecret: process.env.GOODLE_CLIENT_SECRET as string,
            }),
            FacebookProvider({
                clientId: process.env.FACEBOOK_CLIENT_ID as string,
                clientSecret: process.env.FACEBOOK_SECRET as string,
            }),
            CredentialsProvider({
                id: "credentials",
                name: "Credentials",
                credentials: {
                    email: {
                        label: "Email",
                        type: "text",
                    },
                    password: {
                        label: "Password",
                        type: "password",
                    },
                },
                async authorize(credentials) {
                    await dbConnect().catch(e => {
                        e : "Connected failed"
                    })
                    try {
                        const user = await User.findOne({email: credentials?.email,});
                        return user;
                    } catch (e: any) {
                        console.log(e)
                        return null
                    }
                }
            })
        ],
        debug: process.env.NODE_ENV === "development",
        callbacks: {
            async session({session, user}: any) {
                // console.log("hei")
                // console.log(session)
                try {

                } catch (e: any) {
                    console.log(e)
                    return session
                }
                return session
            },
            async signIn({account, profile}: any) {
                // console.log('account', account)
                // console.log('profile', profile)

                return true
            }
        },
        secret: process.env.JWT_SECRET,
        jwt: {
            secret: process.env.JWT_SECRET
        },
        session: {
            strategy: 'jwt' as SessionStrategy,
            maxAge: 30 * 24 * 60 * 60,
        },
        signIn: '/login',

    }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, await nextAuthOptions(req, res))
}
