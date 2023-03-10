import React from 'react';
import {Box, Theme} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useRouter} from "next/router";

const StickyButton = () => {
    const router = useRouter()

    const buttonStyle = {
        position: "fixed",
        bottom: 20,
        right:30,
        backgroundColor: "green",
        width: {xs:"50px", md:"75px"},
        height:{xs:"50px", md:"75px"},
        borderRadius:"50%",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        transition: (theme: Theme) => theme.transitions.create('all', {duration: theme.transitions.duration.shortest,}),
        "&:hover": {
            opacity:.8,
        },
        cursor: "pointer"
    }

    return (
        <Box sx={buttonStyle} onClick={() => {router.push('/creategathering')}}>
            <AddIcon fontSize="medium" sx={{color:"white"}}/>
        </Box>
    );
};

export default StickyButton;