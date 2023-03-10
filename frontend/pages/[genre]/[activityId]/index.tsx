import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {GetServerSideProps} from "next"
import {Box, Container, Stack, Typography} from '@mui/material';
import Image from "next/image";
import BuddyIcon from "@/components/elements/atoms/BuddyIcon";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {getCookie, getCookies} from "cookies-next"
import hiking from "../../../public/assets/images/hiking.jpg"


const Activity = ({activity}: any) => {

    const {query} = useRouter()
    let event: string;
    event = query.activityId as string

    useEffect(() => {

    }, [])

    const AskToJoin = () => {
        const cookies = getCookie("userId")
        console.log(cookies)
    }

    return (
        <Container sx={{mt: {xs: 12, sm: 6}}}>
            <Box>
                <Typography variant="h4">{activity.date}</Typography>
                <Typography variant="h2">{activity.title}</Typography>
                <Typography variant="subtitle1">Hosted by {activity.destination}</Typography>
                <Image
                    src={hiking}
                    alt={activity.genre}
                    style={{width:"100%", height:"auto"}}
                />
                <Typography variant="subtitle2">{activity.description}</Typography>
                <Typography variant="h4">Your buddies</Typography>
                <Stack direction="row" spacing={5}>
                    <BuddyIcon src="asds"/>
                    <BuddyIcon src="asds"/>
                    <BuddyIcon src="asds"/>
                    <BuddyIcon src="asds"/>
                </Stack>
                <TriggerButton title="Ask to join" color="green" style={{my:4}} onClick={AskToJoin}/>
            </Box>
        </Container>
    );
};

export default Activity;

export const getServerSideProps: GetServerSideProps = async (context) => {

    const activityId = context.query
    console.log("activityid", activityId)
    const res = await fetch(`http://localhost:3000/api/activity/63fa9a5018f53aba464962a1`)
    const activity = await res.json()

    return {
        props: {
            activity: activity.data
        },
    };
}

