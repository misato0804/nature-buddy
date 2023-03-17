import React from 'react';
import {Container, Typography, Box, Stack} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";


const Footer = () => {
    const router = useRouter()

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#014E08",
                py: 8
            }}>
            <Container sx={{}}>
                <Typography variant="h3" sx={{color:"#fff", mb:4}}>Nature Buddy</Typography>
                <Stack direction={{md: "row"}} spacing={10} rowGap={6}>
                    <Typography maxWidth={300} variant="subtitle1" fontSize="1.2rem" sx={{color:"#fff"}}>Let&apos;s explore with buddies. Let&apos;s
                <button onClick={() => signOut()}>CLICCCCCCCCCC</button>
                        explore with buddies. </Typography>
                    <Box maxWidth={300}>
                        <Typography variant="subtitle1" fontSize="1.2rem" sx={{color:"#fff", mb:2}}>Have you registered?</Typography>
                        <Box sx={{display: "flex", width:"300px"}}>
                            <TriggerButton title={"sign up"} color={"green"} style={{mr:1}} onClick={() => {
                                router.push("/signup")
                            }}/>
                            <TriggerButton title={"log in"} color={"green"} onClick={() => {
                                router.push("/login")
                            }}/>
                        </Box>
                    </Box>
                    <Box maxWidth={300}>
                        <Typography variant="subtitle1" fontSize="1.2rem" sx={{color:"#fff", mb:2}}>Link for developers</Typography>
                    </Box>
                </Stack>
                <hr style={{marginTop:"2rem", marginBottom:"2rem"}}/>
                <Typography  sx={{color:"#fff", mb:4}}>©︎2023 Nature Buddy All Rights Reserved</Typography>
            </Container>
        </Box>
    );
};

export default Footer;