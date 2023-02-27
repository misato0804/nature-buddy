import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";

export type Location = {
    lat: number,
    lng: number
}

type Props = {
    children: ReactNode
};

type activityContext = {
    title: string,
    date: Date,
    endDate: Date,
    location: Location | undefined,
    destination: string,
    description: string,
    meetingPoint: Location | undefined,
    meetingTime: string,
    genre: string,
    spots: number ,
    duration : string,
    coverImage: string,
    setTitle: Dispatch<SetStateAction<string>>
    setDate: Dispatch<SetStateAction<Date>>
    setEndDate: Dispatch<SetStateAction<Date>>
    setLocation: Dispatch<SetStateAction<Location | undefined>>
    setDestination: Dispatch<SetStateAction<string>>
    setDescription: Dispatch<SetStateAction<string>>
    setMeetingPoint: Dispatch<SetStateAction<Location | undefined>>
    setMeetingTime: Dispatch<SetStateAction<string>>
    setGenre: Dispatch<SetStateAction<string>>
    setSpots: Dispatch<SetStateAction<number>>
    setDuration: Dispatch<SetStateAction<string>>
    setCoverImage: Dispatch<SetStateAction<string>>
}

const activityContext = createContext({} as activityContext)

export const useActivityContext = () => {
    return useContext(activityContext)
}

export const ActivityProvider = ({children}: Props) => {

    const defaultDate = new Date()

    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<Date>(defaultDate)
    const [endDate, setEndDate] = useState<Date>(defaultDate)
    const [description, setDescription] = useState<string>("")
    const [location, setLocation] = useState<Location | undefined>()
    const [destination, setDestination] = useState("")
    const [meetingPoint, setMeetingPoint] = useState<Location| undefined>()
    const [meetingTime, setMeetingTime] = useState<string>("")
    const [genre, setGenre] = useState<string>("Hiking")
    const [spots, setSpots] = useState<number >(0)
    const [duration, setDuration] = useState<string>("")
    const [coverImage, setCoverImage] = useState<string>("")

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
            setDestination,
            coverImage,
            setCoverImage
        }}>
            {children}
        </activityContext.Provider>
    )
}