import { FormBusinessCode } from "./FormBusinessCode"
import { ClientAppointments } from "./ClientAppointments"
import { Header } from "../Header"

export const ClientHome = ({setPage, setBusiness, setUser, user, setAppointment }) => {
    return(
    <div>
        <Header setPage={setPage}/>
        <FormBusinessCode setPage={setPage} setBusiness={setBusiness} />
        <ClientAppointments
            appointments={user.appointments}
            setAppointment={setAppointment}
            setUser={setUser}
            setPage={setPage}
        />
    </div>)
}