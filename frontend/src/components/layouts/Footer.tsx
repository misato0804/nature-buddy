import React from 'react';
import {Container, Typography, Box, Stack} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {useRouter} from "next/router";
import Link from "next/link";
import {useSession} from "next-auth/react";

const Footer = () => {
    const router = useRouter()
    const {data: session} = useSession()

    const renderLoginLink = (
        <>
            <Typography variant="subtitle1" fontSize="1.2rem" sx={{color: "#fff", mb: 2}}>Have you
                registered?</Typography>
            <Stack direction={{xs: 'column'}} width={'100%'} spacing={2}>
                <TriggerButton title={"sign up"} color={"green"} style={{mr: 1}} onClick={() => {
                    router.push("/signup")
                }}/>
                <TriggerButton title={"log in"} color={"green"} onClick={() => {
                    router.push("/login")
                }}/>
            </Stack>
        </>
    )

    const renderProfileLink = (
        <>
            <Typography variant="subtitle1" fontSize="1.2rem" sx={{color: "#fff", mb: 2, minWidth:'12rem'}}>See your profile</Typography>
            <Stack direction={{xs: 'column'}} width={'100%'} spacing={2}>
                <TriggerButton title={"profile"} color={"green"} style={{mr: 1}} onClick={() => {
                    router.push("/user/profile")
                }}/>
                <TriggerButton title={"edit profile"} color={"green"} onClick={() => {
                    router.push("/user/edit")
                }}/>
            </Stack>
        </>
    )

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#014E08",
                py: 8
            }}>
            <Container sx={{}}>
                <Typography variant="h3" sx={{color: "#fff", mb: 4}}>Nature Buddy</Typography>
                <Stack direction={{md: "row"}} rowGap={6} justifyContent='space-between' width='85%' mx='auto'>
                    <Typography maxWidth={300} variant="subtitle1" fontSize="1.2rem" sx={{color: "#fff"}}>Let&apos;s
                        explore with buddies. Let&apos;s
                        explore with buddies. </Typography>
                    <Box>
                        {session ? renderProfileLink : renderLoginLink}
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontSize="1.2rem" sx={{color: "#fff", mb: 2}}>Links for
                            developers</Typography>
                        <Stack direction={{xs: 'column'}} width={'100%'} spacing={2}>
                            <Link href='https://github.com/misato0804/nature-buddy'
                                  style={{textDecoration: 'none'}}><TriggerButton title={"Go to Github"}
                                                                                  color={"black"}/></Link>
                            <Link href='https://github.com/misato0804/nature-buddy'
                                  style={{textDecoration: 'none'}}><TriggerButton title={"Created by"} color={"black"}/></Link>
                        </Stack>
                    </Box>
                </Stack>
                <hr style={{marginTop: "2rem", marginBottom: "2rem"}}/>
                <Typography sx={{color: "#fff", mb: 4}}>©︎2023 Nature Buddy All Rights Reserved</Typography>
            </Container>
        </Box>
    );
};

export default Footer;