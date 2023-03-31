import React from 'react';
import {Box, Typography, Grid} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {useRouter} from "next/router";
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import VerifiedIcon from '@mui/icons-material/Verified';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const HowItWorks = () => {
    const router = useRouter()
    return (
        <Box>
            <Typography variant="h2" textAlign="center" mt={8} mb={3}>How nature buddy works</Typography>
            <Grid container justifyContent="center" spacing={6} mb={4}>
                <Grid item maxWidth={300}>
                    <ScreenSearchDesktopIcon sx={{width: "12rem", height: "auto", margin: "auto", display: "block", p:6}}/>
                    <Typography variant="h4" textAlign="center">Go find activities</Typography>
                    <Typography variant="subtitle2" textAlign="center">If you find an activity you want to join, you can
                        send a request to its host from activity page.</Typography>
                </Grid>
                <Grid item maxWidth={350}>
                    <VerifiedIcon sx={{width: "12rem", height: "auto", margin: "auto", display: "block", p:6}}/>
                    <Typography variant="h4" textAlign="center">Get permission!</Typography>
                    <Typography variant="subtitle2" textAlign="center">Once the host allow you to join the activity, the
                        activity will be added your profile page!</Typography>
                </Grid>
                <Grid item maxWidth={350}>
                    <Diversity3Icon sx={{width: "12rem", height: "auto", margin: "auto", display: "block", p:6}}/>
                    <Typography variant="h4" textAlign="center">Expand your company!</Typography>
                    <Typography variant="subtitle2" textAlign="center">Not just only joining event, you can create your
                        original activity!</Typography>
                </Grid>
            </Grid>
            <Typography variant="subtitle2" textAlign="center" fontWeight={500} my={2}>*In order to join/create activities, you
                need to create your account.</Typography>
            <TriggerButton title="Sign up" color={"#4E8497"} onClick={() => {
                router.push("/signup")
            }} style={{width: "10rem", margin: "auto"}}/>
        </Box>
    );
};

export default HowItWorks;