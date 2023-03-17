import {Box} from "@mui/material";
import Image, {StaticImageData} from "next/image";

type FormProps = {
    image: StaticImageData,
    childComponent: JSX.Element,
}

const containerStyle = {
    position: "relative",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: {xs: 12, sm: 5}
}

const innerStyle = {
    zIndex: -1,
    position: "absolute",
    width: "100vw",
    height: "80vh",
}

const childStyle = {
    backgroundColor: "#fff",
    borderRadius: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: {
        xs: "80%",
        md: "40%"
    },
    px: "12px",
    py: "24px"
}

const FormTemplate = ({image, childComponent}: FormProps) => {
    return (
        <Box component="main" sx={containerStyle}>
            <Box sx={innerStyle}>
                <Image
                    src={image}
                    alt="mountain"
                    style={{objectFit: "cover"}}
                    priority
                    sizes="100vw"
                    fill
                />
            </Box>
            <Box sx={childStyle}>
                {childComponent}
            </Box>
        </Box>
    );
};

export default FormTemplate;