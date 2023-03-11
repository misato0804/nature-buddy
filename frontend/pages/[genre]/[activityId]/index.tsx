import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {GetServerSideProps} from "next"
import {Box, Container, Stack, Typography} from '@mui/material';
import Image from "next/image";
import BuddyIcon from "@/components/elements/atoms/BuddyIcon";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {getCookie} from "cookies-next"
import hiking from "../../../public/assets/images/hiking.jpg"
import {IActivity} from "@/types/IActivity";
import Link from "next/link";
import {getSession} from "next-auth/react";
import ConfirmationCard from "@/components/elements/atoms/ConfirmationCard";
import HikingOutlinedIcon from "@mui/icons-material/HikingOutlined";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'
import GoogleMapComponent, {CenterCoordinate} from "@/components/elements/molecules/GoogleMap";
// import GoogleMapReact from 'google-map-react';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import DepartureBoardOutlinedIcon from '@mui/icons-material/DepartureBoardOutlined';
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";

type PageProps = {
    data: IActivity
}

const containerStyle = {
    width: '100%',
    height: '300px'
};

const Activity = ({data}: PageProps) => {
    const {query} = useRouter()
    const [activity, setActivity] = useState<IActivity | null>()

    console.log(activity)

    useEffect(() => {
        async function session() {
            const session = await getSession()
            console.log(session)
        }

        session()
        setActivity(data)
    }, [])
    let event: string;
    event = query.activityId as string

    const AskToJoin = () => {
        const cookies = getCookie("userId")
        console.log(cookies)
    }

    const getLocalDate = (date: Date): string => {
        return new Date(date).toLocaleDateString()
    }

    const getLocalDateAndTime = (date: Date): string => {
        return new Date(date).toLocaleString()
    }

// Google map setting
    const lat = data.meetingDetail.meetingPoint.coordinates[0] as number
    const lng = data.meetingDetail.meetingPoint.coordinates[1] as number
    const center: CenterCoordinate = {
        lat,
        lng
    };

    if (!activity) {
        return <h1>Loading...</h1>
    }

    return (
        <Container sx={{mt: {xs: 14, sm: 12}}}>
            <Typography variant="h4">{getLocalDate(data.date)}</Typography>
            <Typography variant="h2">{data.title}</Typography>
            <Typography variant="subtitle1">Hosted by <Link
                href={`/user/${data.host._id}`}>{data.host.name}</Link></Typography>
            <Image
                src={hiking}
                alt="hiking"
                style={{width: "100%", height: "auto"}}
                priority
            />
            <Stack direction={{md: "row"}} spacing={{md: 4}} sx={{my: 4}}>
                <Box maxWidth={{md: "60%"}} height="65vh" overflow="scroll">
                    <Typography variant="h2">{data.location.address}</Typography>
                    <Typography variant="h2" mt={3}>Activity Detail</Typography>
                    <Typography variant="subtitle1" my={2}>{data.description}</Typography>
                    <Typography variant="subtitle1" my={2}>{data.description}</Typography>
                    <Typography variant="subtitle1" my={2}>{data.description}</Typography>
                    <Typography variant="h4">Your buddies</Typography>
                    <Stack direction="row" spacing={5} py={2}>
                        <BuddyIcon src="asds"/>
                        <BuddyIcon src="asds"/>
                        <BuddyIcon src="asds"/>
                        <BuddyIcon src="asds"/>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-around" my={3}>
                        <ConfirmationCard title="Genre" detail={activity.genre} logo={<HikingOutlinedIcon/>} style={{width: "100%"}}/>
                        <ConfirmationCard title="Duration" detail={activity.duration} logo={<AvTimerOutlinedIcon/>} style={{width: "100%"}}/>
                        <ConfirmationCard title="Spots" detail={activity.spots.toString() + " Left"} logo={<Groups2OutlinedIcon/>} style={{width: "100%"}}/>
                    </Stack>

                </Box>
                <Box width={{md: "40%"}} height="100%" pt={2} sx={{boxShadow: 3, borderRadius: "10px"}} mt={{xs:4}}>
                    <Container sx={{mb: 2}}>
                        <Box sx={{display: "flex", alignItems: "center", my: 2}}>
                            <DepartureBoardOutlinedIcon sx={{mr: 2}}/>
                            <Typography
                                variant="h4">{getLocalDateAndTime(activity.meetingDetail.meetingTime)}</Typography>
                        </Box>
                        <Box sx={{display: "flex",}}>
                            <FmdGoodOutlinedIcon sx={{mr: 2}}/>
                            <Typography variant="h4"><Link
                                href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${activity.meetingDetail.meetingPoint.place_id}`}>
                                {activity.meetingDetail.meetingPoint.address}
                            </Link>
                            </Typography>
                        </Box>
                    </Container>
                    <GoogleMapComponent containerStyle={containerStyle} center={center} zoom={13}/>
                    <TriggerButton title="Ask to join" color="green"
                                   style={{width: "80%", marginX: "auto", marginY: 2, borderRadius: "5px"}}
                                   onClick={AskToJoin}/>
                </Box>
            </Stack>
        </Container>
    );
};

export default Activity;

export const getServerSideProps: GetServerSideProps = async (context) => {

    const activityId = context.query
    console.log("activityid", activityId)
    const res = await fetch(`http://localhost:3000/api/activity/640c0a66972a1438a79c95be`)
    const activity = await res.json()
    return {
        props: {
            data: activity.data
        },
    };
}

