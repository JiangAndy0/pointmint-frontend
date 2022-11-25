import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, selectUser, updateUser } from "../app/userSlice"
import { formatTime, formatDate } from "../helpers"
import { Title } from "../Title"

export const MakeAppointment = ({ business, setPage, setAppointment, app }) => {
    const user = useSelector(selectUser)
    const status = useSelector(selectStatus)
    const [category, setCategory] = useState(app ? app.category : "")
    const [appId, setAppId] = useState(app ? app._id : "")
    const [answers, setAnswers] = useState(app ? app.answers : [])
    const disableUpdate = app && app._id === appId && app.category._id === category._id
        && app.answers.every((answer, index) => answer === answers[index])

    const dispatch = useDispatch()

    useEffect(() => {
        if(status === 'succeeded'){
            const app = user.appointments.find(appointment => appointment._id === appId)
            if(app){
                setAppointment(app)
                setPage('confirmation')
            }
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (app) {
            //cancel the old appointment
            dispatch(updateUser({
                endpoint: 'appointments/cancel',
                bodyObj: { appointmentId: app._id }
            }))
        }
        dispatch(updateUser({
            endpoint: 'appointments/update',
            bodyObj: { appointmentId: appId, categoryId: category._id, clientId: user._id, answers }
        }))
    }
    return (
        <form onSubmit={handleSubmit}>
            <Title title={business.name} setPage={setPage} setPageTo={app ? 'confirmation' : 'home'} />
            <p>Select Appointment Type:</p>
            {business.categories.map(category =>
                <div key={category._id}>
                    <input
                        type="radio"
                        id={category.name}
                        name="category"
                        value={category._id}
                        onClick={e => {
                            const newCategory = business.categories.find(category => category._id === e.target.value)
                            for (let i = 0; i < answers.length; i++) {
                                answers[i] = ""
                            }
                            setAppId("")
                            setCategory(newCategory)
                        }}
                        required
                        defaultChecked={app && app.category._id === category._id}
                    />
                    <label htmlFor={category.name}>{category.name}</label>
                </div>
            )}
            <p>Select Appointment Slot:</p>
            {category && business.appointments
                .filter(appointment =>
                    appointment.categories.some(cat => cat._id === category._id)
                )
                .map(appointment =>
                    <div key={appointment._id}>
                        <input
                            type="radio"
                            id={appointment._id}
                            name="slot"
                            value={appointment._id}
                            onClick={e => setAppId(e.target.value)}
                            //if we are editing, disable button if this appointment already has a client
                            //and its id doesn't match the appointment that we are editing, otherwise disable if appoint. has client
                            disabled={app ? appointment.client && appointment._id !== app._id : Boolean(appointment.client)}
                            defaultChecked={app && appointment._id === app._id}
                            required
                        />
                        <label htmlFor={appointment._id}>
                            {`${formatDate(appointment.date)} `}
                            {formatTime(appointment.startTime)}-
                            {formatTime(appointment.endTime)}
                        </label>
                    </div>
                )
            }
            <p>Please answer a few questions about the appointment:</p>
            {category && category.questions.map((question, index) =>
                <div key={`question${index}`}>
                    <label htmlFor={`question${index}`}>{question}</label>
                    <textarea
                        id={`question${index}`}
                        rows="5"
                        cols="33"
                        value={answers[index]}
                        onChange={e => setAnswers(prev => {
                            const newAnswers = prev.slice()
                            newAnswers[index] = e.target.value
                            return newAnswers
                        })}
                        required
                    />
                </div>
            )}
            {status === 'failed' && <p>Something went wrong with your request. Please try again later</p>}
            <input type="submit" value={app ? "Update Appointment" : "Request Appointment"} disabled={disableUpdate} />
        </form>
    )
}