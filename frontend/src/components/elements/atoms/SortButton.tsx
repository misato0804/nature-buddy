import {Box, Typography} from "@mui/material";
import {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

type SortButtonProps = {
    title: string,
    sortedByArr: string[]
}

const SortButton = ({title,sortedByArr}: SortButtonProps) => {

    const [clicked, setClicked] = useState<boolean>(false)

    const containerStyle = {
        display: "flex",
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "#E5E4E2",
        borderRadius: "25px",
        py:"0.3rem",
        position:"relative",
        width:"100%",
        zIndex:"100",
    }

    const clickSortHandler = () => {

    }

    return (
        <Box sx={containerStyle} onClick={() => setClicked(!clicked)}>
            <Typography variant="subtitle1" fontWeight="500">{title}</Typography>
            {clicked ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            <Box sx={{display :clicked ? "block" : "none", boxShadow: 4, backgroundColor:"#fff",position:"absolute", top:45, py:2, width:"100%", zIndex:"101"}}>
                {sortedByArr.map(item =>
                    <Typography
                        color="grey"
                        key={item}
                        onClick={() => {}}
                        sx={{px:3, py:1.2, cursor:"pointer", ":hover":{backgroundColor:"#E5E4E2"}}}
                    >{item}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default SortButton;