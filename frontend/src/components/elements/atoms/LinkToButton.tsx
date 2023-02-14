import {Box, Typography} from "@mui/material";
import Link from "next/link";

type LinkButton = {
    title: string,
    color: string,
    linkTo: string
}

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
    }
}

const LinkToButton = ({title, color, linkTo}: LinkButton) => {

    return (
        <Box sx={buttonContainerStyle(color)}>
            <Link href={`/${linkTo}`}>
                <Typography variant="subtitle1" fontWeight="700" ml={3}>{title}</Typography>
            </Link>
        </Box>
    );
};

export default LinkToButton;