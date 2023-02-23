import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

type Location = {
    lat: number,
    lng: number
}

type Props = {
    children: ReactNode
};

/**
 * TODO: Add image
 */

type activityContext = {
    title: string,
    date: string,
    endDate: string,
    location: Location | undefined,
    destination: string,
    description: string,
    meetingPoint: Location | undefined,
    meetingTime: string,
    genre: string,
    spots: number | undefined,
    duration : string,
    setTitle: Dispatch<SetStateAction<string>>
    setDate: Dispatch<SetStateAction<string>>
    setEndDate: Dispatch<SetStateAction<string>>
    setLocation: Dispatch<SetStateAction<Location | undefined>>
    setDestination: Dispatch<SetStateAction<string>>
    setDescription: Dispatch<SetStateAction<string>>
    setMeetingPoint: Dispatch<SetStateAction<Location | undefined>>
    setMeetingTime: Dispatch<SetStateAction<string>>
    setGenre: Dispatch<SetStateAction<string>>
    setSpots: Dispatch<SetStateAction<number | undefined>>
    setDuration: Dispatch<SetStateAction<string>>
}

const activityContext = createContext({} as activityContext)

export const useActivityContext = () => {
    return useContext(activityContext)
}

export const ActivityProvider = ({children}: Props) => {

    const defaultDate = new Date().toISOString().slice(0, 10)
    const defaultTime =  new Date().toLocaleTimeString();

    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<string>(defaultDate)
    const [endDate, setEndDate] = useState<string>(defaultDate)
    const [description, setDescription] = useState<string>("")
    const [location, setLocation] = useState<Location | undefined>()
    const [destination, setDestination] = useState("")
    const [meetingPoint, setMeetingPoint] = useState<Location| undefined>()
    const [meetingTime, setMeetingTime] = useState<string>("")
    const [genre, setGenre] = useState<string>("Hiking")
    const [spots, setSpots] = useState<number | undefined>()
    const [duration, setDuration] = useState<string>("")

    return(
        <activityContext.Provider value={{
            title,
            setTitle,
            date,
            setDate,
            endDate,
            setEndDate,
            description,
            setDescription,
            location,
            setLocation,
            meetingPoint,
            setMeetingPoint,
            meetingTime,
            setMeetingTime,
            genre,
            setGenre,
            spots,
            setSpots,
            duration,
            setDuration,
            destination,
            setDestination
        }}>
            {children}
        </activityContext.Provider>
    )
}