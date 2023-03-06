import React from 'react';
import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import {activitiesList} from "@/lib/util/activitiesList";
import Image from "next/image";
import {useRouter} from "next/router";

const BrowseByActivity = () => {
    const router = useRouter()

    return (
        <Box
            sx={{
                backgroundColor: "#F6F5E8",
                ml: "calc(((100vw - 100%) / 2) * -1)",
                mr: "calc(((100vw - 100%) / 2) * -1)",
                py:4,
                my:4
            }}
        >
            <Container >
                <Typography variant="h3">Browse by genre</Typography>
                <Stack spacing={3} direction="row" justifyContent="space-between" sx={{width:"100%", overflow:"scroll"}}>

                {activitiesList.map((activity) => (
                    <Box key={activity.id} sx={{cursor:"pointer"}} onClick={() => {router.push(`/${activity.title.toLowerCase()}`)}}>
                        <Image
                            src={activity.image}
                            alt="activity"
                            width={200}
                            height={200}
                            style={{borderRadius:"50%", objectFit:"cover"}}
                        />
                        <Typography textAlign="center">{activity.title}</Typography>
                    </Box>
                ))}
                </Stack>

            </Container>
        </Box>
    );
};

export default BrowseByActivity;