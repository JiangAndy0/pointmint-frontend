import { useDispatch, useSelector } from "react-redux"
import { selectStatus, setStatus, updateUser } from "../app/userSlice"
import { formatDate, formatTime, getApi, sortEarlyToLate } from "../helpers"
import { Title } from "../Title"

export const Confirmation = ({ appointment, setPage, setBusiness }) => {
    const status = useSelector(selectStatus)
    const dispatch = useDispatch()

    const handleCancel = async (e) => {
        e.preventDefault()
        dispatch(updateUser({
            endpoint: 'appointments/cancel',
            bodyObj: { appointmentId: appointment._id }
        }))
        if (status === 'succeeded') {
            setPage('home')
        }
    }

    const handleEdit = async () => {
        //we have to find the business doc to see all its appointments
        const res = await fetch(`${getApi()}/businesses/${appointment.business.businessCode}`)
        if (res.ok) {
            const b1 = await res.json()
            //sort its appointments by date
            sortEarlyToLate(b1.appointments)
            setBusiness(b1)
            dispatch(setStatus('idle'))
            setPage('editAppointment')
        } else {
            dispatch(setStatus('failed'))
        }
    }

    return (
        <div className="appointment-info popup-page">
            <Title title="Appointment Info" setPage={setPage}/>
            <p>
                You are scheduled for a <strong>{appointment.category.name}</strong> appointment with
                <strong> {appointment.business.name}</strong>
            </p>
            <h4>Time</h4>
            <p className="info-block">
                {formatDate(appointment.date)}<br />
                {formatTime(appointment.startTime)}-
                {formatTime(appointment.endTime)}
            </p>
            <h4>Location</h4>
            <p className="info-block">
                {appointment.business.address[0]}{appointment.business.address[1] ? " " + appointment.business.address[1] : ""},<br />
                {appointment.business.address[2]}, {appointment.business.address[3]}, {appointment.business.address[4]}
            </p>
            <h4>Contact Info</h4>
            <p className="info-block">
                {appointment.business.phone}<br />
                {appointment.business.email}
            </p>
            {appointment.category.questions.length > 0 && <h3>Your Answers</h3>}
            {appointment.category.questions.map((question, index) =>
                <p key={`question${index}`}>
                    <strong>{question}</strong><br />
                    {appointment.answers[index]}
                </p>
            )}
            {status === 'failed' && <p className="error">Something went wrong with your request. Please try again later</p>}
            <button
                className="primary"
                onClick={e => {
                    e.preventDefault()
                    setPage('home')
                }}
            >
                Return to Appointments
            </button>
            <div className="secondary-btn-row">
                <button onClick={handleCancel} className="danger">
                    Cancel
                </button>
                <button onClick={handleEdit} className="btn-edit">
                    Edit
                </button>
            </div>
        </div>
    )
}