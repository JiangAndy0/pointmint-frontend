import { useState } from "react"
import { Title } from "../Title"
import { formatDate, formatTime, getApi, sortEarlyToLate } from "../helpers"

export const Appointment = ({appointment, setPage, setUser}) => {
    const [error, setError] = useState(false)
    const handleDecline = async(e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${getApi()}/appointments/cancel`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({appointmentId: appointment._id, businessId: appointment.business})
            })
            if(res.ok){
                const updatedBusiness = await res.json()
                sortEarlyToLate(updatedBusiness.appointments)
                setUser(updatedBusiness)
                setPage('home')
            }
        } catch (err){
            console.log(err)
            setError(true)
        }
    }

    return (
        <div>
            <Title title="Appointment Info" setPage={setPage}/>
            <p>
                <strong>{appointment.client.firstName} {appointment.client.lastName}</strong> is scheduled for a 
                <strong> {appointment.category.name}</strong> appointment.
            </p>
            <h3>Time</h3>
            <p>
                {formatDate(appointment.date)}<br />
                {formatTime(appointment.startTime)}-
                {formatTime(appointment.endTime)}
            </p>
            <h3>Contact Info</h3>
            <p>
                {appointment.client.phone}<br/>
                {appointment.client.email}
            </p>
            <h2>Answers</h2>
            {appointment.category.questions.map((question, index) => 
                <p key={`question${index}`}>
                    <strong>{question}</strong><br/>
                    {appointment.answers[index]}
                </p>
            )}
            <button
                onClick={e => {
                    e.preventDefault()
                    setPage('home')
                }}
            >
                Return to Appointments
            </button>
            <button onClick={handleDecline}>
                Decline
            </button>
            {error && <p>Something went wrong with your request. Please try again later</p>}
        </div>
    )
}