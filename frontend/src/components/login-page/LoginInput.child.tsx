import React, {Dispatch, SetStateAction, useState} from 'react';
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import Link from "next/link";
import {useUserContext} from "@/lib/context/userInputContext";
import {signIn, getProviders, getSession} from "next-auth/react";


type Props = {
    setChildComponent: Dispatch<SetStateAction<number>>
}

const LoginInputChild = ({setChildComponent}: Props) => {
    const {
        email,
        password,
        setEmail,
        setPassword
    } = useUserContext()

    const [showPassword, setShowPassword] = useState(false)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const loginUser = async () => {
        await signIn("credentials", {
            email,
            password,
            callbackUrl: `/user`,
        });
        setEmail("")
        setPassword("")
    }

    return (
        <Box width="100%">
            <Typography variant="h2" textAlign="center" my={4}>Welcome back!</Typography>
            <form>
                <Stack direction="column" spacing={3}>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        fullWidth={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl sx={{width: '100%'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="on"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Stack direction="row" spacing={1}>
                        <TriggerButton title="Back" color="#C0C0C0" onClick={() => {
                            setChildComponent(1)
                        }}/>
                        <TriggerButton title="Login" color="#154807" onClick={() => loginUser()}/>
                    </Stack>
                    <Box mt={2}>
                        <Typography variant="subtitle2" textAlign="center">You do not have an account?</Typography>
                        <Typography textAlign="center" fontWeight="600"><Link href="/signup">Sign up</Link></Typography>
                    </Box>
                </Stack>
            </form>
        </Box>
    );
};

export default LoginInputChild;