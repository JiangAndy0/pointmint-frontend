import { formatTime } from "../helpers"
export const BusinessAppointments = ({user, setPage, setAppointment}) => {
    return(
        <div>
            {user.appointments
                .filter(app => Boolean(app.client))
                .map((app, index) => 
                    <article 
                        key={`app${index}`}
                        style={{border: "1px solid black"}}
                        onClick={() => {
                            setAppointment(app)
                            setPage('appointment')
                        }}
                    >
                        <h3>{app.client.firstName} {app.client.lastName}</h3>
                        <p>{app.category.name}</p>
                        <p>
                        {app.date.month}/{app.date.day}/{app.date.year}{" "}
                        {formatTime(app.startTime)}-
                        {formatTime(app.endTime)}
                        </p>
                    </article>
                )
            }
        </div>
    )
}