import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

type Props = {
    children: ReactNode
};

type Location = {
    lat: number,
    lng: number
}

type userContext = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    location:Location | undefined,
    interests: string[],
    setInterests: Dispatch<SetStateAction<string[]>>,
    setLocation: Dispatch<SetStateAction<Location | undefined>>,
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
    const [location, setLocation] = useState<Location | undefined>()
    const [interests, setInterests] = useState<string[]>([])

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