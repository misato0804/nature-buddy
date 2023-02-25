import React, {Dispatch, SetStateAction, useState} from 'react';
import {Backdrop, Box, Fade, Modal, Stack, Typography} from "@mui/material";

type ModalProps = {
    openImageModal: boolean,
    setOpenImageModal: Dispatch<SetStateAction<boolean>>
}

const ImageConfirmModal = ({openImageModal, setOpenImageModal} : ModalProps) => {

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

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openImageModal}
            onClose={() => setOpenImageModal(!openImageModal)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 400,
            }}
        >
            <Fade in={openImageModal}>
                <Box sx={style}>

                </Box>
            </Fade>
        </Modal>
    );
};

export default ImageConfirmModal;