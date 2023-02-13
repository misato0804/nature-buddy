import {Container, Grid, Typography, Box} from "@mui/material";
import Image from 'next/image';
import camping from "../../../public/assets/images/climbing.jpg"
import picnic
    from "../../../public/assets/images/group-laughing-girls-happily-spending-time-beautiful-picnic-with-little-dog-park.jpg"
import hiking from "../../../public/assets/images/hiking.jpg"
import biking from "../../../public/assets/images/pexels-photomix-company-172484.jpg"
import {FC, useEffect, useState} from "react";
import {activitiesList} from "@/lib/util/activitiesList";
import ActivityTopCard from "@/components/ActivityTopCard";
import {styled} from "@mui/system";

const HeroTop = styled('div')({
    position: "relative",
    width: "100%"
});

const styles = {
    imageStyle: {
        objectFit: "cover",
        height: "80%",
        width: "100%"
    }
}

const activitiesCard = activitiesList.map((activity) => (
    <Grid item key={activity.id} xs={3}>
        <ActivityTopCard
            title={activity.title}
            activityImage={activity.image}
            link={activity.title}
        />
    </Grid>
))

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
        <Box component="main" className="hero">
            <HeroTop>
                <Image
                    src={imagesArr[currentIndex]}
                    alt="outdoor pictures"
                    layout="responsive"
                    style={styles.imageStyle as React.CSSProperties}
                />
                <Typography
                    textAlign="center"
                    variant="h1"
                    sx={{
                        width: "100%",
                        backgroundColor: "#ECCC77",
                        "-webkit-text-fill-color": "transparent",
                        "-webkit-background-clip": "text",
                        position: "absolute",
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                    Your buddy is around you
                </Typography>
            </HeroTop>
            <Box my={4}>
                <Container maxWidth="xl">
                    <Typography variant="h2">Top popular activities</Typography>
                    <Grid container rowSpacing={2}>
                        {activitiesCard}
                    </Grid>
                </Container>
            </Box>
            <Box>
                <Typography variant="h2" textAlign="center">How nature buddy works</Typography>

            </Box>

        </Box>
    );
};

export default Hero;