import {ILocation} from "@/types/ILocation";

export interface IActivity {
    title: string,
    date : Date,
    endDate? : Date,
    description: string,
    location: ILocation,
    meetingDetail: {
        meetingPoint: ILocation,
        meetingTime: Date
    },
    genre: string,
    spots: number,
    duration: string,
    coverImage: string,
    host?: any,
    buddies?: any[],
    available?: boolean,
}