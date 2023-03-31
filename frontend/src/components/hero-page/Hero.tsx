import {Container, Typography, Box, Stack} from "@mui/material";
import Image from 'next/image';
import camping from "../../../public/assets/images/climbing.jpg"
import picnic from "../../../public/assets/images/group-laughing-girls-happily-spending-time-beautiful-picnic-with-little-dog-park.jpg"
import explore from "../../../public/assets/images/rxploretown.jpg"
import hiking from "../../../public/assets/images/hiking.jpg"
import biking from "../../../public/assets/images/pexels-photomix-company-172484.jpg"
import group from '../../../public/assets/images/group1.jpg'
import group2 from '../../../public/assets/images/group2.jpg'
import group3 from '../../../public/assets/images/group3.jpg'
import group5 from '../../../public/assets/images/group5.jpg'
import group4 from '../../../public/assets/images/group4.jpg'

import {FC, useEffect, useState} from "react";
import {styled} from "@mui/system";
import BrowseByActivity from "@/components/elements/organisms/BrowseByActivity";
import HowItWorks from "@/components/hero-page/HowItWorks";
import TriggerButton from "@/components/elements/atoms/TriggerButton";

const HeroTop = styled('div')({
    position: "relative",
    width: "100%"
});

const styles = {
    imageStyle: {
        objectFit: "cover",
        objectPosition: "top",
        height: "80vh",
        width: "100%"
    }
}

const Hero: FC = () => {

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const imagesArr = [group, group2, group3, group4, group5]

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(Math.floor(Math.random() * imagesArr.length));
        }, 5000)
        return () => clearInterval(intervalId);
    }, [])

    return (
        <Box component="main" className="hero" sx={{mt: {xs: 11, sm: 4}}}>
            <HeroTop>
                <Image
                    src={imagesArr[currentIndex]}
                    alt="outdoor pictures"
                    style={styles.imageStyle as React.CSSProperties}
                    priority
                />
                <Typography
                    textAlign="center"
                    variant="h1"
                    sx={{
                        width: "100%",
                        backgroundColor: "#ECCC77",
                        WebkitTextFillColor: "transparent",
                        WebkitBackgroundClip: "text",
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
                    <Stack sx={{alignItems: "center"}} direction={{md: "row"}} spacing={5}>
                        <Box width={"100%"}>
                            <Typography variant="h2" sx={{lineHeight: .8}}>Be outdoorsy</Typography>
                            <Typography variant="h2" sx={{lineHeight: .8}} mb={4}>Stay healthy</Typography>
                            <Typography variant="subtitle1">
                                Have you ever struggled with finding someone whom go out with? This application is just
                                for you! Nature Buddy helps you to find like-minded outdoorsy person and you can even
                                create your original activity depends on its type. The more buddies you get, the more
                                you will get motivated to work out.</Typography>
                            <Box sx={{my:4, display: {sm: 'flex'}, alignItems:'center', justifyContent:'space-between'}}>
                                <Typography variant='subtitle1' fontWeight={600}>First things first, why don&apos;t you
                                    create your account?</Typography>
                                <TriggerButton title='create account' color='#4E8497'
                                               style={{width: {sm:'50%'}, mt: 1, ml:1}}/>
                            </Box>
                        </Box>
                        <Box width={"100%"}>
                            <Image
                                src={hiking}
                                alt="hiking"
                                style={{width: "100%", height: "100%"}}
                            />
                        </Box>
                    </Stack>
                    <Box>
                        <BrowseByActivity/>
                        <HowItWorks/>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Hero;