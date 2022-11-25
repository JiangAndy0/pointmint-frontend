import { FormBusinessCode } from "./FormBusinessCode"
import { ClientAppointments } from "./ClientAppointments"
import { Header } from "../Header"

export const ClientHome = ({setPage, setBusiness, setAppointment }) => {
    return(
    <div>
        <Header setPage={setPage}/>
        <FormBusinessCode setPage={setPage} setBusiness={setBusiness} />
        <ClientAppointments
            setAppointment={setAppointment}
            setPage={setPage}
        />
    </div>
    )
}