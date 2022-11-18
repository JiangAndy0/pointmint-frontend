import { useState } from "react"

import { ClientHome } from "./ClientHome"
import { ClientProfileEdit } from "./ClientProfileEdit"
import { Confirmation } from "./Confirmation"
import { MakeAppointment } from "./MakeAppointment"



export const Client = ({ user, setUser }) => {
    const [page, setPage] = useState("default")
    const [business, setBusiness] = useState()
    const [lastAppointment, setLastAppointment] = useState()

    return (
        <div>
            {page === 'default' && 
                <ClientHome
                    setPage={setPage}
                    setBusiness={setBusiness}
                    setUser={setUser}
                    user={user}
                    setLastAppointment={setLastAppointment}
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
                <Confirmation 
                    appointmentId={lastAppointment} 
                    user={user} 
                    setUser={setUser} 
                    setPage={setPage}
                />
            }
            {page === 'profile' && 
                <ClientProfileEdit 
                    user={user}
                    setUser={setUser}
                    setPage={setPage}
                />
            }
        </div>
    )
}