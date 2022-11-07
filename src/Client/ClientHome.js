import { useState } from "react"
import { ClientAppointments } from "./ClientAppointments"
import { Confirmation } from "./Confirmation"

import { FormBusinessCode } from "./FormBusinessCode"
import { MakeAppointment } from "./MakeAppointment"

export const ClientHome = ({ user, setUser }) => {
    const [page, setPage] = useState("default")
    const [business, setBusiness] = useState()
    const [lastAppointment, setLastAppointment] = useState()

    return (
        <div>
            {page === 'default' && <h1>Point<span>Mint</span></h1>}
            {page === 'default' && <FormBusinessCode setPage={setPage} setBusiness={setBusiness}/>}
            {page === 'default' && 
                <ClientAppointments 
                    appointments={user.appointments} 
                    setLastAppointment={setLastAppointment}
                    setPage={setPage}
                />
            }
            {page === 'makeAppointment' && 
                <MakeAppointment 
                    setPage={setPage} 
                    setUser={setUser}
                    setLastAppointment={setLastAppointment}
                    business={business} 
                    clientId={user._id}
                />
            }
            {page === 'confirmation' && 
                <Confirmation appointmentId={lastAppointment} user={user} setPage={setPage}/>
            }
        </div>
    )
}