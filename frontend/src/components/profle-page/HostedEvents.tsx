import {Box, Stack} from '@mui/material';
import React from 'react';
import {EventProps} from "@/types/Props";
import NoEventBlock from "@/components/elements/molecules/NoEventBlock";
import ActivityBlockWithoutFavourite from "@/components/elements/molecules/ActivityBlockWithoutFavourite";

const HostedEvents = ({activities}: EventProps) => {

    const RenderActivities = activities?.map(activity => (
        <ActivityBlockWithoutFavourite
            key={activity._id}
            props={activity}
        />
    ))

    return (
        <Stack sx={{boxShadow: 3, py: 2, px: 4}} spacing={2}>
            {
                activities && activities?.length > 0 ? RenderActivities : <NoEventBlock/>
            }
        </Stack>
    );
};

export default HostedEvents;