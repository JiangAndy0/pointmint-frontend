import React from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../app/userSlice"
import { Header } from "../Header"
import { BusinessAppointments } from "./BusinessAppointments"
import { Categories } from "./Categories"
import { FreeSlots } from "./FreeSlots"

export const BusinessHome = ({ setPage, tab, setTab, setAppointment, setCategory }) => {
    const user = useSelector(selectUser)
    return (
        <div id="business-home">
            <Header setPage={setPage} />
            <p id="business-code-label">Your Business Code:</p>
            <p>{user.businessCode}</p>
            <hr></hr>
            <div className="tab-select">
                <input
                    type="radio"
                    id="appointmentsRadio"
                    name="tab"
                    value="appointments"
                    onChange={e => setTab(e.target.value)}
                    defaultChecked={tab === 'appointments'}
                />
                <label htmlFor="appointmentsRadio" className={tab === 'appointments' ? 'active' : ''}>Appointments</label>
                <input
                    type="radio"
                    id="freeSlotsRadio"
                    name="tab"
                    value="freeSlots"
                    onChange={e => setTab(e.target.value)}
                    defaultChecked={tab === 'freeSlots'}
                />
                <label htmlFor="freeSlotsRadio" className={tab === 'freeSlots' ? 'active' : ''}>Free Slots</label>
                <input
                    type="radio"
                    id="categoriesRadio"
                    name="tab"
                    value="categories"
                    onChange={e => setTab(e.target.value)}
                    defaultChecked={tab === 'categories'}
                />
                <label htmlFor="categoriesRadio" className={tab === 'categories' ? 'active' : ''}>Categories</label>
            </div>
            {tab === 'appointments' &&
                <BusinessAppointments
                    appointments={user.appointments}
                    setPage={setPage}
                    setAppointment={setAppointment}
                />
            }
            {tab === 'freeSlots' &&
                <FreeSlots
                    appointments={user.appointments}
                    setAppointment={setAppointment}
                    setPage={setPage}
                />
            }
            {tab === 'categories' &&
                <Categories
                    categories={user.categories}
                    setCategory={setCategory}
                    setPage={setPage}
                />
            }

        </div>
    )
}