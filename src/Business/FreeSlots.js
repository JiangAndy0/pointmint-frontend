import { useState } from "react"
import { Filter } from "../Filter"
import { formatDate, formatTime } from "../helpers"

export const FreeSlots = ({ appointments, setAppointment, setPage }) => {
    const [category, setCategory] = useState("")
    const relevantSlots = appointments
        .filter(app => !app.client) //all the appointments without clients
        .filter(app => {
            if (category) { //a category was selected, only show free slots that have this category
                return app.categories.some(cat => cat._id === category)
            } else { //all appointments pass through
                return true
            }
        })
        .map((app, index) =>
            <article
                key={`freeslot${index}`}
                className="quick-info"
                onClick={() => {
                    setAppointment(app)
                    setPage('editFreeSlot')
                }}
            >
                {app.categories.map((category, index) => <p className="category" key={`category${index}`}>{category.name}</p>)}
                <p>
                    {formatDate(app.date)}{" "}
                    {formatTime(app.startTime)}-
                    {formatTime(app.endTime)}
                </p>
            </article>
        )
    return (
        <div className="tab-page">
            <div className="tools-row">
                <Filter category={category} setCategory={setCategory} />
                <button
                    className="add"
                    onClick={() => setPage("addFreeSlots")}
                >
                    + Add
                </button>
            </div>
            {relevantSlots.length === 0 ? <p style={{textAlign: "left"}}>No free slots, tap on +Add to add some.</p> : relevantSlots}
        </div>
    )
}