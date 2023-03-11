import {Box, Typography} from "@mui/material";
import {FC} from "react";
import Link from "next/link";
import Image, {StaticImageData} from "next/image";

type CardProps = {
    title: string,
    activityImage: StaticImageData,
    link: string,
}


const ActivityTopCard: FC<CardProps> = ({title, activityImage}: CardProps) => {
    return (
        <Box>
            <Box sx={{width:{xs:250, md:350}}}>
                <Image
                    priority
                    src={activityImage}
                    alt={title}
                    style={{ width: '100%', height: 'auto', borderRadius: "25px"}}
                    width="0"
                    height="0"
                />
            </Box>
            <Link href={"/[genre]/" + title.toLocaleLowerCase()} style={{textDecoration:"none", color: "black"}}>
                <Typography variant="h4">{title}</Typography>
            </Link>
        </Box>
    );
};

export default ActivityTopCard;