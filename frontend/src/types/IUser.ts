import {ILocation} from "@/types/ILocation";
import {Genre} from "@/types/Genre";


export type SocialMediaLinks = [
    twitter?: string,
    instagram?: string,
    facebook?: string,
]

export interface IUser {
    name: string,
    email: string,
    description: string,
    password?: string,
    passwordConfirm?: string,
    interests: Genre[],
    location: ILocation,
    activities: any[],
    socialMediaHandles?: Map<string, string>,
}
