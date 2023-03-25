import React, {useEffect, useState} from 'react';
import ActivityBlock from "@/components/elements/molecules/ActivityBlock";
import {Box, Stack} from "@mui/material";
import {EventProps, IActivityProps} from "@/types/Props";
import NoEventBlock from "@/components/elements/molecules/NoEventBlock";

const FavouriteEvents = ({activities}: EventProps) => {

    const [favourites, setFavourites] = useState<IActivityProps[] | undefined>([])

    useEffect(() => {
        setFavourites(activities)
    }, [])

    useEffect(() => {
        setFavourites(activities)
    }, [activities])

    const RenderActivities = favourites?.map(activity => (
        <ActivityBlock
            key={activity._id}
            props={activity}
            initialFavourite={true}
        />
    ))

    return (
        <Stack sx={{boxShadow: 3, py: 2, px: 4}} spacing={2}>
            {
                favourites && favourites?.length > 0 ? RenderActivities : <NoEventBlock/>
            }
        </Stack>
    );
};

export default FavouriteEvents;