import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {ILocation} from "@/types/ILocation";
import {Genre} from "@/types/Genre";

type Props = {
    children: ReactNode
};


type userContext = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    location:ILocation,
    interests: Genre[],
    setInterests: Dispatch<SetStateAction<Genre[]>>,
    setLocation: Dispatch<SetStateAction<ILocation >>,
    setName:Dispatch<SetStateAction<string>>,
    setEmail:Dispatch<SetStateAction<string>>,
    setPassword:Dispatch<SetStateAction<string>>,
    setPasswordConfirm:Dispatch<SetStateAction<string>>,
}

const userContext = createContext({} as userContext)

export const useUserContext = () => {
    return useContext(userContext)
}

export const UserProvider = ({children}: Props) => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")
    const [location, setLocation] = useState<ILocation>({
        type: "spot",
        address: "",
        place_id: "",
        coordinates: [0,0]
    })
    const [interests, setInterests] = useState<Genre[]>([])

    return(
        <userContext.Provider value={{
            name,
            setName,
            email,
            setEmail,
            password,
            setPassword,
            passwordConfirm,
            setPasswordConfirm,
            location,
            setLocation,
            interests,
            setInterests
        }}>
            {children}
        </userContext.Provider>
    )
}