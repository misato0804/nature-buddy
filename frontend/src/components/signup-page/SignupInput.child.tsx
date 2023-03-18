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
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import Link from "next/link";
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from "react";
import {useUserContext} from "@/lib/context/userInputContext";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type Props = {
    setChildComponent: Dispatch<SetStateAction<number>>
}

const SignupInputChild = ({setChildComponent}: Props) => {
    const {
        name,
        email,
        password,
        passwordConfirm,
        setName,
        setEmail,
        setPasswordConfirm,
        setPassword
    } = useUserContext()
    const [showPassword, setShowPassword] = useState(false)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [errorHandler, setErrorHandler] = useState({
        name: false,
        email: false,
        password: false,
        passwordConfirm: false
    })

    const userValidation = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const username = e.target.value
        setName(username)
        const nameLength = name.length < 3 || name.length > 30
        const includeSpecialChar = name.match(/^[A-Za-z]+$/)
        if(nameLength || !includeSpecialChar) {
            setErrorHandler({...errorHandler, name: true})
        } else {
            setErrorHandler({...errorHandler, name: false})
        }
    }

    return (
        <Box width="100%">
            <Typography variant="h2" textAlign="center" my={4}>Create your account</Typography>
            <Stack direction="column" spacing={3}>
                <TextField
                    error={errorHandler.name}
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={userValidation}
                />
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value) }
                />
                <FormControl sx={{width: '100%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
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
                <FormControl sx={{width: '100%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-passwordConfirm">Password confirm</InputLabel>
                    <OutlinedInput
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        id="outlined-adornment-passwordConfirm"
                        type={showPassword ? 'text' : 'password'}
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
                        label="Password confirm"
                    />
                </FormControl>
                <TriggerButton title="Next" color="#154807" onClick={() => {
                    setChildComponent(3)
                }}/>
                <Box mt={2}>
                    <Typography variant="subtitle2" textAlign="center">Already have your account?</Typography>
                    <Typography textAlign="center" fontWeight="600"><Link href="/login">Login</Link></Typography>
                </Box>
            </Stack>

        </Box>
    );
};

export default SignupInputChild;