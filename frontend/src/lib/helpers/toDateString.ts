const getStringDate = (date: string) : string => {

    const year = Number(date.slice(0, 4))
    const month = Number(date.slice(5, 7))
    const day = Number(date.slice(8,10))

    const dateStr = new Date(year, month - 1, day -1).toDateString()
    return dateStr
}

export default getStringDate