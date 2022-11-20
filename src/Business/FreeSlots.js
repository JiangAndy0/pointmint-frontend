import { formatDate, formatTime } from "../helpers"

export const FreeSlots = ({appointments, setAppointment, setPage}) => {
    return (
        <div>
            <button
                onClick={() => setPage("addFreeSlots")}
            >
                + Add
            </button>
            {appointments
                .filter(app => !app.client) //all the appointments without clients
                .map((app, index) => 
                    <article 
                        key={`freeslot${index}`}
                        style={{border: "1px solid black"}}
                        onClick={() => {
                            setAppointment(app)
                            setPage('freeSlot')
                        }}
                    >
                        {app.categories.map((category, index) => <p key={`category${index}`}>{category.name}</p>)}
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