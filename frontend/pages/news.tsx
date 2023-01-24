import { getSession, useSession } from "next-auth/react";
import {GetServerSideProps, GetStaticProps} from 'next';

type Data = {
    data: string
}

const News = ({ data } : Data) => {

    const { data: session} = useSession();
    console.log({session});
    return (
        <div>
            <h1>Blog Page { data }</h1>
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