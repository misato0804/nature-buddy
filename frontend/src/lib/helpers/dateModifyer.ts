const modifier = (date: string) => {
    const year = date.toString().slice(0, 4)
    const month = date.toString().slice(5, 7)
    const day = date.toString().slice(8,10)
    return new Date(Number(year), Number(month) - 1, Number(day))
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
    return Number(endDate) - Number(startDate)
}

export {modifier, getDate, dateValidation}
