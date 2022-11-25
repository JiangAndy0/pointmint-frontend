import { useState } from "react"

import { ClientHome } from "./ClientHome"
import { ClientProfileEdit } from "./ClientProfileEdit"
import { Confirmation } from "./Confirmation"
import { MakeAppointment } from "./MakeAppointment"

export const Client = () => {
    const [page, setPage] = useState("home")
    const [business, setBusiness] = useState()
    const [appointment, setAppointment] = useState()

    return (
        <div>
            {page === 'home' && 
                <ClientHome
                    setPage={setPage}
                    setBusiness={setBusiness}
                    setAppointment={setAppointment}
                />
            }
            {(page === 'makeAppointment' || page === 'editAppointment') && 
                <MakeAppointment 
                    setPage={setPage} 
                    setAppointment={setAppointment}
                    business={business} 
                    app={page === 'editAppointment' && appointment}
                />
            }
            {page === 'confirmation' && 
                <Confirmation 
                    appointment={appointment} 
                    setPage={setPage}
                    setBusiness={setBusiness}
                />
            }
            {page === 'profile' && 
                <ClientProfileEdit 
                    setPage={setPage}
                />
            }
        </div>
    )
}