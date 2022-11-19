import { useState } from "react"

import { ClientHome } from "./ClientHome"
import { ClientProfileEdit } from "./ClientProfileEdit"
import { Confirmation } from "./Confirmation"
import { MakeAppointment } from "./MakeAppointment"

export const Client = ({ user, setUser }) => {
    const [page, setPage] = useState("home")
    const [business, setBusiness] = useState()
    const [appointment, setAppointment] = useState()

    return (
        <div>
            {page === 'home' && 
                <ClientHome
                    setPage={setPage}
                    setBusiness={setBusiness}
                    setUser={setUser}
                    user={user}
                    setAppointment={setAppointment}
                />
            }
            {(page === 'makeAppointment' || page === 'editAppointment') && 
                <MakeAppointment 
                    setPage={setPage} 
                    setUser={setUser}
                    setAppointment={setAppointment}
                    business={business} 
                    clientId={user._id}
                    app={page === 'editAppointment' && appointment}
                />
            }
            {page === 'confirmation' && 
                <Confirmation 
                    appointment={appointment} 
                    setUser={setUser} 
                    setPage={setPage}
                    setBusiness={setBusiness}
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