import {signIn, signOut, useSession} from "next-auth/react"
import {useEffect} from "react";

const Login = () => {

    const {data: session, status} = useSession()

    console.log(status)

    useEffect(() => {
        console.log({session})
    }, [status])

    return (
        <div>
            <button onClick={() => signIn()}>Signin</button>
            <button onClick={() => signOut()}>SignOut</button>
            { session ? <h1>Hello{session.user!.name}</h1> : <h2>bAD</h2> }
        </div>
    );
};

export default Login;