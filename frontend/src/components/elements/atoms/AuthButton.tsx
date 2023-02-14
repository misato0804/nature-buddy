import {Box, Typography} from "@mui/material";
import {ReactElement} from "react";
import {SignInResponse} from "next-auth/react";

type AuthButton = {
    logo: ReactElement,
    company: string,
    color: string,
    onClick: () => Promise<SignInResponse | undefined>
}

const buttonContainerStyle = (color: string) => {
    return {
        width: "100%",
        backgroundColor: color,
        borderRadius: "20px",
        py:"0.3rem",
        color: "#fff",
        cursor: "pointer",
        "&:hover" : {
            opacity: ".8"
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}

const AuthButton = ({logo, company, color, onClick}: AuthButton) => {

    return (
        <Box sx={buttonContainerStyle(color)} onClick={onClick}>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center",}}>{logo}</Box>
            <Typography variant="subtitle1" fontWeight="700" ml={3}>Create with {company}</Typography>
        </Box>
    );
};

export default AuthButton;