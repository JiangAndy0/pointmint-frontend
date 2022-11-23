import { useState } from "react"
import { CategoryForm } from "./CategoryForm"
import { AddFreeSlots } from "./AddFreeSlots"
import { Appointment } from "./Appointment"
import { BusinessHome } from "./BusinessHome"
import { BusinessProfileEdit } from "./BusinessProfileEdit"

export const Business = ({user, setUser}) => {
    const [page, setPage] = useState("home")
    const [tab, setTab] = useState("appointments")
    const [appointment, setAppointment] = useState("")
    const [category, setCategory] = useState("")
    return(
        <div>
            {page === 'home' && 
                <BusinessHome user={user} setPage={setPage} setTab={setTab} tab={tab} setAppointment={setAppointment} setCategory={setCategory}/>
            }
            {page === 'profile' && <BusinessProfileEdit user={user} setUser={setUser} setPage={setPage}/>}
            {page === 'appointment' && <Appointment appointment={appointment} setPage={setPage} setUser={setUser}/>}
            {page === 'addFreeSlots' && <AddFreeSlots setPage={setPage} user={user} setTab={setTab} setUser={setUser}/>}
            {page === 'addCategory' && 
                <CategoryForm setPage={setPage} setTab={setTab} setUser={setUser} businessId={user._id}/>}
            {page === 'editCategory' && 
                <CategoryForm 
                    setPage={setPage} 
                    setTab={setTab} 
                    setUser={setUser} 
                    businessId={user._id} 
                    category={category} 
                    appointments={user.appointments}
                />
            }
        </div>
    )
}