import {IActivityProps} from "@/types/Props";

const sortByDate = (activities: IActivityProps[]) => {
    const sortedArr = activities.sort((itemA, itemB) => {
        const dateA = new Date(itemA.date).getTime()
        const dateB = new Date(itemB.date).getTime()
        return dateA - dateB
    })

    return sortedArr
}

export default sortByDate