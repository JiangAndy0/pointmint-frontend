import { useState } from "react"
import { Filter } from "../Filter"
import { formatDate, formatTime } from "../helpers"

export const BusinessAppointments = ({appointments, setPage, setAppointment}) => {
    const [category, setCategory] = useState("")
    return(
        <div>
            <Filter category={category} setCategory={setCategory}/>
            {appointments
                .filter(app => Boolean(app.client))
                .filter(app => {
                    if(category){ //a category was selected, only show appointments that have this category
                        return app.category && app.category._id === category
                    } else { //all appointments pass through
                        return true
                    }
                })
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