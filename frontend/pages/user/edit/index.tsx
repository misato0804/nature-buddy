import React, {useState} from 'react';
import {Box, Container, Stack, Typography} from "@mui/material";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import {getSession, useSession} from "next-auth/react";
import EditProfileField from "@/components/edit-profile-page/EditProfileField";
import {GetServerSidePropsContext} from "next";
import {IUserModel} from "@/lib/util/schema";
import {useRouter} from 'next/router'
import StickyButton from "@/components/elements/atoms/StickyButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import user_icon from '../../../public/assets/images/user_icon.png'
import {IUser} from "@/types/IUser";
import {ILocation} from "@/types/ILocation";

type UserProps = {
    user: IUserModel
}

const UserEdit = ({user}: UserProps) => {

    const {data: session} = useSession()
    const router = useRouter()
    const [showImageChange, setShowImageChange] = useState<string>('hidden')
    const [fileData, setFileData] = useState<FileList | undefined>()
    const [uploadDate, setUploadDate] = useState<string | null | undefined>(user.image)
    const [updateUser, setUpdateUser] = useState<IUser>(user)
    const [updateLocation, setUpdateLocation] = useState<ILocation>(user.location)

    const imageChangeBtn = (
        <Box sx={{
            cursor: 'pointer',
            backgroundColor: '#000',
            color: '#fff',
            position: 'absolute',
            left: '50%',
            bottom: -20,
            transform: 'translateX(-50%)',
            opacity: .6,
            px: 3,
            width: "100%",
            py: 1,
            visibility: showImageChange
        }}>
            <Typography variant='subtitle1' fontSize={12} textAlign='center'>Change Image</Typography>
        </Box>
    )

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        reader.onload = function (loadEvent) {
            loadEvent.target && setUploadDate(loadEvent.target.result as string)
        }
        e.target.files && setFileData(e.target.files)
        e.target.files && reader.readAsDataURL(e.target.files[0] as any)
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const formData = new FormData()
        fileData && formData.append("file", fileData[0])
        formData.append('upload_preset', 'nature-buddy')
        try {
            const resFromCloudinary = await fetch("https://api.cloudinary.com/v1_1/dpbmhiqim/image/upload", {
                method: "POST",
                body: formData
            })
            await resFromCloudinary.json().then(result => {
                setUpdateUser({...updateUser, image: result.secure_url})
            })
        console.log(updateUser)
            const res = await fetch('/api/user', {
                method: "PATCH",
                body: JSON.stringify({
                    updateUser,
                    id: user._id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res)
            res.status === 200 && await router.push('/user/profile')
        } catch (e: any) {
            console.log(e)
            await router.push('/')
        }
    }

    return (
        <Container sx={{mt: {xs: 14, sm: 12}}}>
            <Box sx={{boxShadow: 3, width: '100%', px: 8, py: 5}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant='h2' fontWeight={500}>Profile</Typography>
                    <TriggerButton
                        title="View Profile"
                        color="grey"
                        style={{width: {xs: "50%", sm: "30%", md: "20%"}}}
                        onClick={async () => {
                            await router.push('/user/profile')
                        }}
                    />
                </Box>
                <Stack
                    direction={{xs: 'column', md: 'row'}}
                    sx={{my: 5}}
                >
                    <Box sx={{width: {xs: '100%', md: '30%'}}}>
                        <Box sx={{
                            position: 'relative',
                            width: {xs: 100, sm: 150},
                            marginX: {xs: 'auto'},
                            marginBottom: 3
                        }}>
                            <label htmlFor="file">
                                <input
                                    style={{display: "none"}}
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={handleOnchange}
                                />
                                {uploadDate ? <Box
                                        sx={{
                                            width: {xs: 100, sm: 150},
                                            height: {xs: 100, sm: 150},
                                            backgroundImage: `url(${uploadDate})`,
                                            borderRadius: '50%',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            cursor: "pointer",
                                        }}
                                        onMouseEnter={() => {
                                            setShowImageChange('visible')
                                        }}
                                        onMouseLeave={() => {
                                            setShowImageChange('hidden')
                                        }}
                                    >
                                    </Box> :
                                    <AccountCircleIcon
                                        sx={{
                                            width: {xs: 100, sm: 150},
                                            height: {xs: 100, sm: 150},
                                            opacity: .4,
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={() => {
                                            setShowImageChange('visible')
                                        }}
                                        onMouseLeave={() => {
                                            setShowImageChange('hidden')
                                        }}

                                    />}
                            </label>
                            {imageChangeBtn}
                        </Box>
                    </Box>
                    <Box sx={{width: {xs: '100%', md: '70%'}}}>
                        <EditProfileField
                            user={user}
                            updateUser={updateUser}
                            setUpdateUser={setUpdateUser}
                            setUpdateLocation={setUpdateLocation}
                            updateLocation={updateLocation}
                            handleSubmit={handleSubmit}
                        />
                    </Box>
                </Stack>
            </Box>
            <StickyButton/>
        </Container>
    );
};

export default UserEdit;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)
    if (!session) {
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
    const userData: IUserModel = result.data.user
    return {
        props: {
            user: userData
        }
    }
}