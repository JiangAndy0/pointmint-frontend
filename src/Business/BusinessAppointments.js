import { useState } from "react"
import { Filter } from "../Filter"
import { formatDate, formatTime } from "../helpers"

export const BusinessAppointments = ({ appointments, setPage, setAppointment }) => {
    const [category, setCategory] = useState("")
    const relevantAppts = appointments
        .filter(app => Boolean(app.client))
        .filter(app => {
            if (category) { //a category was selected, only show appointments that have this category
                return app.category && app.category._id === category
            } else { //all appointments pass through
                return true
            }
        })
        .map((app, index) =>
            <article
                className="quick-info"
                key={`app${index}`}
                onClick={() => {
                    setAppointment(app)
                    setPage('appointment')
                }}
            >
                <h4>{app.client.firstName} {app.client.lastName}</h4>
                <p className="category">{app.category.name}</p>
                <p>
                    {formatDate(app.date)}{" "}
                    {formatTime(app.startTime)}-
                    {formatTime(app.endTime)}
                </p>
            </article>
        )
    return (
        <div id="business-appointments" className="tab-page">
            <Filter category={category} setCategory={setCategory} />
            {relevantAppts.length === 0 ? <p style={{textAlign: 'left'}}>No appointments yet.</p> : relevantAppts}
        </div>
    )
}