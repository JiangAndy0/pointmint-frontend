//sort an array of appointments from earliest to latest
export const sortEarlyToLate = appArray => {
    appArray.sort((appA, appB) => {
        if(appA.startTime === appB.startTime){
            return 0
        } else if(appA.startTime < appB.startTime){ //appointment A starts before appointment B
            return -1
        } else { //appointment A starts after appointment B
            return 1
        }
    })
    appArray.sort((appA, appB) => {
        if(appA.date === appB.date){
            return 0
        } else if(appA.date < appB.date){ //appointment A starts before appointment B
            return -1
        } else { //appointment A starts after appointment B
            return 1
        }
    })
}

//takes time string in format hh:mm and converts to string time in format --:--am or --:--pm
export const formatTime = time => {
    if(time < "12:00"){
        return time + 'am'
    } else if(time < "13:00"){
        return time + 'pm'
    } else {
        const hr = parseInt(time.split(':')[0]) - 12
        return `${hr < 10 && '0'}${hr}` + time.slice(2) + 'pm'
    }
}

//takes date string in format yyyy-mm-dd and returns a date string in format mm/dd/yyyy
export const formatDate = date => {
    const parts = date.split('-')
    return `${parts[1]}/${parts[2]}/${parts[0]}`
}

const serverDevelopment = false;
//sends back different api end points based on if in production or development
export const getApi = () => {
    return serverDevelopment ? "http://localhost:5500" : "https://point-mint-backend.herokuapp.com"
}