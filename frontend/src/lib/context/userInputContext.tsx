import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

type userContext = {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    setName:Dispatch<SetStateAction<string>>;
    setEmail:Dispatch<SetStateAction<string>>;
    setPassword:Dispatch<SetStateAction<string>>;
    setPasswordConfirm:Dispatch<SetStateAction<string>>;
}

type Props = {
    children: ReactNode
};

const userContext = createContext({} as userContext)

export const useUserContext = () => {
    return useContext(userContext)
}

export const UserProvider = ({children}: Props) => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")

    return(
        <userContext.Provider value={{
            name,
            setName,
            email,
            setEmail,
            password,
            setPassword,
            passwordConfirm,
            setPasswordConfirm
        }}>
            {children}
        </userContext.Provider>
    )
}