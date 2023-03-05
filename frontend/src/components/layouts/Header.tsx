import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import Link from "next/link";
import { signOut } from "next-auth/react"

const Header = () => {

    const navItems = ["HOME", "Log in", "Sign up"]


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
                    {navItems.map((item) => (
                        <Button key={item} sx={{color: '#fff'}}>
                            <Link href="/login" style={{textDecoration: "none", color: "#fff"}}>
                                {item}
                            </Link>
                        </Button>
                    ))}
                    <Button sx={{color: '#fff'}} onClick={()=> signOut()}>SIGN OUT</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;