import { formatTime } from "../helpers"

export const Confirmation = ({ appointmentId, user, setPage }) => {
    const appointment = user.appointments.find(appointment => appointment._id === appointmentId)
    return (
        <div>
            <h2>Confirmed!</h2>
            <p>
                You are scheduled for a <strong>{appointment.category.name}</strong> appointment with
                <strong> {appointment.business.name}</strong>
            </p>
            <h3>Time</h3>
            <p>
                {appointment.date.month}/{appointment.date.day}/{appointment.date.year}<br />
                {formatTime(appointment.startTime)}-
                {formatTime(appointment.endTime)}
            </p>
            <h3>Location</h3>
            <p>
                {appointment.business.address[0]}{appointment.business.address[1] ? " " + appointment.business.address[1] : ""},<br />
                {appointment.business.address[2]}, {appointment.business.address[3]}, {appointment.business.address[4]}
            </p>
            <h3>Contact Info</h3>
            <p>
                {appointment.business.phone}<br/>
                {appointment.business.email}
            </p>
            <h2>Your Answers</h2>
            {appointment.category.questions.map((question, index) => 
                <p key={`question${index}`}>
                    <strong>{question}</strong><br/>
                    {appointment.answers[index]}
                </p>
            )}
            <button
                onClick={e => {
                    e.preventDefault()
                    setPage('default')
                }}
            >
                Return to Appointments
            </button>
        </div>
    )
}