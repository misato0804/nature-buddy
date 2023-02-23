import React, {Dispatch, SetStateAction} from "react";
import {Backdrop, Box, Button, Fade, Modal, Stack, Typography} from "@mui/material";
import {useActivityContext} from "@/lib/context/activityInputContext";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import getStringDate from "@/lib/helpers/toDateString";
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

/**
 * TODO: Meetup Location
 */

type ModalProps = {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
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

const ConfirmModal = ({openModal, setOpenModal}: ModalProps) => {

    const {...activity} = useActivityContext()
    const eventDate = getStringDate(activity.date)

    const handleSubmit = async () => {
        try {
            const res = await fetch("/api/activity", {
                method: "POST",
                body: JSON.stringify({...activity}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res)
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
                    <Typography variant="h2" textAlign="center">Confirmation</Typography>
                    <Box sx={{position: "relative"}}>
                        <Box width="100%"
                             sx={{height: "10rem", backgroundColor: "#EFF2F5"}}>
                        </Box>
                        <Typography variant="h4">{activity.title}</Typography>
                        <Typography variant="h4">{eventDate}</Typography>
                        <Box sx={{display: "flex", justifyContent: "start"}}>
                            <ExploreOutlinedIcon fontSize="medium"/>
                            <Typography variant="h4">{activity.destination}</Typography>
                        </Box>
                        <Typography variant="subtitle1">Description</Typography>
                        <Typography variant="subtitle2">{activity.description}</Typography>
                    </Box>
                    <Stack direction="row">
                        <Typography variant="subtitle1">Meeting Detail</Typography>
                        <Typography variant="subtitle2">{activity.meetingTime}</Typography>
                        <Typography variant="subtitle2">{activity.title}</Typography>

                    </Stack>
                    <Stack direction={{xs: "column", md: "row"}} spacing={2}>
                        <TriggerButton color="grey" title="Back" onClick={() => setOpenModal(false)}/>
                        <TriggerButton color="green" title="Create" onClick={() => {
                        }}/>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ConfirmModal;