import { useEffect, useState } from "react"
import { ClientProfile } from "./ClientProfile"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { getApi } from "../helpers"

export const ClientProfileEdit = ({user, setUser, setPage}) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [status, setStatus] = useState('neutral')
    const saveBtnDisabled = firstName === user.firstName && lastName === user.lastName && email === user.email && phone === user.phone

    useEffect(() => { //clear screen of success/error messages whenever input is detected
        setStatus('idle')
    }, [firstName, lastName, email, phone])
    
    const handleSave = async(e) => {
        e.preventDefault()
        const res = await fetch(`${getApi()}/clients/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({_id: user._id, firstName, lastName, email, phone})
        })
        if(res.ok){
            const updatedUser = await res.json()
            setUser(updatedUser)
            setStatus('success')
        } else {
            setStatus('error')
        }
    }
    return (
        <form onSubmit={handleSave}>
            <h2>Profile</h2>
            <button
                onClick={e => {
                    e.preventDefault()
                    setPage('default')
                }}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
            {status === 'success' && <p>Your changes have been saved</p>}
            {status === 'error' && <p>Something went wrong with your request. Try again later</p>}
            <ClientProfile 
                firstName={firstName} lastName={lastName} email={email} phone={phone}
                setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setPhone={setPhone}
            />
            <input type="submit" value="Save Changes" disabled={saveBtnDisabled || status === 'success'} />
        </form>
    )
}