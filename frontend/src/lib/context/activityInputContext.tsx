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
    date: Date,
    endDate: Date | undefined,
    location: Location | undefined,
    description: string,
    meetingPoint: Location | undefined,
    meetingTime: string,
    genre: string,
    spots: number,
    duration : string,
    setTitle: Dispatch<SetStateAction<string>>
    setDate: Dispatch<SetStateAction<Date>>
    setEndDate: Dispatch<SetStateAction<Date| undefined>>
    setLocation: Dispatch<SetStateAction<Location | undefined>>
    setDescription: Dispatch<SetStateAction<string>>
    setMeetingPoint: Dispatch<SetStateAction<Location | undefined>>
    setMeetingTime: Dispatch<SetStateAction<string>>
    setGenre: Dispatch<SetStateAction<string>>
    setSpots: Dispatch<SetStateAction<number>>
    setDuration: Dispatch<SetStateAction<string>>
}

const activityContext = createContext({} as activityContext)

export const useActivityContext = () => {
    return useContext(activityContext)
}

export const ActivityProvider = ({children}: Props) => {
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date | undefined>()
    const [description, setDescription] = useState<string>("")
    const [location, setLocation] = useState<Location | undefined>()
    const [meetingPoint, setMeetingPoint] = useState<Location| undefined>()
    const [meetingTime, setMeetingTime] = useState<string>("")
    const [genre, setGenre] = useState<string>("")
    const [spots, setSpots] = useState<number>(0)
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
        }}>
            {children}
        </activityContext.Provider>
    )
}