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

const getTime = (time: string, date: Date) => {
    const currentTime = date.toISOString().substring(11,16)
    console.log(currentTime)
    return currentTime
}

const dateValidation = (start: string, end: string) => {
    const dates = start.split("-")
    const endDates = end.split("-")
    const startDate = Number(dates[0]+dates[1]+dates[2])
    const endDate = Number(endDates[0]+endDates[1]+endDates[2])
    return Number(endDate) - Number(startDate)
}

const getCurrentTime = () => {
    const today = new Date()
    let time = today.getHours() + ":" + today.getMinutes()
    return time
}

const stringToDate = (date: string, time: string) => {
    const year = Number(date.slice(0,4))
    const month = Number(date.slice(5, 7)) -1
    const day = Number(date.slice(8, 11))
    const hours = Number(time.slice(0,2))
    const mins = Number(time.slice(3,5))
    const result = new Date(year, month, day, hours, mins)
    return result
}

export {modifier, getDate, dateValidation, getTime, getCurrentTime, stringToDate}
