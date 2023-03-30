import {Box} from "@mui/material";
import Image from "next/image";
import useWindowSize from "@/lib/hooks/useWindowSize";
import {useRouter} from "next/router";

type IconProps = {
    src: string
    buddy_id? : string
}

const BuddyIcon = ({src, buddy_id}: IconProps) => {

    const [width] = useWindowSize()
    const router = useRouter()

    return (
        <Box sx={{cursor: "pointer"}} onClick={() => {router.push(`/user/${buddy_id}`)}}>
            <Image
                src={src}
                alt="my icon"
                width={width > 600 ? 75 : 50}
                height={width > 600 ? 75 : 50}
                style={{borderRadius:"50%"}}

            />
        </Box>
    );
};

export default BuddyIcon;