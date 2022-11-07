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