import { useSelector } from "react-redux"
import { selectUser } from "../app/userSlice"
import { formatDate, formatTime } from "../helpers"

export const ClientAppointments = ({setAppointment, setPage}) => {
    const appointments = useSelector(selectUser).appointments
    return(
        <div id="client-appointments" className="tab-page">
            <h3>My Appointments</h3>
            {appointments.map((app, index) => 
                <article
                    className="quick-info"
                    onClick={() => {
                        setAppointment(app)
                        setPage('confirmation')
                    }}
                    key={`appointment${index}`}
                >
                    <h4>{app.business.name}</h4>
                    <p className="category">{app.category.name}</p>
                    <p>
                        {formatDate(app.date)}{" "}
                        {formatTime(app.startTime)}-
                        {formatTime(app.endTime)}
                    </p>
                </article>
            )}
        </div>
    )
}