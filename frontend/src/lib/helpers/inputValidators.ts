import {Location} from "@/lib/context/activityInputContext";

const titleValidator = (title: string) => {
    return title.length < 5 || title.length > 50;
}

const dateValidator = (date: string) => {
    return date !== null;
}

const locationValidator = (location: Location | undefined) => {
    return location !== undefined
}

const descriptionValidator = (description: string) => {
    return description.length < 10 || description.length > 800
}

const durationValidator = (duration: string) => {
    return duration.length < 2
}

const meetingPointValidation = (point: Location) => {
    return point !== null
}

const meetingTimeValidation = (time: string) => {
    return time.length !== 0
}

const spotsValidation = (spots: number) => {
    return spots !== 0
}


export {
    titleValidator,
    dateValidator,
    locationValidator,
    descriptionValidator,
   durationValidator,
    meetingPointValidation,
    meetingTimeValidation,
    spotsValidation,

}