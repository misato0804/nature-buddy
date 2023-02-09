import {Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {FC} from "react";
import Link from "next/link";
import Image, {StaticImageData} from "next/image";
import {auto} from "@popperjs/core";

type CardProps = {
    title: string,
    activityImage: StaticImageData,
    link: string,
}


const ActivityTopCard: FC<CardProps> = ({title, activityImage, link}: CardProps) => {
    return (
        <>
            <Box sx={{width: "300px"}}>
                <Image
                    src={activityImage}
                    alt={title}
                    width={300}
                />
            </Box>
            <Link href={title} style={{textDecoration:"none", color: "black"}}>
                <Typography variant="h4">{title}</Typography>
            </Link>
        </>
    );
};

export default ActivityTopCard;