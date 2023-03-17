declare module 'jsonwebtoken';
declare module 'bcryptjs';
declare module "@react-google-maps/api"
//
// declare module "next-auth" {
//     /**
//      * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//      */
//     interface Session {
//         user: {
//             name: string;
//             email: string;
//             image: string;
//             userId: string;
//         };
//     }
// }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production"
        }
    }
}