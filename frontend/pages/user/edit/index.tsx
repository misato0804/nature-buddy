import React, {useState} from 'react';
import {Box, Container, Stack, Typography} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {getSession, useSession} from "next-auth/react";
import EditProfileField from "@/components/edit-profile-page/EditProfileField";
import {GetServerSidePropsContext} from "next";
import {IUserModel} from "@/lib/util/schema";

type UserProps = {
    user: IUserModel
}

const UserEdit = ({user}: UserProps) => {

    const {data: session} = useSession()
    const [showImageChange, setShowImageChange] = useState<string>('hidden')

    const imageChangeBtn = (
        <Box sx={{
            cursor:'pointer',
            backgroundColor: '#000',
            color: '#fff',
            position: 'absolute',
            left: '50%',
            bottom:-20,
            transform: 'translateX(-50%)',
            opacity: .6,
            px: 3,
            width: "100%",
            py:1,
            visibility: showImageChange
        }}>
            <Typography variant='subtitle1' fontSize={12} textAlign='center'>Change Image</Typography>
        </Box>
    )

    return (
        <Container sx={{mt: {xs: 14, sm: 12}}}>
            <Box sx={{boxShadow: 3, width: '100%', px: 8, py: 5}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant='h2' fontWeight={500}>Profile</Typography>
                    <TriggerButton
                        title="View Profile"
                        color="grey"
                        style={{width: {xs: "50%", sm: "30%", md: "20%"}}}
                        onClick={() => {
                        }}
                    />
                </Box>
                <Stack
                    direction={{xs: 'column', md: 'row'}}
                    // spacing={4}
                    sx={{my:5}}
                >
                    <Box sx={{width:{xs:'100%', md:'30%'}}}>
                        <Box sx={{position: 'relative', width: {xs: 100, sm: 150}, marginX:{xs:'auto'}, marginBottom:3}}>
                            <Box
                                sx={{
                                    width: {xs: 100, sm: 150},
                                    height: {xs: 100, sm: 150},
                                    backgroundImage: `url(${session?.user?.image as string})`,
                                    borderRadius: '50%',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    cursor:"pointer",
                                }}
                                onMouseEnter={() => {setShowImageChange('visible')}}
                                onMouseLeave={() => {setShowImageChange('hidden')}}
                            >
                            </Box>
                            {imageChangeBtn}
                        </Box>
                    </Box>
                    <Box sx={{width: {xs:'100%', md:'70%'}}}>
                        <EditProfileField user={user}/>
                    </Box>
                </Stack>
            </Box>
        </Container>
    );
};

export default UserEdit;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if(!session) {
        return {
            props: {}
        }
    }
    const email = session?.user?.email
    const res = await fetch(`http://localhost:3000/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email})
    })
    const result = await res.json()
    const userData : IUserModel = result.data.user
    return {
        props: {
            user: userData
        }
    }
}