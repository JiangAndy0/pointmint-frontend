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
                >
                    <h3>{app.business.name}</h3>
                    <p>{app.category.name}</p>
                    <p>
                        {app.date.month}/{app.date.day}/{app.date.year}{" "}
                        {app.startTime.hr}:{app.startTime.min}{app.startTime.am ? "am" : "pm"}-
                        {app.endTime.hr}:{app.endTime.min}{app.endTime.am ? "am" : "pm"}
                    </p>
                </article>
            )}
        </div>
    )
}