import React, {Dispatch, SetStateAction, useEffect} from "react";
import {Backdrop, Box, Fade, Modal, Stack, Typography} from "@mui/material";
import {useActivityContext} from "@/lib/context/activityInputContext";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import DepartureBoardOutlinedIcon from '@mui/icons-material/DepartureBoardOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ConfirmationCard from "@/components/elements/atoms/ConfirmationCard";
import AvTimerOutlinedIcon from '@mui/icons-material/AvTimerOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import HikingOutlinedIcon from '@mui/icons-material/HikingOutlined';
import {getDate} from "@/lib/helpers/dateModifyer";
import {ILocation} from "@/types/ILocation";
import {IActivity} from "@/types/IActivity";
import {useRouter} from "next/router";
import {ObjectId, Types} from "mongoose";
import {useSession} from "next-auth/react";

type ModalProps = {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
    uploadDate?: string,
    fileData?: FileList | undefined,
    meetingPoint: ILocation,
    meetingTime: string,
    userId: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: "80%", md: "70%", lg: "60%"},
    bgcolor: 'background.paper',
    boxShadow: 12,
    p: 4,

};

const ConfirmModal = ({openModal, setOpenModal, uploadDate, fileData, meetingPoint, meetingTime, userId}: ModalProps) => {
    const {data: session} = useSession()
    const {...activity} = useActivityContext()
    const eventDate = getDate(activity.date)
    const router = useRouter()

    useEffect(() => {
        activity.setMeetingDetail({
            ...activity.meetingDetail,
            meetingPoint
        })
    }, [meetingPoint])

    useEffect(() => {
        const uploadData = async () => {
            const formData = new FormData()
            fileData && formData.append("file", fileData[0])
            formData.append('upload_preset', 'nature-buddy')
            const resFromCloudinary = await fetch("https://api.cloudinary.com/v1_1/dpbmhiqim/image/upload", {
                method: "POST",
                body: formData
            })
            const fileDataRes = await resFromCloudinary.json()
            await activity.setCoverImage(fileDataRes.secure_url)
        }

        fileData !== undefined && uploadData()
    }, [fileData])


    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const newEvent: IActivity = {
                ...activity,
                host: new Types.ObjectId(userId as string)
            }
            const res = await fetch("/api/activity/create", {
                method: "POST",
                body: JSON.stringify({newEvent, email: session?.user?.email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.status === 200) {
                activity.setTitle('')
                activity.setDate(new Date())
                activity.setEndDate(new Date())
                activity.setDescription('')
                activity.setDuration('')
                activity.setMeetingDetail({
                    meetingPoint: {
                        type: "spot",
                        address: "",
                        place_id: "",
                        coordinates: [0,0]
                    },
                    meetingTime: new Date()
                })
                activity.setGenre('')
                activity.setSpots(0)
                activity.setCoverImage('')
                await router.push(`/`)
            }
        } catch (e: any) {
            console.log(e)
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={() => setOpenModal(!openModal)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 400,
            }}
        >
            <Fade in={openModal}>
                <Box sx={style}>
                    <Box sx={{height: "70vh", overflow: "scroll"}}>
                        <Typography variant="h2">{activity.title}</Typography>
                        <Typography variant="h4" display="flex" textAlign="center"><CalendarMonthOutlinedIcon
                            sx={{mr: 1}}/>{eventDate}</Typography>
                        <Box sx={{position: "relative"}}>
                            <Box width="100%"
                                 sx={{height: "10rem", backgroundColor: "#EFF2F5", my: 2}}>
                                <img src={uploadDate} style={{objectFit: "cover", width: "100%", "height": "100%"}}
                                     alt="cover image"/>
                            </Box>
                            <Box sx={{display: "flex", justifyContent: "start"}}>
                                <PlaceOutlinedIcon fontSize="medium" sx={{mr: 1}}/>
                                <Typography variant="h4">Destination</Typography>
                            </Box>
                            <Typography variant="subtitle2" pl={4}>{activity.location?.address}</Typography>
                            <Stack direction="column" my={2}>
                                <Typography variant="h4"
                                            sx={{display: "flex", alignItems: "center"}}><DepartureBoardOutlinedIcon
                                    sx={{mr: 1}}/>Meeting
                                    Detail</Typography>
                                <Typography variant="subtitle2"
                                            sx={{pl: 4}}>{activity.date.toLocaleDateString()}</Typography>
                                <Typography variant="subtitle2" sx={{pl: 4}}>{meetingTime}</Typography>
                                <Typography variant="subtitle2" sx={{pl: 4}}>
                                    <a rel='noopener noreferrer'
                                       href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${meetingPoint.place_id}`}
                                       target="_blank">{meetingPoint.address}</a>
                                </Typography>
                            </Stack>
                            <Typography variant="h4" sx={{display: "flex", alignItems: "center"}}><InfoOutlinedIcon
                                sx={{mr: 1}}/>Description</Typography>
                            <Typography variant="subtitle2" pl={4} mb={4}>{activity.description}</Typography>
                        </Box>
                        <Stack width="60%" direction="row" marginX="auto" justifyContent="space-between" mb={4}>
                            <ConfirmationCard title="Spots" detail={activity.spots.toString()}
                                              logo={<Groups2OutlinedIcon/>}/>
                            <ConfirmationCard title="Duration" detail={activity.duration}
                                              logo={<AvTimerOutlinedIcon/>}/>
                            <ConfirmationCard title="Genre" detail={activity.genre} logo={<HikingOutlinedIcon/>}/>
                        </Stack>
                    </Box>
                    <Stack direction={{xs: "column", md: "row"}} spacing={2}>
                        <TriggerButton color="grey" title="Back" onClick={() => setOpenModal(false)}/>
                        <TriggerButton color="green" title="Create" onClick={handleSubmit}/>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ConfirmModal;