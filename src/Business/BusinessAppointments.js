import { formatDate, formatTime } from "../helpers"
export const BusinessAppointments = ({appointments, setPage, setAppointment}) => {
    return(
        <div>
            {appointments
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
                        {formatDate(app.date)}{" "}
                        {formatTime(app.startTime)}-
                        {formatTime(app.endTime)}
                        </p>
                    </article>
                )
            }
        </div>
    )
}