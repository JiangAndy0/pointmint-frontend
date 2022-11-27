import { useState } from "react"
import { Title } from "../Title"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, selectUser, updateUser } from "../app/userSlice"

export const EditFreeSlot = ({ setPage, setTab, freeSlot }) => {
    const user = useSelector(selectUser)
    const status = useSelector(selectStatus)
    const [categoryIds, setCategoryIds] = useState(
        user.categories.map(cat =>
            freeSlot.categories.some(freeSlotCat => freeSlotCat._id === cat._id) //mark all the categories of this free slot
        )
    )
    const [date, setDate] = useState(freeSlot.date)
    const [start, setStart] = useState(freeSlot.startTime)
    const [end, setEnd] = useState(freeSlot.endTime)
    const [userError, setUserError] = useState("")
    const categoriesSame = categoryIds.every((catId, index) => {
        if (catId) { //if the category is marked as checked, then the free slot should have the category
            return freeSlot.categories.some(cat => cat._id === user.categories[index]._id)
        } else { //if the category is not selected, then the free slot should not have the category 
            return freeSlot.categories.every(cat => cat._id !== user.categories[index]._id)
        }
    })
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (categoryIds.every(categoryId => !categoryId)) {
            setUserError("You have to select one or more appointment types.")
            return
        } else if (end <= start) {
            setUserError("End time must be after start time.")
            return
        }
        setUserError("")
        const ids = []
        categoryIds.forEach((id, index) => { //find the ids of the selected categories
            if (id) {
                ids.push(user.categories[index]._id)
            }
        })
        dispatch(updateUser({
            endpoint: 'freeslots/edit',
            bodyObj: { businessId: user._id, appId: freeSlot._id, date, startTime: start, endTime: end, categoryIds: ids }
        }))
        if (status === 'succeeded') {
            setPage('home')
            setTab('freeSlots')
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        if(window.confirm("This free slot will be deleted.")){
            dispatch(updateUser({
                endpoint: 'freeslots/delete',
                bodyObj: { businessId: user._id, appId: freeSlot._id }
            }))
            if (status === 'succeeded') {
                setPage('home')
                setTab('freeSlots')
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="popup-page">
            <Title title="Edit Free Slot" setPage={setPage} setTab={setTab} setTabTo="freeSlots" />
            <h3>{`Edit appointment type(s)`}</h3>
            {user.categories.map((category, index) =>
                <div key={category._id} className="checkbox-container">
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
                        defaultChecked={Boolean(categoryIds[index])}
                    />
                    <label htmlFor={category.name}>{category.name}</label>
                </div>
            )}
            <div className="label-field">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="start-end">
                <div className="label-field">
                    <label htmlFor="start">Start</label>
                    <input
                        type="time"
                        id="start"
                        value={start}
                        onChange={e => setStart(e.target.value)}
                        required
                    />
                </div>
                <div className="label-field">
                    <label htmlFor="end">End</label>
                    <input
                        type="time"
                        id="end"
                        value={end}
                        onChange={e => setEnd(e.target.value)}
                        required
                    />
                </div>
            </div>
            {userError && <p className="error">{userError}</p>}
            <input
                disabled={
                    date === freeSlot.date && start === freeSlot.startTime &&
                    end === freeSlot.endTime && categoriesSame
                }
                type="submit"
                value="Save Changes"
            />
            <button
                className="full-width danger"
                onClick={handleDelete}
            >
                Delete
            </button>
            {status === 'failed' && <p className="error">Something went wrong with your request. Please try again later.</p>}
        </form>
    )
}