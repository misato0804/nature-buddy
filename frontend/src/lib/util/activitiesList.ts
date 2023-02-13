import hiking from "../../../public/assets/images/hikingpic.jpg";
import biking from "../../../public/assets/images/biking.jpg";
import climbing from "../../../public/assets/images/climbing.jpg";
import snowactivity from "../../../public/assets/images/snowactivity.jpg";

import {StaticImageData} from "next/image";

type Activity = {
    id: number
    title: string,
    image: StaticImageData,
}

export const activitiesList : Activity[] = [
    {
        id: 1,
        title: "Hiking",
        image: hiking
    },
    {
        id: 2,
        title: "Biking",
        image: biking
    },
    {
        id: 3,
        title: "Climbing",
        image: climbing
    },
    {
        id: 4,
        title: "Snow activities",
        image: snowactivity
    },
    {
        id: 5,
        title: "Road trip",
        image: snowactivity
    },
    {
        id: 6,
        title: "Fishing",
        image: snowactivity
    },
    {
        id: 7,
        title: "Picnicking",
        image: snowactivity
    },
    {
        id: 8,
        title: "Exploring town",
        image: snowactivity
    }
]


    //
    //
    //
    // "Road trip",
    // "Fishing",
    // "Picnicking",
    // "Exploring town"