import React from 'react';
import {Box, Stack, Typography} from "@mui/material";
import Image from "next/image";

const NoEventBlock = () => {
    return (
        <Box width="100%" sx={{boxShadow: 2, py:5}}>
                <Typography variant="h6" textAlign="center" color="grey">There is no activities</Typography>
                <Typography variant="h6" textAlign="center" color="grey">You could create your own activity and gather buddies!</Typography>
        </Box>
    );
};

export default NoEventBlock;