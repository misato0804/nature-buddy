import React from 'react';
import {Box, Stack, Typography} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import {IActivityProps} from "@/types/Props";
import {useRouter} from "next/router";

type BlockType = {
    props: IActivityProps,
}

const ActivityBlockWithoutFavourite = ({props}: BlockType) => {
    const router = useRouter()
    const onClickHandler = async () => {
        const genreQuery = props.genre.toLowerCase().replaceAll(/\s+/g, '');
        await router.push(`/${genreQuery}/${props._id}`)
    }

    return (
        <Box width="100%"
             onClick={() => {onClickHandler()}}
             sx={{
                 boxShadow: 2,
                 cursor: 'pointer',
                 position: 'relative',
                 transition: (theme) => theme.transitions.create('all', {duration: theme.transitions.duration.shortest,}),
                 '&:hover': {boxShadow: 5}
             }}>
            <Stack direction={{xs: "column", sm: "row"}} sx={{alignItems: 'center'}}>
                <Box sx={{width: {xs: "100%", sm: "17rem"}, height: "11.5rem", display: "flex", alignItems: 'center'}}>
                    <Image
                        src={props.coverImage}
                        alt=""
                        style={{width: "100%", height: "100%", objectFit: "cover"}}
                        width={150}
                        height={0}
                        priority
                    />
                </Box>
                <Stack sx={{px: 3, py: 2, marginRight: 'auto'}}>
                    <Typography variant="h4" fontWeight={600}>{new Date(props.date).toLocaleDateString()}</Typography>
                    <Typography variant="h4" fontWeight={600}>{props.title}</Typography>
                    {/*<Typography variant="h5" fontWeight={400} mb={4}>{props.host.name == null ? null : props.host.name}</Typography>*/}
                    <Typography variant="h5" fontWeight={400}>{`${props.spots} buddies`}</Typography>
                    <Typography variant="h5" fontWeight={400}
                                sx={{backgroundColor: "#AFE1AF", width: '10rem', borderRadius: '15px', mt: 1.2, py: .4}}
                                textAlign={'center'}>{`${props.genre}`}</Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ActivityBlockWithoutFavourite;