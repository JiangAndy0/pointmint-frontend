import { useState } from "react"
import { FormBusinessCode } from "./FormBusinessCode"
import { ClientAppointments } from "./ClientAppointments"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export const ClientHome = ({setPage, setBusiness, setUser, user, setLastAppointment }) => {
    const [dropDown, setDropDown] = useState(false)
    return(
    <div>
        <header>
            <h1>Point<span>Mint</span></h1>
            <button
                onClick={e => {
                    e.preventDefault()
                    setDropDown(!dropDown)
                }} 
            >
                <FontAwesomeIcon icon={faUser} />
                {dropDown && 
                    <div>
                        <p onClick={() => setPage('profile')}>Profile</p>
                        <p onClick={() => window.location.reload()}>Logout</p>
                    </div>
                } 
            </button>
        </header>
        <FormBusinessCode setPage={setPage} setBusiness={setBusiness} />
        <ClientAppointments
            appointments={user.appointments}
            setLastAppointment={setLastAppointment}
            setUser={setUser}
            setPage={setPage}
        />
    </div>)
}