import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react"
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useNotificationContext} from "@/lib/context/socketContext";
import {INotification} from "@/types/INotification";

const Header = () => {

    const {data: session, status} = useSession()
    const router = useRouter()
    const {socket, notification, setNotification, askingUser, setAskingUser, } = useNotificationContext()

    useEffect(() => {
        askingUser.name && askingUser.email && socket.emit('newUser', askingUser)
    }, [socket])

    useEffect(() => {
        session?.user && setAskingUser({
            ...askingUser,
            name: session.user.name!,
            email: session.user.email!
        })

        const getUser = async (email: string) => {
            const user = await fetch('/api/user/notification', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email})
            })
            const userData = await user.json()
            setNotification(() => {
                return userData.data.notifications.received.filter((item: INotification)=> {
                    return item.replied === false
                })
            })
        }
        session ? getUser(session.user?.email!) : null
    }, [session])

    const unauthorizedHeader = [
        {
            title: "home",
            link: "/"
        },
        {
            title: "log in",
            link: "/login"
        },
        {
            title: "sign up",
            link: "/signup"
        },
    ]

    const signout = async () => {
        await router.push('/')
        await signOut()
    }

    return (
        <AppBar component="nav">
            <Toolbar sx={{backgroundColor: "#014E08"}}>
                <Link href="/">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{mr: 4, display: {sm: 'none'}}}
                    >
                        <h2>ICON</h2>
                    </IconButton>
                </Link>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                >
                    <Link href="/" style={{textDecoration: "none", color: "#fff"}}>
                        Nature Buddy
                    </Link>
                </Typography>
                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                    {session ?
                        <>
                            <Button key="profile" sx={{color: '#fff'}}>
                                <Link href='/user/profile' style={{textDecoration: "none", color: "#fff"}}>
                                    Profile
                                </Link>
                            </Button>
                            <Button key="notification" sx={{color: '#fff', position: 'relative'}}>
                                <Link href='/user/notification' style={{textDecoration: "none", color: "#fff"}}>
                                    Notification
                                </Link>
                                <span
                                    style={{
                                        position: 'absolute',
                                        width:'12px', height:'12px',
                                        backgroundColor: 'red',
                                        borderRadius: '50%',
                                        right: 0,
                                        top:2,
                                        zIndex:0,
                                        visibility: notification && notification.length > 0 ? 'visible' : 'hidden'
                                }}></span>
                            </Button>
                        </>
                        :
                        unauthorizedHeader.map((item) => (
                            <Button key={item.title} sx={{color: '#fff'}}>
                                <Link href={item.link} style={{textDecoration: "none", color: "#fff"}}>
                                    {item.title}
                                </Link>
                            </Button>
                        ))
                    }
                    {session &&
                        <Button sx={{color: '#fff', fontWeight: 600}} onClick={() => signout()}>SIGN OUT</Button>}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;