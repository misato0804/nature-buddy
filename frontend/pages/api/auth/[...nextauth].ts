import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"

const github_id = process.env.GITHUB_ID!
const github_secret = process.env.GITHUB_SECRET!

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: github_id,
            clientSecret: github_secret
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
    debug: false
})