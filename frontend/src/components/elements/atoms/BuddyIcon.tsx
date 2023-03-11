import {Box} from "@mui/material";
import Image from "next/image";
import useWindowSize from "@/lib/hooks/useWindowSize";

type IconProps = {
    src: string
}

const BuddyIcon = ({src}: IconProps) => {

    const [width] = useWindowSize()

    return (
        <Box sx={{cursor: "pointer"}}>
            <Image
                src="https://res.cloudinary.com/dpbmhiqim/image/upload/v1677308198/cld-sample-5.jpg"
                alt="my icon"
                width={width > 600 ? 75 : 50}
                height={width > 600 ? 75 : 50}
                style={{borderRadius:"50%"}}
            />
        </Box>
    );
};

export default BuddyIcon;