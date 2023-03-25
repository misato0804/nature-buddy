import React, {useEffect, useState} from 'react';
import {GetServerSidePropsContext} from "next";
import {IUserModel} from "@/lib/util/schema";
import {useRouter} from "next/router";
import {Box, Container, Stack, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import JoinedEvents from "@/components/profle-page/JoinedEvents";
import {IActivityProps} from "@/types/Props";
import StickyButton from "@/components/elements/atoms/StickyButton";

type PageProps = {
    user: IUserModel
}

const BuddyProfile = ({user}: PageProps) => {

    const router = useRouter()
    const twitter = user.socialMediaHandles?.Twitter?.link
    const instagram = user.socialMediaHandles?.Instagram?.link
    const facebook = user.socialMediaHandles?.Facebook?.link
    const [showEvents, setShowEvents] = useState<JSX.Element>(<JoinedEvents activities={user.joinedActivities as IActivityProps[]}/>)

    useEffect(() => {
        user ? null : router.push('/error')
    }, [])

    return (
        <Container sx={{mt: {xs: 14, sm: 12}}}>
            <Box sx={{boxShadow: 2, width: '100%', px: {xs: 2, md: 8}, py: 5}}>
                <Typography variant='h2' fontWeight={500}>{user.name}&apos;s Profile</Typography>
                <Box sx={{display: 'flex', mt: 4}}>
                    <Box sx={{width: '20%'}}>
                        {user.image ? <Box
                                sx={{
                                    width: {xs: 100, sm: 150},
                                    height: {xs: 100, sm: 150},
                                    backgroundImage: `url(${user.image as string})`,
                                    borderRadius: '50%',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    marginX: {xs: 'auto', md: '0'}
                                }}>
                            </Box> :
                            <AccountCircleIcon
                                sx={{
                                    width: {xs: 100, sm: 150},
                                    height: {xs: 100, sm: 150},
                                    opacity: .4,
                                    marginX: {xs: 'auto', md: '0'}
                                }}
                            />}

                        <Stack direction='column'>
                            {instagram ? <InstagramIcon/> : null}
                            {twitter ? <TwitterIcon/> : null}
                            {facebook ? <FacebookIcon/> : null}
                        </Stack>
                    </Box>
                    <Box sx={{width: '80%'}}>
                        <Typography variant='h3'>Introduction</Typography>
                        <Typography
                            variant='subtitle2'>{user.introduction && user.introduction?.length > 0 ? user.introduction : 'There is no introduction yet'}</Typography>
                    </Box>
                </Box>
                {showEvents}
            </Box>
            <StickyButton/>
        </Container>
    );
};

export default BuddyProfile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {buddy_id} = context.query
    console.log(buddy_id)
    const res = await fetch(`http://localhost:3000/api/user/${buddy_id}`)
    const buddy = await res.json()
    console.log(buddy)
    return {
        props: {
            user: buddy.data
        }
    }
}