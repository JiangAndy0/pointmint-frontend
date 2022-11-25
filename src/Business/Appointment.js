import { Title } from "../Title"
import { formatDate, formatTime } from "../helpers"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, updateUser } from "../app/userSlice"

export const Appointment = ({appointment, setPage}) => {
    const status = useSelector(selectStatus)
    const dispatch = useDispatch()
    const handleDecline = async(e) => {
        e.preventDefault()
        dispatch(updateUser({
            endpoint: 'appointments/cancel', 
            bodyObj: {appointmentId: appointment._id, businessId: appointment.business}
        }))
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
            {status === 'failed' && <p>Something went wrong with your request. Please try again later</p>}
        </div>
    )
}