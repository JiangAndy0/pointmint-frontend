import { useState } from "react"
import { Appointment } from "./Appointment"
import { BusinessHome } from "./BusinessHome"
import { BusinessProfileEdit } from "./BusinessProfileEdit"

export const Business = ({user, setUser}) => {
    const [page, setPage] = useState("home")
    const [tab, setTab] = useState("appointments")
    const [appointment, setAppointment] = useState("")
    return(
        <div>
            {page === 'home' && 
                <BusinessHome user={user} setPage={setPage} setTab={setTab} tab={tab} setAppointment={setAppointment}/>
            }
            {page === 'profile' && <BusinessProfileEdit user={user} setUser={setUser} setPage={setPage}/>}
            {page === 'appointment' && <Appointment appointment={appointment} setPage={setPage}/>}
        </div>
    )
}