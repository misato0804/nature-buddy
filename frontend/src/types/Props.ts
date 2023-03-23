import {IActivity} from "@/types/IActivity";

export interface IActivityProps extends IActivity {
    _id: string
}

export type EventProps = {
    activities: IActivityProps[] | undefined
}
