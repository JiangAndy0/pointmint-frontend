import { useState } from "react"
import { BusinessProfile } from "./BusinessProfile"

import { useDispatch, useSelector } from "react-redux"
import { selectStatus, selectUser, updateUser } from "../app/userSlice"
import { Title } from "../Title"

export const BusinessProfileEdit = ({ setPage }) => {
    const user = useSelector(selectUser)
    const status = useSelector(selectStatus)
    const [name, setName] = useState(user.name)
    const [businessCode, setBusinessCode] = useState(user.businessCode)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [address, setAddress] = useState(user.address)
    const saveBtnDisabled = name === user.name && businessCode === user.businessCode && email === user.email
        && phone === user.phone && address.every((line, index) => line === user.address[index])

    const dispatch = useDispatch()
    const handleSave = async (e) => {
        e.preventDefault()
        dispatch(updateUser({
            endpoint: 'businesses/update', 
            bodyObj: { _id: user._id, name, businessCode, email, phone, address }}
        ))
        if(status === 'succeeded'){
            setPage('home')
        }
    }

    return (
        <form onSubmit={handleSave} className="popup-page">
            <Title title="Profile" setPage={setPage}/>
            {status === 'failed' && <p className="error">Something went wrong with your request. Try again later</p>}
            <BusinessProfile
                name={name} businessCode={businessCode} email={email} phone={phone} address={address}
                setName={setName} setEmail={setEmail} setBusinessCode={setBusinessCode} setPhone={setPhone} setAddress={setAddress}
            />
            <input type="submit" value="Save Changes" disabled={saveBtnDisabled} />
        </form>
    )
}