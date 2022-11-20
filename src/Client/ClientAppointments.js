import { formatDate, formatTime } from "../helpers"

export const ClientAppointments = ({appointments, setAppointment, setPage}) => {
    return(
        <div>
            <h2>My Appointments</h2>
            {appointments.map((app, index) => 
                <article
                    onClick={() => {
                        setAppointment(app)
                        setPage('confirmation')
                    }}
                    key={`appointment${index}`}
                    style={{border: "1px solid black"}}
                >
                    <h3>{app.business.name}</h3>
                    <p>{app.category.name}</p>
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