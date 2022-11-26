import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, updateUser } from "./app/userSlice"
import { BusinessProfile } from "./Business/BusinessProfile"
import { ClientProfile } from "./Client/ClientProfile"

export const Signup = ({ setPage }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [accountType, setAccountType] = useState("client")
    const status = useSelector(selectStatus)
    const dispatch = useDispatch()

    //Business profile fields
    const [name, setName] = useState("")
    const [businessCode, setBusinessCode] = useState("")
    const [address, setAddress] = useState([])
    //Customer profile fields
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    //Shared profile fields
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const handleAccountChange = e => {
        setAccountType(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let elements
        if (accountType === 'business') {
            elements = { username, password, accountType, email, phone, name, businessCode, address }
        } else {
            elements = { username, password, accountType, email, phone, firstName, lastName }
        }
        dispatch(updateUser({ endpoint: 'register', bodyObj: elements }))
    }
    return (
        <form onSubmit={handleSubmit} className="start-form">
            <h2>Sign up as</h2>
            <div id="client-business-toggle">
                <input
                    type="radio"
                    id="clientRadio"
                    name="accountType"
                    value="client"
                    defaultChecked
                    onChange={handleAccountChange}
                />
                <label htmlFor="clientRadio">Client</label>
                <input
                    type="radio"
                    id="businessRadio"
                    name="accountType"
                    value="business"
                    onChange={handleAccountChange}
                />
                <label htmlFor="businessRadio">Business</label>
            </div>
            {status === 'failed' && <p className="error">Username is already taken</p>}
            <div className="label-field">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    minLength="6"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="label-field">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    minLength="8"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <h3>We just need a few things to get started</h3>
            {accountType === 'business'
                ?
                <BusinessProfile
                    name={name} email={email} businessCode={businessCode} phone={phone} address={address}
                    setName={setName} setEmail={setEmail} setBusinessCode={setBusinessCode} setPhone={setPhone} setAddress={setAddress}
                />
                :
                <ClientProfile
                    firstName={firstName} lastName={lastName} email={email} phone={phone}
                    setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setPhone={setPhone}
                />
            }
            <input type="submit" value="Create Account" />
            <button
                className="link"
                onClick={e => {
                    e.preventDefault()
                    setPage('login')
                }}
            >
                Already have an account? Log in
            </button>
        </form>
    )
}