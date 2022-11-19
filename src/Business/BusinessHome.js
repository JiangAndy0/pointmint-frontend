import React from "react"
import { Header } from "../Header"
import { BusinessAppointments } from "./BusinessAppointments"

export const BusinessHome = ({user, setPage, tab, setTab, setAppointment}) => {
    return(
        <div>
            <Header setPage={setPage}/>
            <p>Your Business Code:</p>
            <p>{user.businessCode}</p>
            <input 
                type="radio"
                id="appointmentsRadio"
                name="tab"
                value="appointments"
                onChange={e => setTab(e.target.value)}
                defaultChecked
            />
            <label htmlFor="appointmentsRadio">Appointments</label>
            <input 
                type="radio"
                id="freeSlotsRadio"
                name="tab"
                value="freeSlots"
                onChange={e => setTab(e.target.value)}
            />
            <label htmlFor="freeSlotsRadio">Free Slots</label>
            <input 
                type="radio"
                id="categoriesRadio"
                name="tab"
                value="categories"
                onChange={e => setTab(e.target.value)}
            />
            <label htmlFor="categoriesRadio">Categories</label>
            {tab === 'appointments' && <BusinessAppointments user={user} setPage={setPage} setAppointment={setAppointment}/>}
            
        </div>
    )
}