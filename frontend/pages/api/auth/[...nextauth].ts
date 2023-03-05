import NextAuth, {Session} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/util/mongo";
import {User} from "@/lib/util/schema";

export default NextAuth({
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
                await dbConnect()
                const user = await User.findOne({
                    email: credentials?.email,
                });
                if (!user) {
                    throw new Error("Email is not registered");
                }
                return user;
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        async session({session}){
            // console.log(session)
            const findUser = await User.findOne({
                email: session.user!.email
            });
            return {...session}
        }
    }
})