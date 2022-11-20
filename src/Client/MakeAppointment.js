import { useState } from "react"
import { formatTime, getApi, sortEarlyToLate } from "../helpers"
import { Title } from "../Title"

export const MakeAppointment = ({ business, setPage, setUser, setAppointment, clientId, app }) => {
    const [category, setCategory] = useState(app ? app.category : "")
    const [appId, setAppId] = useState(app ? app._id : "")
    const [answers, setAnswers] = useState(app ? app.answers : [])
    const [error, setError] = useState(false)

    const disableUpdate = app && app._id === appId && app.category._id === category._id
        && app.answers.every((answer, index) => answer === answers[index])

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
                console.log("Successfully canceled old appointment :", resCancel)
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
                    clientId,
                    answers
                })
            })
            if (resUpdate.ok) {
                const updatedClient = await resUpdate.json()
                sortEarlyToLate(updatedClient.appointments)
                setUser(updatedClient)
                setAppointment(updatedClient.appointments.find(appointment => appointment._id === appId))
                setPage('confirmation')
            }
        } catch {
            setError(true)
        }
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
                            {`${appointment.date.month}/${appointment.date.day}/${appointment.date.year} `}
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
            {error && <p>Something went wrong with your request. Please try again later</p>}
            <input type="submit" value={app ? "Update Appointment" : "Request Appointment"} disabled={disableUpdate} />
        </form>
    )
}