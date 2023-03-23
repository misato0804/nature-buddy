import {ILocation} from "@/types/ILocation";
import {Genre} from "@/types/Genre";
import {IActivity} from "@/types/IActivity";

export interface IUser {
    name: string,
    email: string,
    introduction?: string,
    password?: string,
    passwordConfirm?: string,
    interests: Genre[],
    location: ILocation,
    // activities?: IActivity[],
    socialMediaHandles?: Map<string, string>,
    image?: string | null,
    hostedActivities? : IActivity[],
    joinedActivities? : IActivity[],
    favouriteActivities?: IActivity[],
}
