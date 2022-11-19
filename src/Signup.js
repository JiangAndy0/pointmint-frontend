import { useState } from "react"
import { BusinessProfile } from "./Business/BusinessProfile"
import { ClientProfile } from "./Client/ClientProfile"
import { getApi, sortEarlyToLate } from "./helpers"

export const Signup = ({setUser}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [accountType, setAccountType] = useState("client")
    const [error, setError] = useState(false)

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
        if(accountType === 'business'){
            elements = {username, password, accountType, email, phone, name, businessCode, address}
        } else {
            elements = {username, password, accountType, email, phone, firstName, lastName}
        }
        const res = await fetch(`${getApi()}/register`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(elements)
        })
        if (res.ok) {
            const user = await res.json() //gets back a Business/Client document from database
            sortEarlyToLate(user.appointments) //sort the appointments from earliest to latest
            setUser(user) //will change the page to the Business/Client home page
        } else {
            setError(true)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign up as</h2>
            <div>
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
            {error && <p>Username is already taken</p>}
            <label htmlFor="username">Username</label>
            <input
                type="text"
                minLength="6"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                minLength="8"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
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
        </form>
    )
}