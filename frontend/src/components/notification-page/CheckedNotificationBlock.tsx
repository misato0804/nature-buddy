import React, {useState} from 'react';
import {Box, Typography} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {INotification} from "@/types/INotification";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

type pageProps = {
    notification: INotification
}

const CheckedNotificationBlock = ({notification}: pageProps) => {

    const border = <hr
        style={{marginTop: ".5rem", marginBottom: "1rem", border: "none", height: "2px", backgroundColor: "#A2A2A2"}}/>

    return (
        <Box width="100%">
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2}}>
                <Box width="5%">
                    <CheckBoxIcon sx={{display: 'block', marginX: 'auto', fontSize: '1.8rem', opacity: .7}}/>
                </Box>
                <Box width="93%">
                    <Typography variant='h4'>
                        From<span><span>  </span>{notification.sender.name}</span>
                    </Typography>
                    <Typography variant='subtitle2'>{notification.sender.name} would like to join your activity </Typography>
                </Box>
            </Box>
            {border}
        </Box>

    );
};

export default CheckedNotificationBlock;