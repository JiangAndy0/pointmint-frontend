import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, selectUser, updateUser } from "../app/userSlice"
import { formatDate, formatTime, sortEarlyToLate } from "../helpers"
import { Title } from "../Title"

export const AddFreeSlots = ({ setPage, setTab }) => {
    const user = useSelector(selectUser)
    const status = useSelector(selectStatus)
    const [categoryIds, setCategoryIds] = useState(user.categories.map(category => false))
    const [date, setDate] = useState("")
    const [start, setStart] = useState("  :  ")
    const [end, setEnd] = useState("  :  ")
    const [endError, setEndError] = useState("")
    const [slots, setSlots] = useState([])

    const dispatch = useDispatch()

    const handleAdd = (e) => {
        e.preventDefault()
        if (start >= end) {
            setEndError("End time must be after start time")
            return
        }
        setEndError("")
        const newSlot = { date, startTime: start, endTime: end }
        setSlots(prev => {
            const newSlots = prev.slice()
            newSlots.push(newSlot)
            sortEarlyToLate(newSlots)
            return newSlots
        })
        setStart("  :  ")
        setEnd("  :  ")
    }

    const handleSubmit = async() => {
        const ids = []
        categoryIds.forEach((id, index) => { //find the ids of the selected categories
            if(id){
                ids.push(user.categories[index])
            }
        })
        dispatch(updateUser({endpoint: 'freeslots/add', bodyObj: {businessId: user._id, timeSlots: slots, categoryIds: ids}}))
        if(status === 'succeeded'){
            setPage('home')
            setTab('freeSlots')
        }
    }

    return (
        <div>
            <Title title="Add Free Slot(s)" setPage={setPage} setTab={setTab} setTabTo="freeSlots" />
            <h3>{`Select appointment type(s)`}</h3>
            {user.categories.map((category, index) =>
                <div key={category._id}>
                    <input
                        type="checkbox"
                        id={category.name}
                        name="categories"
                        value={category._id}
                        onChange={() => {
                            setCategoryIds(prev => {
                                const newCategoryIds = prev.slice()
                                newCategoryIds[index] = !newCategoryIds[index]
                                return newCategoryIds
                            })
                        }}
                    />
                    <label htmlFor={category.name}>{category.name}</label>
                </div>
            )}
            {categoryIds.some(categoryId => Boolean(categoryId)) &&
                <form onSubmit={handleAdd}>
                    <h3>Add time slots</h3>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                    <label htmlFor="start">Start</label>
                    <input
                        type="time"
                        id="start"
                        value={start}
                        onChange={e => setStart(e.target.value)}
                        required
                    />
                    <label htmlFor="end">End</label>
                    <input
                        type="time"
                        id="end"
                        value={end}
                        onChange={e => setEnd(e.target.value)}
                        required
                    />
                    {endError && <p>{endError}</p>}
                    <input type="submit" value="+ Add Time Slot" />
                </form>
            }
            {slots.map((slot, index) =>
                <button 
                    key={`slot${index}`}
                    onClick={() => setSlots(slots.slice(0, index).concat(slots.slice(index + 1)))}
                >
                    {formatDate(slot.date)} {formatTime(slot.startTime)}-{formatTime(slot.endTime)}
                </button>
            )}
            <br></br>
            { categoryIds.some(categoryId => Boolean(categoryId)) && 
                <button
                    disabled={slots.length === 0}
                    onClick={handleSubmit}
                >
                    Add {slots.length} Free Slot{slots.length > 1 && 's'}
                </button>
            }
            {status === 'failed' && <p>Something went wrong with your request. Please try again later</p>}
            
        </div>
    )
}