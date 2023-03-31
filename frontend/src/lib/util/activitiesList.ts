import hiking from "../../../public/assets/images/hikingpic.jpg";
import biking from "../../../public/assets/images/biking.jpg";
import climbing from "../../../public/assets/images/climbing.jpg";
import snowactivity from "../../../public/assets/images/snowactivity.jpg";
import roadtrip from "../../../public/assets/images/roadtrip.jpg"
import fishing from '../../../public/assets/images/fishing.jpg'
import explore from '../../../public/assets/images/explore.jpg'
import picnic from '../../../public/assets/images/picnic.jpg'

import {StaticImageData} from "next/image";
import Genre from "@/types/Genre";
import {parseIni} from "@aws-sdk/shared-ini-file-loader/dist-types/parseIni";

type Activity = {
    id: number
    title: string,
    image: StaticImageData,
}

export const activitiesList : Activity[] = [
    {
        id: 1,
        title: Genre.HIKING,
        image: hiking
    },
    {
        id: 2,
        title: Genre.BIKING,
        image: biking
    },
    {
        id: 3,
        title: Genre.CLIMBING,
        image: climbing
    },
    {
        id: 4,
        title: Genre.SNOW_ACTIVITY,
        image: snowactivity
    },
    {
        id: 5,
        title: Genre.ROAD_TRIP,
        image: roadtrip
    },
    {
        id: 6,
        title: Genre.FISHING,
        image: fishing
    },
    {
        id: 7,
        title: Genre.PICNICKING,
        image: picnic
    },
    {
        id: 8,
        title: Genre.EXPLORE_TOWN,
        image: explore
    }
]