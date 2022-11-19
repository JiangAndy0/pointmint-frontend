import { FormBusinessCode } from "./FormBusinessCode"
import { ClientAppointments } from "./ClientAppointments"
import { Header } from "../Header"

export const ClientHome = ({setPage, setBusiness, setUser, user, setLastAppointment }) => {
    return(
    <div>
        <Header setPage={setPage}/>
        <FormBusinessCode setPage={setPage} setBusiness={setBusiness} />
        <ClientAppointments
            appointments={user.appointments}
            setLastAppointment={setLastAppointment}
            setUser={setUser}
            setPage={setPage}
        />
    </div>)
}