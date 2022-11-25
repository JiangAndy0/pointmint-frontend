import { useState } from "react"
import { ClientProfile } from "./ClientProfile"

import { Title } from "../Title"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, selectUser, updateUser } from "../app/userSlice"

export const ClientProfileEdit = ({setPage}) => {
    const user = useSelector(selectUser)
    const status = useSelector(selectStatus)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const saveBtnDisabled = firstName === user.firstName && lastName === user.lastName && email === user.email && phone === user.phone

    const dispatch = useDispatch()

    const handleSave = async(e) => {
        e.preventDefault()
        dispatch(updateUser({
            endpoint: 'clients/update',
            bodyObj: {_id: user._id, firstName, lastName, email, phone}
        }))
        if(status === 'succeeded'){
            setPage('home')
        }
    }
    return (
        <form onSubmit={handleSave}>
            <Title title="Profile" setPage={setPage}/>
            <ClientProfile 
                firstName={firstName} lastName={lastName} email={email} phone={phone}
                setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setPhone={setPhone}
            />
            {status === 'failed' && <p>Something went wrong with your request. Try again later</p>}
            <input type="submit" value="Save Changes" disabled={saveBtnDisabled} />
        </form>
    )
}