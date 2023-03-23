import React, {useState} from 'react';
import {Backdrop, Box, Fade, Modal, Stack, Typography} from "@mui/material";
import {useRouter} from "next/router";
import TriggerButton from "@/components/elements/atoms/TriggerButton";
import CloseIcon from '@mui/icons-material/Close';

type modalProps = {
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({openModal, setOpenModal}: modalProps) => {
    const router = useRouter()

    const styleInModal = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs: "80%", md: "70%", lg: "60%"},
        bgcolor: 'background.paper',
        boxShadow: 12,
        p: 4,

    };

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
                <Box sx={styleInModal}>
                    <CloseIcon
                        onClick={() => {setOpenModal(false)}}
                        sx={{cursor:'pointer', position:'absolute', top:20, right:20}}
                    />
                    <Typography variant='h2' textAlign='center' >Nature Buddy</Typography>
                    <Typography variant='subtitle1' textAlign='center' mb={4}>To see profile page, please login or signup</Typography>
                    <Typography variant='subtitle1' textAlign='center' mb={1}>Already a member?</Typography>
                    <TriggerButton title="Go to login page" color='green' onClick={() => {
                        router.push('/login')
                    }}/>
                    <Typography variant='subtitle1' textAlign='center' mb={1} mt={4}>Are you a new member?</Typography>
                    <TriggerButton title="Go to sign up page" color='blue' onClick={() => {
                        router.push('/signup')
                    }}/>

                </Box>
            </Fade>
        </Modal>
    );
};

export default LoginModal;