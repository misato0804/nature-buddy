import {ILocation} from "@/types/ILocation";
import {Genre} from "@/types/Genre";
import {IActivity} from "@/types/IActivity";
import {INotification} from "@/types/INotification";

export type socialMediaType = {
    link: string
}

export type socialMedias = {
    Twitter?: socialMediaType,
    Instagram?: socialMediaType,
    Facebook?: socialMediaType
}

export type Notifications = {
    sent : [INotification],
    received : [INotification]
}

export interface IUser {
    name: string,
    email: string,
    introduction?: string,
    password?: string,
    passwordConfirm?: string,
    interests: Genre[],
    location: ILocation,
    socialMediaHandles?: socialMedias,
    image?: string | null,
    hostedActivities? : IActivity[],
    joinedActivities? : IActivity[],
    favouriteActivities?: IActivity[],
    notifications?: Notifications
}
