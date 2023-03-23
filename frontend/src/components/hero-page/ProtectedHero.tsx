import React, {useEffect, useState} from 'react';
import {Box, Container, Stack, Typography} from "@mui/material";
import ActivityBlock from "@/components/elements/molecules/ActivityBlock";
import BrowseByActivity from "@/components/elements/organisms/BrowseByActivity";
import StickyButton from "@/components/elements/atoms/StickyButton";
import {IActivityModel} from "@/lib/util/activitySchema";
import NoEventBlock from '../elements/molecules/NoEventBlock';

const ProtectedHero = ({user}: any) => {

    const [upcomingActivities, setUpcomingActivities] = useState<IActivityModel[] | undefined>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function getUpcoming() {
            const res = await fetch('/api/activities/upcomingActivities')
            const events = await res.json()
            setUpcomingActivities(events.data)
            setLoading(false)
        }

        getUpcoming()
    }, [])

    const border = <hr
        style={{marginTop: ".5rem", marginBottom: "1rem", border: "none", height: "2px", backgroundColor: "#A2A2A2"}}/>

    const nextEvent = (activities: IActivityModel[]) => {
        activities.sort((a, b) =>
            (new Date(a.meetingDetail.meetingTime).getTime() - new Date(b.meetingDetail.meetingTime).getTime())
        )
        return activities[0]
    }

    return (
        <Container sx={{mt: {xs: 12, sm: 6}}}>
            <Box>
                <Typography variant="h1">Welcome, {user.name}</Typography>
                <Box className="next-event" sx={{mt: 3}}>
                    <Typography variant="h2">Your next activity</Typography>
                    {border}
                    <Box sx={{width: "100%"}}>
                        {user.joinedActivities.length > 0 ? <ActivityBlock props={nextEvent(user.joinedActivities)}/> :
                            <NoEventBlock/>}
                    </Box>
                </Box>

                <Box className="my-buddies" sx={{mt: 3}}>
                    <Typography variant="h2" my={2}>Upcoming activities</Typography>
                    {border}
                    <Stack spacing={3}>
                        {loading ? <h1>Loading...</h1> : upcomingActivities?.map(activity => <ActivityBlock
                            key={activity._id} props={activity}/>)}
                    </Stack>
                </Box>
                <Box className="my-buddies" sx={{mt: 3}}>
                    <Typography variant="h2" my={2}>Activities you are likely interested in</Typography>
                    {border}
                    <Stack spacing={3}>
                        {/*  GET User interests    */}
                    </Stack>
                </Box>
                <BrowseByActivity/>
            </Box>
            <StickyButton/>
        </Container>
    );
};

export default ProtectedHero;

