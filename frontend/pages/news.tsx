import { getSession, useSession } from "next-auth/react";
import {GetServerSideProps, GetStaticProps} from 'next';
import {Button} from "@mui/material";

type Data = {
    data: string
}

const News = ({ data } : Data) => {

    const { data: session} = useSession();
    console.log({session});
    return (
        <div>
            <h1>Blog Page { data }</h1>
            <Button variant="contained" color="error" size="small">Super</Button>
        </div>
    );
};

export default News;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if(!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            session,
            data: session ? "List of data" : "Free data"
        }
    }
}