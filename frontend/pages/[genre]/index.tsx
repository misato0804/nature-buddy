import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import SortButton from "@/components/elements/atoms/SortButton";
import ActivityBlock from "@/components/elements/molecules/ActivityBlock";
import {GetServerSidePropsContext} from "next";
import {IActivityProps} from "@/types/Props";

type PageProps = {
    activities: IActivityProps[]
}

const Activity = ({activities}: PageProps) => {
    const {query} = useRouter()
    let genre : string;
    genre = query.genre as string
    genre = genre!.charAt(0).toUpperCase() + genre.slice(1)

    if(!activities) return <h1>Loading...</h1>

    return (
        <Container component="main" sx={{mt: {xs:14, sm:6}}} maxWidth="xl">
            <Typography variant="h1">{genre}</Typography>
            <Stack
                width='100%'
                direction='row'
                mb={2}
                spacing={2}
                position={"relative"}
                zIndex={10}
            >
                <SortButton title={"Day"} sortedByArr={["tomorrow", "Today", "This week"]}/>
                <SortButton title={"Size"} sortedByArr={["tomorrow", "Today", "This week"]}/>
                <SortButton title={"distance"} sortedByArr={["tomorrow", "Today", "This week"]}/>
            </Stack>
            <hr style={{}}/>
            <Stack direction='column' my={3} spacing={3}>
                { activities.map(activity => (
                    <Box key={activity._id}>
                        <ActivityBlock props={activity}/>
                    </Box>
                ))}
            </Stack>
        </Container>
    );
};

export default Activity;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {genre} = context.query
    console.log(genre)
    const res = await fetch(`http://localhost:3000/api/activities/${genre}`)
    const data = await res.json()
    console.log(data)
    return {
        props: {
            activities: data.data
        }
    }
}