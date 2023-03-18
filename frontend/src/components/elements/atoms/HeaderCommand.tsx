import React from 'react';
import {Box, Button} from "@mui/material";
import Link from "next/link";

type CommandProps = {
    title: string,
    link: string,
    icon?: any
}

const HeaderCommand = ( item: CommandProps) => {

    return (
        <Box>
            <Button key={item.title} sx={{color: '#fff'}}>
                <Link href={item.link} style={{textDecoration: "none", color: "#fff"}}>
                    {item.icon}
                </Link>
            </Button>
        </Box>
    );
};

export default HeaderCommand;