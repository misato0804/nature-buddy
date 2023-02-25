import {Box, Typography} from "@mui/material";
import {ReactNode} from "react";

type CardProps = {
    title: string,
    detail: string,
    logo: ReactNode
}

const ConfirmationCard = ({title, detail, logo}: CardProps) => {
    return (
        <Box sx={{backgroundColor: "#DCDCDC", py:2, px:2, borderRadius:"5px", color:"#707070"}}>
            <Typography variant='h6' textAlign="center">{title}</Typography>
            <Box sx={{display:"flex", justifyContent:"center", my:1.2}}>{logo}</Box>
            <Typography variant='h6' textAlign="center">{detail}</Typography>
        </Box>
    );
};

export default ConfirmationCard;