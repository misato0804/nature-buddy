import hiking from "../../../public/assets/images/hikingpic.jpg";
import biking from "../../../public/assets/images/biking.jpg";
import climbing from "../../../public/assets/images/climbing.jpg";
import snowactivity from "../../../public/assets/images/snowactivity.jpg";
import roadtrip from "../../../public/assets/images/roadtrip.jpg"
import fishing from '../../../public/assets/images/fishing.jpg'
import explore from '../../../public/assets/images/explore.jpg'
import picnic from '../../../public/assets/images/picnic.jpg'
import {StaticImageData} from "next/image";

type Activity = {
    id: number
    title: string,
    image: StaticImageData,
}

export const activitiesList : Activity[] = [
    {
        id: 1,
        title: 'Hiking',
        image: hiking
    },
    {
        id: 2,
        title: 'Biking',
        image: biking
    },
    {
        id: 3,
        title: 'Climbing',
        image: climbing
    },
    {
        id: 4,
        title: 'Snow activities',
        image: snowactivity
    },
    {
        id: 5,
        title: "Roadtrip",
        image: roadtrip
    },
    {
        id: 6,
        title: 'Fishing',
        image: fishing
    },
    {
        id: 7,
        title: 'Picnic',
        image: picnic
    },
    {
        id: 8,
        title: "Explore town",
        image: explore
    }
]