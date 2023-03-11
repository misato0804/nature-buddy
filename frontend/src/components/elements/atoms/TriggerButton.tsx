import {Box, Typography} from "@mui/material";
import Link from "next/link";
import React from "react";

type LinkButton = {
    title: string,
    color: string,
    onClick?: (() => void) | ((e: React.MouseEvent<HTMLElement>) => Promise<void>),
    style? : object
}

const TriggerButton = ({title, color, onClick, style}: LinkButton) => {

    const buttonContainerStyle = (color: string) => {
        return {
            width: "100%",
            backgroundColor: color,
            borderRadius: "20px",
            py: "0.3rem",
            color: "#fff",
            cursor: "pointer",
            "&:hover": {
                opacity: ".8"
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...style
        }
    }

    return (
        <Box sx={buttonContainerStyle(color)} onClick={onClick}>
            <Typography variant="subtitle1" fontWeight="700">{title}</Typography>
        </Box>
    );
};

export default TriggerButton;