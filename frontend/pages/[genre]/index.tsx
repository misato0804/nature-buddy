import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import SortButton from "@/components/elements/atoms/SortButton";
import ActivityBlock from "@/components/elements/molecules/ActivityBlock";
import {GetServerSidePropsContext} from "next";
import {IActivityProps} from "@/types/Props";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {getNextWeekend, getThisSunday, getTomorrow} from "@/lib/helpers/getThisSunday";
import NoEventBlock from "@/components/elements/molecules/NoEventBlock";
import sortByDate from "@/lib/helpers/sortByDate";
import {signOut, useSession} from "next-auth/react"


type PageProps = {
    activities: IActivityProps[]
}

const Activity = ({activities}: PageProps) => {
    const {query} = useRouter()
    let genre: string;
    genre = query.genre as string
    genre = genre!.charAt(0).toUpperCase() + genre.slice(1)
    const [shownActivities, setShowActivities] = useState<IActivityProps[] | undefined>()
    const [sortedBy, setSortedBy] = useState<string>('')
    const [numberOfDisplay, setNumberOfDisplay] = useState<number>(5)

    const sortActivities = (sortedBy: string, activities: IActivityProps[]) => {
        switch (sortedBy) {
            case 'tomorrow':
                const tomorrow = getTomorrow().toLocaleDateString()
                const newArrOfTomorrow = activities.filter(item => {
                    const eventDate = new Date(item.date).toLocaleDateString()
                    return tomorrow === eventDate
                })
                return setShowActivities(sortByDate(newArrOfTomorrow))
            case 'this weekend':
                const newArr = activities.filter(item => {
                    const activityDate = new Date(item.date).getTime()
                    const thisWeekends = getThisSunday()
                    const activityDateNum = new Date(item.date).getDay()
                    return thisWeekends - activityDate > 0 && (activityDateNum == 6 || activityDateNum == 0)
                })
                return setShowActivities(sortByDate(newArr))
            case 'next week':
                const newArrOfNextWeek = activities.filter(item => {
                    const activityDate = new Date(item.date).getTime()
                    const thisWeekends = getThisSunday()
                    const nextWeekends = getNextWeekend()
                    return activityDate > thisWeekends && nextWeekends > activityDate
                })
                return setShowActivities(sortByDate(newArrOfNextWeek))
            case '3 〜 5':
                const groupOf3Arr = activities.filter(item => {
                    return item.spots >= 3 && item.spots < 6
                })
                return  setShowActivities(sortByDate(groupOf3Arr))
            case '5 〜 10':
                const groupOf5Arr = activities.filter(item => {
                    return item.spots >= 5 && item.spots < 11
                })
                return  setShowActivities(sortByDate(groupOf5Arr))
            case '10 〜 ':
                const groupOf10Arr = activities.filter(item => {
                    return item.spots >= 10
                })
                return  setShowActivities(sortByDate(groupOf10Arr))
        }

    }

    const onClear = () => {
        setShowActivities(sortByDate(activities))
        setSortedBy('')
    }

    useEffect(() => {
        setShowActivities(sortByDate(activities))
    }, [])

    useEffect(() => {
        sortActivities(sortedBy, activities)
    }, [sortedBy])

    if (shownActivities === undefined) {
        return <h1>Loading...</h1>
    }

    return (
        <Container component="main" sx={{mt: {xs: 14, sm: 6}}} maxWidth="lg">
            <Typography variant="h1" mt={8} mb={3}>{genre}</Typography>
            {/*<h1 onClick={() => {signOut()}}>SIGN OUT</h1>*/}
            <Stack
                width={{xs: '100%', md: '50%'}}
                direction='row'
                mb={2}
                spacing={2}
                position={"relative"}
            >
                <SortButton title={"Day"} setSortedBy={setSortedBy}
                            sortedByArr={['tomorrow', 'this weekend', 'next week']}/>
                <SortButton title={"Size"} setSortedBy={setSortedBy} sortedByArr={["3 〜 5", "5 〜 10", "10 〜 "]}/>
                <TriggerButton title={'Clear'} color='#E5E4E2' style={{color: "#000"}} onClick={onClear}/>
            </Stack>
            <hr/>
            <Stack direction='column' my={3} spacing={3}>
                {shownActivities.length !== 0 ? shownActivities.slice(0,5).map(activity => (
                    <Box key={activity._id}>
                        <ActivityBlock props={activity}/>
                    </Box>
                )) : <NoEventBlock/>}
            </Stack>
        </Container>
    );
};

export default Activity;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {genre} = context.query
    const res = await fetch(`http://localhost:3000/api/activities/${genre}`)
    const data = await res.json()
    return {
        props: {
            activities: data.data
        }
    }
}