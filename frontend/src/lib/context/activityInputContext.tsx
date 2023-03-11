import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {ILocation} from "@/types/ILocation";
import {IActivity} from "@/types/IActivity";
import {Genre} from "@/types/Genre";

type Props = {
    children: ReactNode
};

export interface MeetingDetail {
    meetingPoint: ILocation,
    meetingTime: Date
}

export interface IActivityContext extends IActivity {
    setTitle: Dispatch<SetStateAction<string>>
    setDate: Dispatch<SetStateAction<Date>>
    setEndDate: Dispatch<SetStateAction<Date | undefined>>
    setLocation: Dispatch<SetStateAction<ILocation >>
    setDescription: Dispatch<SetStateAction<string>>
    setMeetingDetail: Dispatch<SetStateAction<MeetingDetail>>
    setGenre: Dispatch<SetStateAction<string>>
    setSpots: Dispatch<SetStateAction<number>>
    setDuration: Dispatch<SetStateAction<string>>
    setCoverImage: Dispatch<SetStateAction<string>>
}


const activityContext = createContext({} as IActivityContext)

export const useActivityContext = () => {
    return useContext(activityContext)
}

export const ActivityProvider = ({children}: Props) => {

    const defaultDate = new Date()
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<Date>(defaultDate)
    const [endDate, setEndDate] = useState<Date>()
    const [description, setDescription] = useState<string>("")
    const [location, setLocation] = useState<ILocation>({
        type: "spot",
        address: "",
        place_id: "",
        coordinates: [0,0]
    })
    const [meetingDetail, setMeetingDetail] = useState<MeetingDetail>({
        meetingPoint: {
            type: "spot",
            address: "",
            place_id: "",
            coordinates: [0,0]
        },
        meetingTime: defaultDate
    })
    const [genre, setGenre] = useState<string>(Genre.HIKING)
    const [spots, setSpots] = useState<number>(0)
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
            meetingDetail,
            setMeetingDetail,
            genre,
            setGenre,
            spots,
            setSpots,
            duration,
            setDuration,
            coverImage,
            setCoverImage,
        }}>
            {children}
        </activityContext.Provider>
    )
}