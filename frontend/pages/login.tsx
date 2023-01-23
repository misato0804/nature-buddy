import { signIn } from "next-auth/react"

const Login = () => {
    return (
        <div>
            <button onClick={() => signIn()}>Signin</button>
        </div>
    );
};

export default Login;