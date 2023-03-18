import {Box, Grid, Stack, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {IUser} from "@/types/IUser";
import {IUserModel} from "@/lib/util/schema";
import {StaticImageData} from "next/image";
import {activitiesList} from "@/lib/util/activitiesList";
import LocationInput from "@/components/elements/molecules/LocationInput";
import {ILocation} from "@/types/ILocation";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import { useRouter } from 'next/router';

type UserProps = {
    user: IUserModel
}

type Activity = {
    id: number
    title: string,
    image: StaticImageData,
}

const EditProfileField = ({user}: UserProps) => {
    const [clicked, setClicked] = useState<boolean>(false)
    const [updateUser, setUpdateUser] = useState<IUser>(user)
    const [updateLocation, setUpdateLocation] = useState<ILocation>(user.location)
    const router = useRouter()

    useEffect(() => {
        setUpdateUser({...updateUser, location: updateLocation})
    }, [updateLocation])

    const interestsRender = (activities: Activity[]): JSX.Element[] => {
        return activities.map(activity =>
            <Grid
                key={activity.id}
                item
                onClick={() => {
                }}
                sx={{
                    cursor: "pointer",
                    background: clicked ? "green" : "grey",
                    borderRadius: "25px",
                    color: "#fff",
                    px: "1.2rem",
                    py: ".5rem",
                    mr: ".3rem",
                    mb: ".3rem"
                }}>
                <Typography variant="subtitle2" textAlign="center">{activity.title}</Typography>
            </Grid>
        )
    }

    const onCancel = async () => {
        await router.push('/user/profile')
    }

    const onSubmit = async () => {
        const userData = {
            id: user._id,
            updateUser
        }

        const res = await fetch('/api/user', {
            method: "PATCH",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
              },
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <Stack spacing={4}>
            <TextField
                // error={}
                id="name"
                label="Name"
                variant="outlined"
                value={updateUser.name}
                onChange={(e) => setUpdateUser({...updateUser, name: e.target.value})}
                fullWidth={true}
            />
            <TextField
                // error={}
                id="email"
                label="Email"
                variant="outlined"
                value={updateUser.email}
                onChange={(e) => setUpdateUser({...updateUser, email: e.target.value})}
                fullWidth={true}
            />
            <TextField
                // error={}
                id="introduction"
                label="Introduction"
                variant="outlined"
                value={updateUser.introduction}
                multiline
                onChange={(e) => setUpdateUser({...updateUser, introduction: e.target.value})}
                fullWidth={true}
                rows={4}
            />
            <Grid container justifyContent="left" mb={3}>
                {interestsRender(activitiesList)}
            </Grid>
            <Box>
                <LocationInput
                    location={updateLocation}
                    setLocation={setUpdateLocation}
                    placeholder='location'
                />
                <Typography variant='subtitle2' fontSize={12} color={'grey'}>Your current location:</Typography>
                <Typography variant='subtitle2' fontSize={12} color={'grey'}>{user.location.address}</Typography>
            </Box>
            <Stack spacing={2}>
                <Typography variant="h5">SocialMedia Links</Typography>
                <Box className='instagram' sx={{display: "flex", alignItems: 'center'}}>
                    <Stack direction='column' sx={{justifyContent:'center', mr:3, width:'20%'}}>
                        <InstagramIcon sx={{marginX:'auto'}}/>
                        <Typography variant='subtitle1' textAlign="center">Instagram</Typography>
                    </Stack>
                    <TextField
                        // error={}
                        id="instagram"
                        label="instagram link"
                        variant="outlined"
                        // value={updateUser.socialMediaHandles?.has('')}
                        // onChange={}
                        fullWidth={true}
                    />
                </Box>
                <Box className='facebook' sx={{display: "flex", alignItems: 'center'}}>
                    <Stack direction='column' sx={{justifyContent:'center', mr:3, width:'20%'}}>
                        <FacebookIcon sx={{marginX:'auto'}}/>
                        <Typography variant='subtitle1'  textAlign="center">Facebook</Typography>
                    </Stack>
                    <TextField
                        // error={}
                        id="facebook"
                        label="Facebook link"
                        variant="outlined"
                        // value={updateUser.introduction}
                        // onChange={}
                        fullWidth={true}
                    />
                </Box>
                <Box className='twitter' sx={{display: "flex", alignItems: 'center'}}>
                    <Stack direction='column' sx={{justifyContent:'center', mr:3, width:'20%'}}>
                        <TwitterIcon sx={{marginX:'auto'}}/>
                        <Typography variant='subtitle1' textAlign="center" >Twitter</Typography>
                    </Stack>
                    <TextField
                        // error={}
                        id="Twitter"
                        label="Twitter link"
                        variant="outlined"
                        // value={updateUser.introduction}
                        // onChange={}
                        fullWidth={true}
                    />
                </Box>
            </Stack>
            <Stack direction="row" spacing={3} width='50%' marginRight={0}>
                <TriggerButton title='Save' color="green" onClick={() => onSubmit()}/>
                <TriggerButton title='Cancel' color="grey" onClick={() => onCancel()}/>
            </Stack>
        </Stack>
    );
};

export default EditProfileField;