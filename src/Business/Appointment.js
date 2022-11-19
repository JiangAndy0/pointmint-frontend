import { useState } from "react"
import { formatTime } from "../helpers"

export const Appointment = ({appointment, setPage}) => {
    const [error, setError] = useState(false)
    const handleDecline = async(e) => {
        e.preventDefault()
        try {
        } catch (err){
        }
    }

    return (
        <div>
            <p>
                <strong>{appointment.client.firstName} {appointment.client.lastName}</strong> is scheduled for a 
                <strong> {appointment.category.name}</strong> appointment.
            </p>
            <h3>Time</h3>
            <p>
                {appointment.date.month}/{appointment.date.day}/{appointment.date.year}<br />
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