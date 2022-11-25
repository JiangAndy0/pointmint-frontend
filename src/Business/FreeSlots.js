import { useState } from "react"
import { Filter } from "../Filter"
import { formatDate, formatTime } from "../helpers"

export const FreeSlots = ({appointments, setAppointment, setPage}) => {
    const [category, setCategory] = useState("")
    return (
        <div>
            <Filter category={category} setCategory={setCategory}/>
            <button
                onClick={() => setPage("addFreeSlots")}
            >
                + Add
            </button>
            {appointments
                .filter(app => !app.client) //all the appointments without clients
                .filter(app => {
                    if(category){ //a category was selected, only show free slots that have this category
                        return app.categories.some(cat => cat._id === category)
                    } else { //all appointments pass through
                        return true
                    }
                })
                .map((app, index) => 
                    <article 
                        key={`freeslot${index}`}
                        style={{border: "1px solid black"}}
                        onClick={() => {
                            setAppointment(app)
                            setPage('editFreeSlot')
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