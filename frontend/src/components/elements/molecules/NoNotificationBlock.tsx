import React from 'react';
import {Box, Typography} from "@mui/material";

const NoNotificationBlock = () => {
    return (
        <Box width="100%" sx={{boxShadow: 2, py:5}}>
            <Typography variant="h6" textAlign="center" color="grey">There is no notification</Typography>
            <Typography variant="h6" textAlign="center" color="grey">Notifications you received appear here</Typography>
        </Box>
    );
};

export default NoNotificationBlock;