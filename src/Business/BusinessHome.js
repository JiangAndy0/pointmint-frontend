import React from "react"
import { Header } from "../Header"
import { BusinessAppointments } from "./BusinessAppointments"
import { Categories } from "./Categories"
import { FreeSlots } from "./FreeSlots"

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
                defaultChecked={tab === 'appointments'}
            />
            <label htmlFor="appointmentsRadio">Appointments</label>
            <input 
                type="radio"
                id="freeSlotsRadio"
                name="tab"
                value="freeSlots"
                onChange={e => setTab(e.target.value)}
                defaultChecked={tab === 'freeSlots'}
            />
            <label htmlFor="freeSlotsRadio">Free Slots</label>
            <input 
                type="radio"
                id="categoriesRadio"
                name="tab"
                value="categories"
                onChange={e => setTab(e.target.value)}
                defaultChecked={tab === 'categories'}
            />
            <label htmlFor="categoriesRadio">Categories</label>
            {tab === 'appointments' && 
                <BusinessAppointments 
                    appointments={user.appointments} 
                    setPage={setPage} 
                    setAppointment={setAppointment}
                    categories={user.categories}
                />
            }
            {tab === 'freeSlots' && 
                <FreeSlots 
                    appointments={user.appointments} 
                    setAppointment={setAppointment} 
                    setPage={setPage} 
                    categories={user.categories}
                />
            }
            {tab === 'categories' && 
                <Categories 
                    categories={user.categories}
                    setPage={setPage}
                />
            }
            
        </div>
    )
}