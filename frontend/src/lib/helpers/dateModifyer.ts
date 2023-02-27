const modifier = (date: string) => {
    const year = Number(date.slice(0, 4))
    const month = Number(date.slice(5, 7))
    const day = Number(date.slice(8,10))
    const result = new Date(year, month-1, day)
    return result
}

const getDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}-0${month}-${day}`
}

const dateValidation = (start: string, end: string) => {
    const dates = start.split("-")
    const endDates = end.split("-")
    const startDate = Number(dates[0]+dates[1]+dates[2])
    const endDate = Number(endDates[0]+endDates[1]+endDates[2])
    console.log(Number(endDate) - Number(startDate))
    return Number(endDate) - Number(startDate)
}

export {modifier, getDate, dateValidation}
