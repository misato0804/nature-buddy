import {Box, Grid, Stack, Typography} from "@mui/material";
import Image, {StaticImageData} from "next/image";
import { useRouter } from 'next/router'

type BlockType = {
    title: string,
    date: string,
    image: StaticImageData | string,
    host: string,
    number: number,
    url: string,
    genre: string
}

const ActivityBlock = ({title, image, date, host, number, url, genre}: BlockType) => {
    const router = useRouter()

    return (
        <Box width="100%"
             onClick={() => {router.push(`/${genre}/${url}`)}}
             sx={{
                 boxShadow: 2,
                 cursor:'pointer',
                 transition: (theme) => theme.transitions.create('all', {duration: theme.transitions.duration.shortest,}),
                 '&:hover': {boxShadow: 5}
             }}>
            <Stack direction={{xs: "column", sm: "row"}}>
                <Box sx={{width: {xs: "100%", sm: "15rem"}}}>
                    <Image
                        src="https://res.cloudinary.com/dpbmhiqim/image/upload/v1677308198/cld-sample-5.jpg"
                        alt=""
                        style={{width: "100%", height: "100%"}}
                        width={150}
                        height={0}
                        priority
                    />
                </Box>
                <Stack sx={{px: 3, py: 2}}>
                    <Typography variant="h4" fontWeight={600}>{date}</Typography>
                    <Typography variant="h4" fontWeight={600}>{title}</Typography>
                    <Typography variant="h5" fontWeight={400} mb={4}>{host}</Typography>
                    <Typography variant="h5" fontWeight={400}>{`${number} buddies`}</Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ActivityBlock;