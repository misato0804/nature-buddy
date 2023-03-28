import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {INotification} from "@/types/INotification";

type pageProps = {
    notification: INotification
}

const GotPermission = ({notification}: pageProps) => {
    const border = <hr
        style={{marginTop: ".5rem", marginBottom: "1rem", border: "none", height: "2px", backgroundColor: "#A2A2A2"}}/>

    const [activityTitle, setActivityTitle] = useState<string>('')

    useEffect(() => {
        const getActivity = async (id:string) => {
            const activity = await fetch(`/api/activity/${id}`)
            const activityData = await activity.json()
            setActivityTitle(activityData.data.title)
        }
        getActivity(notification.activity_id.toString())
    }, [])

    return (
        <Box width="100%">
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2}}>
                <Box width="5%">
                    <CheckBoxIcon sx={{display: 'block', marginX: 'auto', fontSize: '1.8rem', opacity: .7}}/>
                </Box>
                <Box width="93%">
                    <Typography variant='h4'>
                        From<span><span>  </span>{notification.host.name}</span>
                    </Typography>
                    <Typography variant='subtitle2'>{notification.host.name} add you to {activityTitle} </Typography>
                </Box>
            </Box>
            {border}
        </Box>
    );
};

export default GotPermission;