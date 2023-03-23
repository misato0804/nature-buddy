import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react"
import {useRouter} from "next/router";


const Header = () => {

    const {data: session, status} = useSession()
    const router = useRouter()

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

    const authorizedHeader = [
        {
            title: "profile",
            link: "/user/profile"
        },
        {
            title: "notification",
            link: "/user/notification"
        }

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
                        authorizedHeader.map((item) => (
                            <Button key={item.title} sx={{color: '#fff'}}>
                                <Link href={item.link} style={{textDecoration: "none", color: "#fff"}}>
                                    {item.title}
                                </Link>
                            </Button>))
                        :
                        unauthorizedHeader.map((item) => (
                            <Button key={item.title} sx={{color: '#fff'}}>
                                <Link href={item.link} style={{textDecoration: "none", color: "#fff"}}>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    {session && <Button sx={{color: '#fff', fontWeight:600}} onClick={() => signout()}>SIGN OUT</Button>}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;