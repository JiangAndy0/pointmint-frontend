import { useState } from "react"
import { formatTime, getApi, sortEarlyToLate } from "../helpers"

export const MakeAppointment = ({ business, setPage, setUser, setLastAppointment, clientId }) => {
    const [category, setCategory] = useState()
    const [appointment, setAppointment] = useState()
    const [answers, setAnswers] = useState([])
    const [error, setError] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${getApi()}/appointments/update`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    appointmentId: appointment, 
                    categoryId: category._id, 
                    clientId,
                    answers
                })
            })
            if(res.ok){
                const updatedClient = await res.json()
                sortEarlyToLate(updatedClient.appointments)
                setUser(updatedClient)
                setLastAppointment(appointment)
                setPage('confirmation')
            }
        } catch {
            setError(true)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>
                {business.name}
                <button onClick={e => {
                    e.preventDefault()
                    setPage('default')
                }}>
                    ✖
                </button>
            </h1>
            <p>Select Appointment Type:</p>
            {business.categories.map(category => {
                return (
                    <div key={category._id}>
                        <input 
                            type="radio" 
                            id={category.name} 
                            name="category" 
                            value={category._id}
                            onClick={e => {
                                const newCategory = business.categories.find(category => category._id === e.target.value)
                                for(let i = 0; i < answers.length; i++){
                                    answers[i] = ""
                                }
                                setCategory(newCategory)
                            }}
                            required 
                        />
                        <label htmlFor={category.name}>{category.name}</label>
                    </div>
                )
            }
            )}
            <p>Select Appointment Slot:</p>
            { category && business.appointments
                .filter(appointment => 
                    appointment.categories.some(cat => cat._id === category._id)
                )
                .map(appointment => {
                return(
                    <div key={appointment._id}>
                        <input 
                            type="radio"
                            id={appointment._id}
                            name="slot"
                            value={appointment._id}
                            onClick={e => setAppointment(e.target.value)}
                            disabled={Boolean(appointment.client)}
                            required
                        />
                        <label htmlFor={appointment._id}>
                            {`${appointment.date.month}/${appointment.date.day}/${appointment.date.year} `} 
                            {formatTime(appointment.startTime)}-
                            {formatTime(appointment.endTime)}
                        </label>
                    </div>
                )
            })}
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
            <input type="submit" value="Request Appointment"/>
        </form>
    )
}