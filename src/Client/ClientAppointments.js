import { formatTime } from "../helpers"

export const ClientAppointments = ({appointments, setLastAppointment, setPage}) => {
    return(
        <div>
            <h2>My Appointments</h2>
            {appointments.map((app, index) => 
                <article
                    onClick={() => {
                        setLastAppointment(app._id)
                        setPage('confirmation')
                    }}
                    key={`appointment${index}`}
                    style={{border: "1px solid black"}}
                >
                    <h3>{app.business.name}</h3>
                    <p>{app.category.name}</p>
                    <p>
                        {app.date.month}/{app.date.day}/{app.date.year}{" "}
                        {formatTime(app.startTime)}-
                        {formatTime(app.endTime)}
                    </p>
                </article>
            )}
        </div>
    )
}