import { GetServerSideProps } from 'next'

const usertop = ({data}: any) => {

    console.log(data)

    return (
        <div>

        </div>
    );
};

export default usertop;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const res = await fetch("http://localhost:3000/api/user/user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: "tanno20000@gmail.com",
            password: "123456789"
        })
    })
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}