import {Box, Grid, Stack, Typography} from "@mui/material";
import Image, {StaticImageData} from "next/image";
import {useRouter} from 'next/router'
import {IActivityProps} from "@/types/Props";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";


type BlockType = {
    props: IActivityProps,
    initialFavourite?: boolean
}

const ActivityBlock = ({props, initialFavourite}: BlockType) => {
    const router = useRouter()
    const {data: session} = useSession()
    const [favourite, setFavourite] = useState<boolean>(initialFavourite && initialFavourite ? initialFavourite : false)
    const [color, setColor] = useState('action')

    useEffect(() => {
        favourite ? setColor('error') : setColor('action')
    }, [favourite])

    const onClickHandler = async () => {
        const genreQuery = props.genre.toLowerCase().replaceAll(/\s+/g, '');
        await router.push(`/${genreQuery}/${props._id}`)
    }

    const addFavourite = async () => {
        const data = {
            email: session?.user?.email,
            favouriteActivity: props
        }
        try {
            await fetch('http://localhost:3000/api/user/add-favourite', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({data})
            })
            setFavourite(!favourite)

        } catch (e: any) {
            console.log(e)
            await router.push('/error')
        }
    }

    return (
        <Box width="100%"
             sx={{
                 boxShadow: 2,
                 cursor: 'pointer',
                 position: 'relative',
                 transition: (theme) => theme.transitions.create('all', {duration: theme.transitions.duration.shortest,}),
                 '&:hover': {boxShadow: 5}
             }}>
            {session ?
                <FavoriteIcon
                    sx={{position: 'absolute', right: 20, top: 10, '&:hover': {opacity: .5}}}
                    color={favourite ? "error" : 'action'}
                    onClick={() => addFavourite()}
                /> : null}
            <Stack
                direction={{xs: "column", sm: "row"}} sx={{alignItems: 'center'}}
                onClick={() => {
                    onClickHandler()
                }}
            >
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

export default ActivityBlock;