import { useState } from "react"
import { CategoryForm } from "./CategoryForm"
import { AddFreeSlots } from "./AddFreeSlots"
import { Appointment } from "./Appointment"
import { BusinessHome } from "./BusinessHome"
import { BusinessProfileEdit } from "./BusinessProfileEdit"
import { EditFreeSlot } from "./EditFreeSlot"

export const Business = () => {
    const [page, setPage] = useState("home")
    const [tab, setTab] = useState("appointments")
    const [appointment, setAppointment] = useState("")
    const [category, setCategory] = useState("")
    return(
        <div>
            {page === 'home' && 
                <BusinessHome setPage={setPage} setTab={setTab} tab={tab} setAppointment={setAppointment} setCategory={setCategory}/>
            }
            {page === 'profile' && <BusinessProfileEdit setPage={setPage}/>}
            {page === 'appointment' && <Appointment appointment={appointment} setPage={setPage}/>}
            {page === 'addFreeSlots' && <AddFreeSlots setPage={setPage} setTab={setTab}/>}
            {page === 'editFreeSlot' && 
                <EditFreeSlot
                    setPage={setPage}
                    setTab={setTab}
                    freeSlot={appointment}
                />
            }
            {page === 'addCategory' && 
                <CategoryForm setPage={setPage} setTab={setTab}/>}
            {page === 'editCategory' && 
                <CategoryForm 
                    setPage={setPage} 
                    setTab={setTab} 
                    category={category}
                />
            }
        </div>
    )
}