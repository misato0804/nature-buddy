import {Container, Typography, Box, Stack} from "@mui/material";
import Image from 'next/image';
import camping from "../../../public/assets/images/climbing.jpg"
import picnic
    from "../../../public/assets/images/group-laughing-girls-happily-spending-time-beautiful-picnic-with-little-dog-park.jpg"
import hiking from "../../../public/assets/images/hiking.jpg"
import biking from "../../../public/assets/images/pexels-photomix-company-172484.jpg"
import {FC, useEffect, useState} from "react";
import {styled} from "@mui/system";
import BrowseByActivity from "@/components/elements/organisms/BrowseByActivity";
import HowItWorks from "@/components/hero-page/HowItWorks";

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
    const imagesArr = [camping, picnic, hiking, biking]

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
                    <Stack sx={{alignItems:"center"}} direction={{md: "row"}} spacing={10}>
                        <Box>
                            <Typography variant="h3" mb={4}>This is the platformThis is the platformThis is the platformThis is the platformThis is the platform</Typography>
                            <Typography variant="subtitle1">t is a long established fact that a reader will be
                                distracted by
                                the readable content of a page when looking at its layout. The point of using Lorem
                                Ipsum is
                                that it has a more-or-less normal distribution of letters, as opposed to using
                                here, content , making it look like readable English. Many desktop publishing packages
                                and web page editors now use Lorem Ipsum as their default model text, and a search for
                                </Typography>
                        </Box>
                        <Box>
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