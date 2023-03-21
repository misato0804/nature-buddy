import React, {useState} from 'react';
import {GetServerSidePropsContext} from "next";
import {getSession, useSession} from "next-auth/react";
import {IUserModel} from "@/lib/util/schema";
import {Box, Container, Stack, Typography} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import { useRouter } from 'next/router'
import JoinedEvents from "@/components/profle-page/JoinedEvents";
import HostedEvents from "@/components/profle-page/HostedEvents";
import FavouriteEvents from "@/components/profle-page/FavouriteEvents";
import StickyButton from "@/components/elements/atoms/StickyButton";

type UserProps = {
    user: IUserModel
}

const Profile = ({user}: UserProps) => {
    const {data: session} = useSession()
    const router = useRouter()
    const [showEvents, setShowEvents] = useState<JSX.Element>(<JoinedEvents activities={user.joinedActivities}/>)
    const [bgColor, setBgColor] = useState<string>('joined')

    const border = <hr
        style={{marginTop: ".5rem", marginBottom: "1rem", border: "none", height: "1.2px", backgroundColor: "#A2A2A2"}}/>

    const onCLickEventHandler = (child: JSX.Element, title: string) => {
        setShowEvents(child)
        setBgColor(title)
    }

    return (
        <Container sx={{mt: {xs: 14, sm: 12}}}>
            <Box sx={{boxShadow: 2, width: '100%', px: {xs:2, md:8}, py: 5}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant='h2' fontWeight={500}>Profile</Typography>
                    <TriggerButton
                        title="Edit Profile"
                        color="grey"
                        style={{width: {xs: "50%", sm: "30%", md: "20%"}}}
                        onClick={() => {router.push('/user/edit')}}
                    />
                </Box>
                <Stack sx={{my: 4}} direction={{sm: 'column', md: 'row'}} spacing={5}>
                    <Box
                        sx={{
                            width: {xs: 100, sm: 150},
                            height: {xs: 100, sm: 150},
                            backgroundImage: `url(${session?.user?.image as string})`,
                            borderRadius: '50%',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            marginX:{xs: 'auto', md:'0'}
                        }}>
                    </Box>
                    <Box>
                        <Typography variant='h2'>{user.name}</Typography>
                        <Typography>{user.introduction ? user.introduction : "Your introduction is shown here"}</Typography>
                    </Box>
                </Stack>
                {border}
                <Box>
                    <Stack direction='row' spacing={1.5} sx={{overflow:"scroll"}} py={2} px={1}>
                        <Box
                            sx={{ cursor: 'pointer', boxShadow:2, px:1, py:1, '&:active': {boxShadow:'none', border:.1}}}
                            onClick={() => (onCLickEventHandler(<JoinedEvents activities={user.joinedActivities}/>, 'joined'))}>
                            <Typography variant='h6' sx={{backgroundColor:`${bgColor === "joined" ? "#D6CFC7" : ""}`, px:3, py:1.2}}>Joined</Typography>
                        </Box>
                        <Box
                            sx={{cursor: 'pointer', boxShadow:3, px:1, py:1, '&:active': {boxShadow:'none', border:.1}}}
                            onClick={() => (onCLickEventHandler(<HostedEvents activities={user.hostedActivities}/>, 'hosted'))}>
                        <Typography variant='h6'sx={{backgroundColor:`${bgColor === "hosted" ? "#D6CFC7" : ""}`, px:3, py:1.2}}>Hosted</Typography>
                        </Box>
                        <Box
                            sx={{cursor: 'pointer', boxShadow:3, px:1, py:1, '&:active': {boxShadow:'none', border:.1}}}
                            onClick={() => (onCLickEventHandler(<FavouriteEvents activities={user.favouriteActivities}/>, 'favourite'))}>
                        <Typography variant='h6' sx={{backgroundColor:`${bgColor === "favourite" ? "#D6CFC7" : ""}`, px:3, py:1.2}}>Favourite</Typography>
                        </Box>
                    </Stack>
                </Box>
                { showEvents }
            </Box>
            <StickyButton/>
        </Container>
    );
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const session = await getSession(context)
    const email = session?.user?.email
    const res = await fetch(`http://localhost:3000/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email})
    })
    const result = await res.json()
    const userData = result.data.user
    return {
        props: {
            user: userData
        }
    }
}


