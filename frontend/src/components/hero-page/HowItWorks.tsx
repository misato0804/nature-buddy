import React from 'react';
import {Box, Typography, Grid} from "@mui/material";
import Image from "next/image";
import workimage from "../../../public/assets/images.png"
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {useRouter} from "next/router";

const HowItWorks = () => {
    const router = useRouter()
    return (
        <Box>
            <Typography variant="h2" textAlign="center" mt={8} mb={3}>How nature buddy works</Typography>
            <Grid container justifyContent="center" spacing={6} mb={4}>
                <Grid item maxWidth={300}>
                    <Image
                        alt="hiking"
                        style={{width: "12rem", height: "auto", margin:"auto", display:"block"}}
                        src={workimage}
                    />
                    <Typography variant="h4" textAlign="center">Find an activity</Typography>
                    <Typography variant="subtitle2" textAlign="center">Join a group
                        Do what you love, meet others who love it, find your community. The rest is history!</Typography>
                </Grid>
                <Grid item maxWidth={350}>
                    <Image
                        alt="hiking"
                        style={{width: "12rem", height: "auto", margin:"auto", display:"block"}}
                        src={workimage}
                    />
                    <Typography variant="h4" textAlign="center">Find an activity</Typography>
                    <Typography variant="subtitle2" textAlign="center">Join a group
                        Do what you love, meet others who love it, find your community. The rest is history!</Typography>
                </Grid>
                <Grid item maxWidth={350}>
                    <Image
                        alt="hiking"
                        style={{width: "12rem", height: "auto", margin:"auto", display:"block"}}
                        src={workimage}
                    />
                    <Typography variant="h4" textAlign="center">Find an activity</Typography>
                    <Typography variant="subtitle2" textAlign="center">Join a group
                        Do what you love, meet others who love it, find your community. The rest is history!</Typography>
                </Grid>
            </Grid>
            <TriggerButton title="Sign up" color={"#4E8497"} onClick={() => {router.push("/signup")}} style={{width: "10rem", margin: "auto"}}/>
        </Box>
    );
};

export default HowItWorks;