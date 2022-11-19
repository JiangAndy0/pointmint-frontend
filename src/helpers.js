//sort an array of appointments from earliest to latest
export const sortEarlyToLate = appArray => {
    appArray.sort((appA, appB) => appA.startTime.min - appB.startTime.min)
    appArray.sort((appA, appB) => appA.startTime.hr - appB.startTime.hr)
    appArray.sort((appA, appB) => {
        if(appA.startTime.am === appB.startTime.am){
            return 0
        } else if(appA.startTime.am && !appB.startTime.am){ //appointment A starts before appointment B
            return -1
        } else { //appointment A starts after appointment B
            return 1
        }
    })
    appArray.sort((appA, appB) => appA.date.day - appB.date.day)
    appArray.sort((appA, appB) => appA.date.month - appB.date.month)
    appArray.sort((appA, appB) => appA.date.year - appB.date.year)
}

//takes time object and converts to string time in format --:--am or --:--pm
export const formatTime = time => {
    let min
    if(time.min < 10){ //minutes less than 10 need a helping 0 in the front
        min = `0${time.min}`
    } else {
        min = time.min
    }
    return `${time.hr}:${min}${time.am ? 'am' : 'pm'}`
}

const serverDevelopment = false;
//sends back different api end points based on if in production or development
export const getApi = () => {
    return serverDevelopment ? "http://localhost:5500" : "https://point-mint-backend.herokuapp.com"
}