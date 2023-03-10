import React from 'react';
import {Typography} from "@mui/material";

const Buddies = () => {
    return (
        <div>
           <Typography variant="h1">Buddy</Typography>
           <Typography variant="h1">Buddy</Typography>
           <Typography variant="h1">Buddy</Typography>
        </div>
    );
};

export default Buddies;

export async function getServerSideProps() {


}

