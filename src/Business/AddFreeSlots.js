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
                    type="checkbox"
                    id={category.name}
                    name="categories"
                    value={category._id}
                    onClick={(e) => setCategoryId(e.target.value)}
                />
                <label htmlFor={category.name}>{category.name}</label>
            </div>
            )}
            {categoryId && 
            <div>
                <h3>Add time slots</h3>
                <label htmlFor="date">Date</label>
                <input 
                    type="date"
                    id="date"
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