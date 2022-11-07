import { useState } from "react"
import { sortEarlyToLate } from "../helpers"

export const FormBusinessCode = ({setPage, setBusiness}) => {
    const [businessCode, setBusinessCode] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch(`http://localhost:5500/businesses/${businessCode}`)
            const b1 = await res.json()
            if(b1){
                //sort its appointments by date
                sortEarlyToLate(b1.appointments)
                setBusiness(b1)
                setPage('makeAppointment')
            } else {
                setError(true)
            }
        } catch {
            setError(true)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="business-code">Enter a Business Code</label>
            <input 
                id="business-code" 
                type="text" 
                value={businessCode}
                onChange={e => setBusinessCode(e.target.value)}
            />
            <input type="submit" value="Go" />
            {error && <p>Cannot find business with that business code</p>}
        </form>
    )
}