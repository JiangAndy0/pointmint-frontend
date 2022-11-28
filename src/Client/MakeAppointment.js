import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, setUser } from "../app/userSlice"
import { formatTime, formatDate, sortEarlyToLate, getApi } from "../helpers"
import { Title } from "../Title"

export const MakeAppointment = ({ business, setPage, setAppointment, app }) => {
    const user = useSelector(selectUser)
    const [error, setError] = useState(false)
    const [category, setCategory] = useState(app ? app.category : "")
    const [appId, setAppId] = useState(app ? app._id : "")
    const [answers, setAnswers] = useState(app ? app.answers : [])
    const disableUpdate = app && app._id === appId && app.category._id === category._id
        && app.answers.every((answer, index) => answer === answers[index])

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (app) {
                //cancel the old appointment
                const resCancel = await fetch(`${getApi()}/appointments/cancel`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ appointmentId: app._id })
                })
                if(!resCancel.ok){
                    setError(true)
                    return
                }
            }
            const resUpdate = await fetch(`${getApi()}/appointments/update`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    appointmentId: appId,
                    categoryId: category._id,
                    clientId: user._id,
                    answers
                })
            })
            if (resUpdate.ok) {
                const updatedClient = await resUpdate.json()
                sortEarlyToLate(updatedClient.appointments)
                dispatch(setUser(updatedClient))
                setAppointment(updatedClient.appointments.find(appointment => appointment._id === appId))
                setPage('confirmation')
            }
        } catch {
            setError(true)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="popup-page">
            <Title title={business.name} setPage={setPage} setPageTo={app ? 'confirmation' : 'home'} />
            <h4>Select Appointment Type:</h4>
            {business.categories.map(category =>
                <div key={category._id}>
                    <input
                        type="radio"
                        id={category.name}
                        className="category-radio"
                        name="category"
                        value={category._id}
                        onClick={e => {
                            const newCategory = business.categories.find(category => category._id === e.target.value)
                            setAnswers(prev => {
                                const newAnswers = prev.slice()
                                for (let i = 0; i < answers.length; i++) {
                                    newAnswers[i] = ""
                                }
                                return newAnswers
                            })
                            setAppId("")
                            setCategory(newCategory)
                        }}
                        required
                        defaultChecked={app && app.category._id === category._id}
                    />
                    <label htmlFor={category.name}>{category.name}</label>
                </div>
            )}
            {category && <h4>Select Appointment Slot:</h4>}
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
            {(appId && category.questions.length !== 0) && <h3>Please answer a few questions about the appointment:</h3>}
            {appId && category.questions.map((question, index) =>
                <div key={`question${index}`}>
                    <label htmlFor={`question${index}`} className="textarea-label">{question}</label>
                    <textarea
                        id={`question${index}`}
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
            {error && <p>Something went wrong with your request. Please try again later</p>}
            {appId && <input type="submit" value={app ? "Update Appointment" : "Request Appointment"} disabled={disableUpdate} />}        </form>
    )
}