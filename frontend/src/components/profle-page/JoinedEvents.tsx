import React from 'react';
import ActivityBlock from "@/components/elements/molecules/ActivityBlock";
import {Box} from "@mui/material";
import {v4 as uuidv4} from "uuid";
import {EventProps} from "@/types/Props";
import NoEventBlock from "@/components/elements/molecules/NoEventBlock";

const JoinedEvents = ({activities}: EventProps) => {

    const RenderActivities = activities?.map(activity => (
        <ActivityBlock
            key={uuidv4()}
            title={activity.title}
            number={activity.spots}
            host="misato"
            date={new Date(activity.date).toLocaleDateString()}
            genre={activity.genre}
            url="123"
            image={activity.coverImage}
        />
    ))

    return (
        <Box sx={{boxShadow: 3, py: 2, px: 4}}>
            {
                activities && activities?.length > 0 ? RenderActivities : <NoEventBlock/>
            }
        </Box>
    );
};

export default JoinedEvents;