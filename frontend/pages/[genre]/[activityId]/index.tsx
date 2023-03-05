import React from 'react';
import {useRouter} from "next/router";

const Event = () => {

    const {query} = useRouter()
    let event : string;
    event = query.activityId as string

    return (
        <div style={{marginTop:"200px"}}>
            {event}
        </div>
    );
};

export default Event;