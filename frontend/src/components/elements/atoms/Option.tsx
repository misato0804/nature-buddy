import {Box, Grid, Typography} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import {useUserContext} from "@/lib/context/userInputContext";
import {Genre} from "@/types/Genre";

type OptionProps = {
    title: string,
}

const Option = ({title}: OptionProps) => {
    const {interests, setInterests} = useUserContext()
    const hasInterest = interests.includes(title as any)
    const [bgColor, setBgColor] = useState(hasInterest ? 'green' :'grey')

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const activity = e.currentTarget.innerText as Genre
        bgColor === 'grey' ? setBgColor('green') : setBgColor('grey')
        interests.includes(activity) ? setInterests(interests.filter(interest => interest !== activity)) : setInterests([...interests, activity])
    }
    return (
        <Grid
            item
            onClick={clickHandler}
            sx={{
                cursor: "pointer",
                background: bgColor,
                borderRadius: "25px",
                color: "#fff",
                px: "1.2rem",
                py: ".5rem",
                mr: ".3rem",
                mb: ".3rem"
            }}>
            <Typography variant="subtitle2" textAlign="center">{title}</Typography>
        </Grid>
    );
};

export default Option;