import {useRouter} from "next/router";
import {Typography} from "@mui/material";
import {useSession} from "next-auth/react";

const User = ({user}: any) => {

    //user page

    const {query} = useRouter()
    console.log(query)
    console.log(user)


    return (
        <div style={{backgroundColor: "green"}}>
            <Typography variant="h2">Hello</Typography>
            <Typography variant="h2">Hello</Typography>
            <Typography variant="h2">Hello</Typography>
            <Typography variant="h2">Hello</Typography>
            <Typography variant="h2">Hello</Typography>
            {user.name}
        </div>
    );
};

export default User;

export async function getServerSideProps() {


    const res = await fetch('http://localhost:3000/api/user/640046988dbaa4a6bfae6a15')
    const user = await res.json()

    console.log(user)
    return {
        props: {
            user: user.data
        }
    }
}
