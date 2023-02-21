import {Box, Grid, Stack, Typography} from "@mui/material";
import Image, {StaticImageData} from "next/image";

type BlockType = {
    title: string,
    date: string,
    image: StaticImageData,
    host: string,
    number: number
}

const ActivityBlock = ({title,image, date, host, number}: BlockType) => {
    return (
        <Box width="100%">
            <Stack direction="row">
                <Box>
                    <Image
                        src={image}
                        alt=""
                        style={{borderRadius:"25px", width:"100%", height:"auto", marginTop:18}}
                        width={0}
                        height={0}
                        priority
                    />
                </Box>
                <Stack sx={{px:3, py:2, width:"80%"}}>
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