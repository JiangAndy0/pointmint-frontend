import { FormBusinessCode } from "./FormBusinessCode"
import { ClientAppointments } from "./ClientAppointments"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export const ClientHome = ({setPage, setBusiness, setUser, user, setLastAppointment }) => {
    return(
    <div>
        <header>
            <h1>Point<span>Mint</span></h1>
            <button>
                <FontAwesomeIcon icon={faUser} />
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