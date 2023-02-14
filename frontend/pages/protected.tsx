import {useSession, getSession, signIn} from "next-auth/react";
import {useEffect, useState} from "react";

const Protected = () => {
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState<string | null | undefined>("")

    useEffect(()=>{
        const securePage = async () => {
            const session = await getSession()
            console.log(session)
            if(!session) {
                signIn()
            } else {
                setLoading(false)
                setName(session.user?.name)
            }
        }
        securePage()
    }, [])

    if(loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            Protected <h1>{name}</h1>
        </div>
    );
};

export default Protected;