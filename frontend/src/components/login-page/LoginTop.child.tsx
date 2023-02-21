import {Box, Stack, Typography} from "@mui/material";
import AuthButton from "@/components/elements/atoms/AuthButton";
import GoogleIcon from "@mui/icons-material/Google";
import {signIn} from "next-auth/react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GithubIcon from "@mui/icons-material/Github"
import Link from "next/link";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {Dispatch, SetStateAction} from "react";

type Props = {
    setChildComponent: Dispatch<SetStateAction<number>>
}

const LoginTopChild = ({setChildComponent}: Props) => {
    return (
        <Box width="100%">
            <Typography variant="h2" textAlign="center" my={4}>Welcome back!</Typography>
            <Stack direction="column" spacing={2}>
                <AuthButton company="Login with Google" color="#4184F2" logo={<GoogleIcon/>} onClick={() => signIn("google")}/>
                <AuthButton company="Login with Facebook" color="#3C5997" logo={<FacebookIcon/>} onClick={() => signIn("facebook")}/>
                <AuthButton company="Login with Github" color="#000000" logo={<GithubIcon/>} onClick={() => signIn("github")}/>
            </Stack>
            <Stack direction="row"  sx={{alignItems: "center", my:4}}>
                <hr style={{width: "45%", height: .5, backgroundColor: "black"}}/>
                <span>or</span>
                <hr style={{width: "45%", height: .5, backgroundColor: "black"}}/>
            </Stack>
            < TriggerButton title="Login with email" color="#154807" onClick={() => {setChildComponent(2)}}/>
            <Box mt={2}>
                <Typography variant="subtitle2" textAlign="center">You do not have an account?</Typography>
                <Typography textAlign="center" fontWeight="600"><Link href="/signup">Sign up</Link></Typography>
            </Box>
        </Box>
    );
};

export default LoginTopChild;