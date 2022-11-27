import { useState } from "react"
import { getApi, sortEarlyToLate } from "../helpers"

export const FormBusinessCode = ({ setPage, setBusiness }) => {
    const [businessCode, setBusinessCode] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${getApi()}/businesses/${businessCode}`)
            const b1 = await res.json()
            if (b1) {
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
        <form onSubmit={handleSubmit} id="business-code-form">
            <label htmlFor="business-code">Enter a Business Code</label>
            <div>
                <input
                    id="business-code"
                    type="text"
                    value={businessCode}
                    onChange={e => setBusinessCode(e.target.value)}
                    placeholder="try: jerry-renewable-3"
                />
                <input type="submit" value="Go" />
            </div>
            {error && <p className="error">Cannot find business with that business code</p>}
        </form>
    )
}