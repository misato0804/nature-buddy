import {Grid, makeStyles, Typography} from "@mui/material";
import Image, {StaticImageData} from 'next/image';
import camping from "../../../public/assets/images/climbing.jpg"
import picnic
    from "../../../public/assets/images/group-laughing-girls-happily-spending-time-beautiful-picnic-with-little-dog-park.jpg"
import hiking from "../../../public/assets/images/hiking.jpg"
import biking from "../../../public/assets/images/pexels-photomix-company-172484.jpg"
import {FC, useEffect, useState} from "react";
import {Screen} from "../../styles/styles_components/hero.style";
import {activitiesList} from "@/util/activitiesList";
import ActivityTopCard from "@/components/ActivityTopCard";

const Hero: FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const imagesArr = [camping, picnic, hiking, biking]

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(Math.floor(Math.random() * imagesArr.length));
        }, 5000)
        return () => clearInterval(intervalId);
    }, [])

    return (
        <section className="hero">
            <Screen>
                <Image
                    src={imagesArr[currentIndex]}
                    alt="outdoor pictures"
                    layout="responsive"
                />
                <Typography
                    variant="h1"
                    className="hero-title"
                    sx={{fontSize: {xs: "1.6rem", md: 30}}}
                >Your buddy is around you
                </Typography>
            </Screen>
            <Typography　align={"center"}>Top popular activities</Typography>
            <Grid container spacing={2} mt={4}>
                {activitiesList.map(activity =>
                    <Grid key={activity.id} item >
                        <ActivityTopCard
                            title={activity.title}
                            activityImage={activity.image}
                            link={activity.title}
                        />
                    </Grid>
                )}
            </Grid>
        </section>
    );
};

export default Hero;