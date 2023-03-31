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
import Link from "next/link";
import sortByDate from "@/lib/helpers/sortByDate";
import {string} from "prop-types";

type PageProps = {
    user: IUserModel
}

const BuddyProfile = ({user}: PageProps) => {

    const router = useRouter()
    const twitter = user.socialMediaHandles?.Twitter?.link
    const instagram = user.socialMediaHandles?.Instagram?.link
    const facebook = user.socialMediaHandles?.Facebook?.link
    const [showEvents, setShowEvents] = useState<JSX.Element>(<JoinedEvents
        activities={sortByDate(user.joinedActivities as IActivityProps[])}/>)

    console.log(user.image)

    useEffect(() => {
        user ? null : router.push('/error')
    }, [])

    const showInterests = (interests: string[]) => {
        return interests.map(interest =>
            <Typography
                sx={{
                    display: 'inline-block',
                    backgroundColor: '#9DC08B',
                    py: 1.2,
                    px: 3,
                    mr: 1,
                    borderRadius: '20px',
                    fontSize:'.8rem'
                }}
                key={interest}>{interest}
            </Typography>
        )
    }

    return (
        <Container sx={{mt: {xs: 14, sm: 12}}}>
            <Box sx={{boxShadow: 2, width: '100%', px: {xs: 2, md: 8}, py: 5}}>
                <Box sx={{display: {sm:'flex'}, alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography variant='h2' fontWeight={500}>{user.name}&apos;s Profile</Typography>
                    <Box sx={{mt:{xs:2, sm:0}}}>
                        {showInterests(user.interests)}
                    </Box>
                </Box>
                <Box sx={{display: {xs:'block', sm: 'flex'}, mt: 4, justifyContent:{sm:'space-evenly'}}}>
                    <Box sx={{width:'30%',marginX:'auto'}}>
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
                                    display:'block',
                                    marginX: {xs: 'auto', md: "auto"}
                                }}
                            />}
                        <Stack direction='row' width={{xs:'100%', sm:'70%'}} justifyContent={'space-between'} sx={{mx: "auto"}}>
                            {instagram ? <Link target="_blank" href={instagram}><InstagramIcon
                                sx={{opacity: .7, textDecoration: 'none', color: 'black'}}/></Link> : null}
                            {twitter ? <Link target="_blank" href={twitter}><TwitterIcon
                                sx={{opacity: .7, textDecoration: 'none', color: 'black'}}/></Link> : null}
                            {facebook ? <Link target="_blank" href={facebook}><FacebookIcon
                                sx={{opacity: .7, textDecoration: 'none', color: 'black'}}/></Link> : null}
                        </Stack>
                    </Box>
                    <Box sx={{width:'60%', my:{xs:5, sm:0}}}>
                        <Typography variant='h3'>Introduction</Typography>
                        <Typography
                            variant='subtitle2'>{user.introduction && user.introduction?.length > 0 ? user.introduction : 'There is no introduction yet'}</Typography>
                    </Box>
                </Box>
                <Typography variant='h4' mb={2} mt={4}>{user.name}&apos;s activities</Typography>
                {showEvents}
            </Box>
            <StickyButton/>
        </Container>
    );
};

export default BuddyProfile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {buddy_id} = context.query
    const res = await fetch(`http://localhost:3000/api/user/${buddy_id}`)
    const buddy = await res.json()
    return {
        props: {
            user: buddy.data
        }
    }
}