import React, {useEffect, useState} from 'react';
import {Box, Container, Stack, Typography} from "@mui/material";
import StickyButton from "@/components/elements/atoms/StickyButton";
import {GetServerSidePropsContext} from "next";
import {getSession, useSession} from "next-auth/react";
import mongoose from "mongoose";
import {INotification} from "@/types/INotification";
import NoNotificationBlock from "@/components/elements/molecules/NoNotificationBlock";
import NotificationBlock from "@/components/notification-page/NotificationBlock";
import {v4 as uuidv4} from 'uuid';
import {useNotificationContext} from "@/lib/context/socketContext";
import CheckedNotificationBlock from "@/components/notification-page/CheckedNotificationBlock";
import GotPermission from "@/components/notification-page/GotPermission";
import {useRouter} from "next/router";

type pageProps = {
    user: {
        _id: string | mongoose.Types.ObjectId,
        email: string,
        notifications: {
            sent: INotification[],
            received: INotification[]
        }
    }
}

const Notification = ({user}: pageProps) => {
    const {socket, notification} = useNotificationContext()
    const router = useRouter()

    useEffect(() => {
        socket.on('get_asked_to_join', (data: INotification) => {
            router.reload()
        })

        socket.on('get_approval', (data: INotification) => {
            router.reload()
        })
    }, [socket])

    // New request
    const newRequestArr = (notifications: INotification[]) => {
        const unRepliedArr = notifications.filter(item => {
            return item.host.email === user.email && item.replied === false
        })
        if (unRepliedArr.length === 0) {
            return <NoNotificationBlock/>
        }
        return unRepliedArr.map(item => <NotificationBlock key={uuidv4()} notificationData={item}/>)
    }
    // Checked Notification
    const checkedRequestArr = (notifications: INotification[]) => {
        const repliedArr = notifications.filter(item => {
            return item.host.email === user.email && item.replied === true
        })
        if (repliedArr.length === 0) {
            return <NoNotificationBlock/>
        }
        return repliedArr.map(item => <CheckedNotificationBlock key={uuidv4()} notification={item}/>)
    }
    // Received Permission
    const receivedPermissionArr = (notifications: INotification[]) => {
        const receivedPermissionArr = notifications.filter(item => {
            return item.sender.email === user.email && item.replied === true
        })
        if (receivedPermissionArr.length === 0) {
            return <NoNotificationBlock/>
        }
        return receivedPermissionArr.map(item => <GotPermission key={uuidv4()} notification={item}/>)
    }

    if(!user) {
        return <h1>Loading...</h1>
    }

    const renderUnreadContents = () => {
        return (
            <>
                <Stack direction='column' spacing={2} mt={2}>
                    <Typography fontWeight={500} fontSize={'1.2rem'}>Unchecked notifications</Typography>
                    {newRequestArr(user.notifications.received)}
                </Stack>
                <Stack direction='column' spacing={2} mt={4}>
                    <Typography fontWeight={500} fontSize={'1.2rem'}>Checked notifications</Typography>
                    {checkedRequestArr(user.notifications.received)}
                </Stack>
                <Stack direction='column' spacing={2} mt={4}>
                    <Typography fontWeight={500} fontSize={'1.2rem'}>Received permission</Typography>
                    {receivedPermissionArr(user.notifications.sent)}
                </Stack>
            </>
        )
    }

    return (
        <Container sx={{mt: {xs: 14, sm: 12}}}>
            <Box sx={{boxShadow: 2, width: '100%', px: {xs: 2, md: 8}, py: 5}}>
                <Typography variant='h2' fontWeight={500} mb={3}>Notification</Typography>
                <Box className='unread'>
                    {renderUnreadContents()}
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