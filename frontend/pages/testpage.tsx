import {InferGetStaticPropsType} from "next";

type User = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
}

const TestPage = ({users}: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log(users)
    return (
        <div>
            <h1>Hello</h1>
            { users.map( (user: User) => (<h1 key={user.email}>{user.name}</h1>)) }
        </div>
    );
};

export default TestPage;

export async function getStaticProps(){
    const res = await fetch("http://localhost:3000/api/test")
    const users = await res.json()
    console.log(users)
    return {
        props: {
            users
        }
    }
}

