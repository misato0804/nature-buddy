import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {useRouter} from "next/router";
import {INotification} from "@/types/INotification";
import {useNotificationContext} from "@/lib/context/socketContext";

interface pageProps  {
    notificationData: INotification
}

const NotificationBlock = ({notificationData}: pageProps) => {

    const border = <hr
        style={{marginTop: ".5rem", marginBottom: "1rem", border: "none", height: "2px", backgroundColor: "#A2A2A2"}}/>
    const router = useRouter()
    const [buddyId, setBuddyId] = useState<string>('')
    const [color, setColor] = useState('black')
    const [activityTitle, setActivityTitle] = useState<string>('')
    const [sendBackData, setSendBackData] = useState(notificationData)
    const {socket} = useNotificationContext()

    useEffect(() => {
        const getBuddy = async (email: string) => {
            const user = await fetch('/api/user', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            })
            const userData = await user.json()
            setBuddyId(userData.data.user._id)
        }

        const getActivity = async (id:string) => {
            const activity = await fetch(`/api/activity/${id}`)
            const activityData = await activity.json()
            setActivityTitle(activityData.data.title)
        }
        getBuddy('turry@gmail.com')
        getActivity(notificationData.activity_id.toString())
    }, [])

    const clickOnApprove = async () => {
        socket.emit('send_approval', notificationData)
        await fetch('/api/notification', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({notification: sendBackData})
        })
        router.reload()
    }

    return (
        <Box width="100%">
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between', px:2}}>
                <Box width="5%">
                    <NotificationsNoneIcon sx={{display:'block', marginX:'auto', fontSize:'1.8rem', opacity:.7}}/>
                </Box>
                <Box width="70%">
                    <Typography variant='h4'>
                        From
                        <span onClick={() => router.push(`/user/${buddyId}`)}>
                            <strong style={{cursor: "pointer", color: color}} onMouseEnter={() => {setColor('green')}} onMouseLeave={() => {setColor('black')}}>　{notificationData.sender.name}</strong>
                        </span>
                    </Typography>
                    <Typography variant='subtitle2'>{notificationData.sender.name} would like to join your activity : {activityTitle}</Typography>
                </Box>
                <TriggerButton title='Approve' color='green' style={{width:"20%", borderRadius:'5px'}} onClick={() => clickOnApprove()}/>
            </Box>
            {border}
        </Box>
    );
};

export default NotificationBlock;