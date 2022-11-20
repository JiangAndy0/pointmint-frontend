import { useState } from "react"
import { Title } from "../Title"

export const AddFreeSlots = ({ setPage, user }) => {
    const [categoryId, setCategoryId] = useState("")
    return (
        <div>
            <Title title="Add Free Slot(s)" setPage={setPage} />
            <h3>{`Select appointment type(s)`}</h3>
            {user.categories.map(category => 
            <div key={category._id}>
                <input
                    type="radio"
                    id={category.name}
                    name="category"
                    value={category._id}
                    onClick={(e) => setCategoryId(e.target.value)}
                    required
                />
                <label htmlFor={category.name}>{category.name}</label>
            </div>
            )}
            {categoryId && 
            <div>
                <h3>Add time slots</h3>
                <label htmlFor="month">Month</label>
                <input 
                    type="text"
                    id="month"
                    inputMode="numeric"
                />
                <label htmlFor="day">Day</label>
                <input 
                    type="text"
                    id="day"
                    inputMode="numeric"
                />
                <label htmlFor="year">Year</label>
                <input 
                    type="text"
                    id="year"
                    inputMode="numeric"
                />
                <label htmlFor="start">Start</label>
                <input 
                    type="time"
                    id="start"
                />
                <label htmlFor="end">End</label>
                <input 
                    type="time"
                    id="end"
                />
            </div>
            }
        </div>
    )
}