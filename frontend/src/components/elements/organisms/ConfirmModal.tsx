import {Dispatch, SetStateAction} from "react";
import {Backdrop, Box, Button, Fade, Modal, Typography} from "@mui/material";

type ModalProps = {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 12,
    p: 4,
};

const ConfirmModal = ({openModal, setOpenModal}: ModalProps) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={() => setOpenModal(!openModal)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openModal}>
                <Box sx={style}>
                    <h1>Here is confirming info</h1>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ConfirmModal;