import { useState, useEffect } from "react"
import { BusinessProfile } from "./BusinessProfile"
import { getApi } from "../helpers"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export const BusinessProfileEdit = ({ user, setUser, setPage }) => {
    const [name, setName] = useState(user.name)
    const [businessCode, setBusinessCode] = useState(user.businessCode)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [address, setAddress] = useState(user.address)
    const [status, setStatus] = useState('idle')
    const saveBtnDisabled = name === user.name && businessCode === user.businessCode && email === user.email
        && phone === user.phone && address.every((line, index) => line === user.address[index])

    useEffect(() => { //clear screen of success/error messages whenever input is detected
        setStatus('idle')
    }, [name, businessCode, email, phone, address])

    const handleSave = async (e) => {
        e.preventDefault()
        const res = await fetch(`${getApi()}/businesses/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: user._id, name, businessCode, email, phone, address })
        })
        if (res.ok) {
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
                    setPage('home')
                }}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
            {status === 'success' && <p>Your changes have been saved</p>}
            {status === 'error' && <p>Something went wrong with your request. Try again later</p>}
            <BusinessProfile
                name={name} businessCode={businessCode} email={email} phone={phone} address={address}
                setName={setName} setEmail={setEmail} setBusinessCode={setBusinessCode} setPhone={setPhone} setAddress={setAddress}
            />
            <input type="submit" value="Save Changes" disabled={saveBtnDisabled || status === 'success'} />
        </form>
    )
}