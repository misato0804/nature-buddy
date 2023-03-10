import {ILocation} from "@/types/ILocation";
import {Genre} from "@/types/Genre";

export interface IUser {
    name: string,
    email: string,
    introduction: string,
    password?: string,
    passwordConfirm?: string,
    interests: Genre[],
    location: ILocation,
    activities: any[],
    socialMediaHandles?: Map<string, string>,
    image?: string
}
