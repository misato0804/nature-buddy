import React, {useEffect} from 'react';
import {Box, Container, Stack, Typography} from "@mui/material";
import StickyButton from "@/components/elements/atoms/StickyButton";
import {GetServerSidePropsContext} from "next";
import {getSession} from "next-auth/react";
import mongoose from "mongoose";
import {INotification} from "@/types/INotification";
import NoNotificationBlock from "@/components/elements/molecules/NoNotificationBlock";
import NotificationBlock from "@/components/notification-page/NotificationBlock";

type pageProps = {
    user: {
        _id: string | mongoose.Types.ObjectId,
        notifications: {
            sent: INotification[],
            received: INotification[]
        }
    }
}

const Notification = ({user}: pageProps) => {

    console.log(user)

    return (
        <Container sx={{mt: {xs: 14, sm: 12}}}>
            <Box sx={{boxShadow: 2, width: '100%', px: {xs: 2, md: 8}, py: 5}}>
                <Typography variant='h2' fontWeight={500} mb={3}>Notification</Typography>
                {user.notifications.received.length > 0 ? <NotificationBlock/> : <NoNotificationBlock/>}
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                </Box>
            </Box>
            <StickyButton/>
        </Container>
    );
};

export default Notification;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    const email = session?.user?.email
    const res = await fetch(`http://localhost:3000/api/user/notification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email})
    })
    const result = await res.json()
    const userData = result.data
    return {
        props: {
            user: userData
        }
    }
}