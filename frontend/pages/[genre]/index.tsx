import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import SortButton from "@/components/elements/atoms/SortButton";
import mountain from "../../public/assets/images/biking.jpg";
import ActivityBlock from "@/components/elements/molecules/ActivityBlock";

const Activity = () => {
    const {query} = useRouter()
    let activity : string;
    activity = query.genre as string
    console.log(activity)

    if(!activity) return <h1>Loading...</h1>

    return (
        <Container component="main" sx={{mt: 6}} maxWidth="xl">
            <Typography variant="h1">{activity}</Typography>
            <Stack
                width={500}
                direction={{xs: "column", md: "row"}}
                mb={2}
                spacing={2}
                position={"relative"}
                zIndex={10}
            >
                <SortButton title={"day"} sortedByArr={["tomorrow", "Today", "This week"]}/>
                <SortButton title={"size"} sortedByArr={["tomorrow", "Today", "This week"]}/>
                <SortButton title={"distance"} sortedByArr={["tomorrow", "Today", "This week"]}/>
            </Stack>
            <hr style={{}}/>
            <Grid container display="flex" justifyContent="space-evenly" rowSpacing={3} columnSpacing={2}>
                <Grid item xs={10} lg={6}>
                    <ActivityBlock
                        image={mountain}
                        title={"Adventure"}
                        date={new Date().toString()}
                        host={"Misato"}
                        number={3}
                        genre={"Hiking"}
                        url={"/"}
                    />
                </Grid>
                <Grid item xs={10} lg={6}>
                    <ActivityBlock
                        image={mountain}
                        title={"Adventure"}
                        date={new Date().toString()}
                        host={"Misato"}
                        number={3}
                        genre={"Hiking"}
                        url={"/"}
                    />
                </Grid>
                <Grid item xs={10} lg={6}>
                    <ActivityBlock
                        image={mountain}
                        title={"Adventure"}
                        date={new Date().toString()}
                        host={"Misato"}
                        number={3}
                        genre={"Hiking"}
                        url={"/"}
                    />
                </Grid>
                <Grid item xs={10} lg={6}>
                    <ActivityBlock
                        image={mountain}
                        title={"Adventure"}
                        date={new Date().toString()}
                        host={"Misato"}
                        number={3}
                        genre={"Hiking"}
                        url={"/"}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Activity;