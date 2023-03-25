import React from 'react';
import ActivityBlock from "@/components/elements/molecules/ActivityBlock";
import {Box, Stack} from "@mui/material";
import {EventProps} from "@/types/Props";
import NoEventBlock from "@/components/elements/molecules/NoEventBlock";

const JoinedEvents = ({activities}: EventProps) => {

    const RenderActivities = activities?.map(activity => (
        <ActivityBlock
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

export default JoinedEvents;