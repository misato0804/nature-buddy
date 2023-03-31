import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {GetServerSideProps} from "next"
import {Box, Container, Stack, Typography} from '@mui/material';
import Image from "next/image";
import BuddyIcon from "@/components/elements/atoms/BuddyIcon";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import Link from "next/link";
import ConfirmationCard from "@/components/elements/atoms/ConfirmationCard";
import HikingOutlinedIcon from "@mui/icons-material/HikingOutlined";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";
import GoogleMapComponent, {CenterCoordinate} from "@/components/elements/molecules/GoogleMap";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import DepartureBoardOutlinedIcon from '@mui/icons-material/DepartureBoardOutlined';
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import {IActivityProps} from "@/types/Props";
import {useSession} from "next-auth/react";
import LoginModal from "@/components/elements/organisms/LoginModal";
import {useNotificationContext} from "@/lib/context/socketContext";
import IOnlineUser from "@/types/IOnlineUser";
import {INotification} from "@/types/INotification";

type PageProps = {
    activity: IActivityProps
}

const containerStyle = {
    width: '100%',
    height: '300px'
};

const Activity = ({activity}: PageProps) => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const { askingUser, socket} = useNotificationContext()
    const [notification, setNotification] = useState<INotification | undefined>()
    const [hostToAsk, setHostToAsk] = useState<IOnlineUser | undefined>({
        email: activity.host.email,
        name: activity.host.name
    })
    const router = useRouter()
    const {data: session} = useSession()
    const [asked, setAsked] = useState<boolean>(false)

    const canAsk = (email: string, activity: IActivityProps) => {
        const isHost = activity.host.email === email
        const joinedBuddy = activity.buddies?.forEach(item => {
            return item.email === email
        })
        if(isHost || joinedBuddy) {
            return false
        }
        return true
    }


    useEffect(() => {
        setNotification({
            ...notification,
            host: hostToAsk!,
            activity_id: activity._id.toString(),
            sender: askingUser
        })
    }, [askingUser])

    const AskToJoin = () => {
        const sendSubmission = async () => {
            socket.emit('send_ask_to_join', notification)
            await fetch('/api/notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({notification})
            })
            setAsked(true)
        }
        session !== undefined ? sendSubmission().then(() => router.push('/')) : setOpenModal(true)
    }

    const seeHostProfile = async () => {
        if (!session) {
            setOpenModal(true)
        } else {
            await router.push(`/user/${activity.host._id}`)
        }
    }

    const getLocalDate = (date: Date): string => {
        return new Date(date).toLocaleDateString()
    }

    const getLocalDateAndTime = (date: Date): string => {
        return new Date(date).toLocaleString()
    }

    const imageUrl = 'https://res.cloudinary.com/dpbmhiqim/image/upload/v1677308198/cld-sample-5.jpg'

    const renderBuddy = (buddies: any[]) => {
        return buddies.map( buddy => <BuddyIcon key={buddy._id} buddy_id={buddy._id} src={buddy.image ? buddy.image : imageUrl}/>)
    }

    const lat = activity.meetingDetail.meetingPoint.coordinates[0] as number
    const lng = activity.meetingDetail.meetingPoint.coordinates[1] as number
    const center: CenterCoordinate = {
        lat,
        lng
    };

    if (!activity) {
        return <h1>Loading...</h1>
    }
    return (
        <Container sx={{mt: {xs: 14, sm: 12}}}>
            <Typography variant="h4">{getLocalDate(activity.date)}</Typography>
            <Typography variant="h2">{activity.title}</Typography>
            <Typography variant="subtitle1">Hosted by <strong onClick={seeHostProfile}
                                                              style={{cursor: "pointer"}}>{activity.host.name}</strong></Typography>
            <Image
                src={activity.coverImage}
                alt="hiking"
                width={200}
                height={0}
                style={{width: "100%", height: "50vh", objectFit: 'cover'}}
                priority
            />
            <Stack direction={{md: "row"}} spacing={{md: 4}} sx={{my: 4, justifyContent: 'center'}}>
                <Box maxWidth={{md: "60%"}} height="65vh" overflow="scroll">
                    <Typography variant="h2">{activity.location.address}</Typography>
                    <Typography variant="h2" mt={3}>Activity Detail</Typography>
                    <Typography variant="subtitle1" my={2}>{activity.description}</Typography>
                    <Typography variant="subtitle1" my={2}>{activity.description}</Typography>
                    <Typography variant="subtitle1" my={2}>{activity.description}</Typography>

                    <Typography variant="h4">Your buddies</Typography>
                    <Stack direction="row" spacing={5} py={2}>
                        {activity.buddies?.length! > 0  && activity.buddies ? renderBuddy(activity.buddies) :
                            <Typography variant="subtitle1">No buddies has joined yet</Typography>}
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-around" my={3}>
                        <ConfirmationCard title="Genre" detail={activity.genre} logo={<HikingOutlinedIcon/>}
                                          style={{width: "100%"}}/>
                        <ConfirmationCard title="Duration" detail={activity.duration} logo={<AvTimerOutlinedIcon/>}
                                          style={{width: "100%"}}/>
                        <ConfirmationCard title="Spots" detail={activity.spots.toString() + " Left"}
                                          logo={<Groups2OutlinedIcon/>} style={{width: "100%"}}/>
                    </Stack>
                </Box>
                <Box width={{md: "40%"}} height="100%" pt={2} sx={{boxShadow: 3, borderRadius: "10px"}} mt={{xs: 4}}>
                    <Container sx={{mb: 2}}>
                        <Typography variant='h4' textAlign="center" fontWeight={700}>MEETING DETAIL</Typography>
                        <Box sx={{display: "flex", alignItems: "center", my: 2}}>
                            <DepartureBoardOutlinedIcon sx={{mr: 2}}/>
                            <Typography
                                variant="h4">{getLocalDateAndTime(activity.meetingDetail.meetingTime)}</Typography>
                        </Box>
                        <Box sx={{display: "flex",}}>
                            <FmdGoodOutlinedIcon sx={{mr: 2}}/>
                            <Typography variant="h4">
                                <Link legacyBehavior
                                      href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${activity.meetingDetail.meetingPoint.place_id}`}>
                                    <a target='_blank'>{activity.meetingDetail.meetingPoint.address}</a>
                                </Link>
                            </Typography>
                        </Box>
                    </Container>
                    <GoogleMapComponent containerStyle={containerStyle} center={center} zoom={13}/>
                    {session?.user?.email && canAsk(session?.user?.email, activity) ? <TriggerButton title="Ask to join" color="green"
                        style={{width: "80%", marginX: "auto", marginY: 2, borderRadius: "5px"}}
                        onClick={AskToJoin}/> : <TriggerButton title='You already joined' color='grey' style={{width: "80%", marginX: "auto", marginY: 2, borderRadius: "5px"}}/>}


                </Box>

            </Stack>
            <LoginModal openModal={openModal} setOpenModal={setOpenModal}/>
        </Container>
    );
};

export default Activity;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {activityId} = context.query
    const res = await fetch(`http://localhost:3000/api/activity/${activityId}`)
    const activity = await res.json()
    return {
        props: {
            activity: activity.data
        },
    };
}

