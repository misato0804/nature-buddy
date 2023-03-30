const getThisSunday = () => {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();　
    let date = today.getDate();
    let ofTheWeek = today.getDay();
    let thisSunday = date - ofTheWeek + 7;

    let endDate = new Date(thisYear, thisMonth, thisSunday,23,59,59,999);
    return endDate.getTime()
}

const getTomorrow = () => {
    let today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow
}

const getNextWeekend = () => {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();
    let date = today.getDate();
    let ofTheWeek = today.getDay();
    let thisSunday = date - ofTheWeek + 14;
    let endDate = new Date(thisYear, thisMonth, thisSunday,23,59,59,999);
    return endDate.getTime()
}

export {getThisSunday, getTomorrow, getNextWeekend}