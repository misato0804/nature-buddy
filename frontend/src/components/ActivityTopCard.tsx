import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {FC} from "react";
import Link from "next/link";
import {StaticImageData} from "next/image";

type CardProps = {
    title: string,
    activityImage: StaticImageData,
    link: string,
}

const ActivityTopCard : FC<CardProps> = ({title, activityImage, link}: CardProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/assets/images/hiking.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    <Link href={`/activities/${title}`}>{title}</Link>
                </Button>
            </CardActions>
        </Card>
    );
};

export default ActivityTopCard;