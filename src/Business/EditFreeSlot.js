import { useState } from "react"
import { Title } from "../Title"
import { getApi, sortEarlyToLate } from "../helpers"

export const EditFreeSlot = ({ setPage, setTab, setUser, businessId, categories, freeSlot }) => {
    const [categoryIds, setCategoryIds] = useState(
        categories.map(cat =>
            freeSlot.categories.some(freeSlotCat => freeSlotCat._id === cat._id) //mark all the categories of this free slot
        )
    )
    const [date, setDate] = useState(freeSlot.date)
    const [start, setStart] = useState(freeSlot.startTime)
    const [end, setEnd] = useState(freeSlot.endTime)
    const [userError, setUserError] = useState("")
    const [submitError, setSubmitError] = useState("")

    const categoriesSame = categoryIds.every((catId, index) => {
        if(catId){ //if the category is marked as checked, then the free slot should have the category
            return freeSlot.categories.some(cat => cat._id === categories[index]._id)
        } else { //if the category is not selected, then the free slot should not have the category 
            return freeSlot.categories.every(cat => cat._id !== categories[index]._id)
        }
    })

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(categoryIds.every(categoryId => !categoryId)){
            setUserError("You have to select one or more appointment types.")
            return
        } else if (end <= start){
            setUserError("End time must be after start time.")
            return
        }
        setUserError("")
        const ids = []
        categoryIds.forEach((id, index) => { //find the ids of the selected categories
            if(id){
                ids.push(categories[index]._id)
            }
        })
        const res = await fetch(`${getApi()}/freeslots/edit`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({businessId, appId: freeSlot._id, date, startTime: start, endTime: end,  categoryIds: ids})
        })
        if(res.ok){
            const updatedBusiness = await res.json()
            sortEarlyToLate(updatedBusiness.appointments)
            setUser(updatedBusiness)
            setPage('home')
            setTab('freeSlots')
        } else {
            setSubmitError("Something went wrong with your request. Please try again later")
        }
    }

    const handleDelete = async(e) => {
        e.preventDefault()
        const res = await fetch(`${getApi()}/freeslots/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({businessId, appId: freeSlot._id})
        })
        if(res.ok){
            const updatedBusiness = await res.json()
            sortEarlyToLate(updatedBusiness.appointments)
            setUser(updatedBusiness)
            setPage('home')
            setTab('freeSlots')
        } else {
            setSubmitError("Something went wrong with deleting this free slot. Please try again later")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Title title="Edit Free Slot" setPage={setPage} setTab={setTab} setTabTo="freeSlots" />
            <h3>{`Edit appointment type(s)`}</h3>
            {categories.map((category, index) =>
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
                        defaultChecked={Boolean(categoryIds[index])}
                    />
                    <label htmlFor={category.name}>{category.name}</label>
                </div>
            )}
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
            {userError && <p>{userError}</p>}
            <input
                disabled={
                    date === freeSlot.date && start === freeSlot.startTime && 
                    end === freeSlot.endTime && categoriesSame
                }
                type="submit"
                value="Save Changes"
            />
            <button
                onClick={handleDelete}
            >
                Delete
            </button>
            {submitError && <p>{submitError}</p>}
        </form>
    )
}