import {Genre} from "./Genre";
import {ILocation} from "./ILocation";

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
    image?: string,
    hostedActivity? : string[],
    joinedActivity? : string[]
}
