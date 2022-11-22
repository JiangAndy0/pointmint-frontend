import { useState } from "react"
import { getApi } from "../helpers"
import { Title } from "../Title"

export const AddCategory = ({setPage, setTab, businessId, setUser}) => {
    const [name, setName] = useState("")
    const [questions, setQuestions] = useState([])
    const [error, setError] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
        const res = await fetch(`${getApi()}/categories/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({businessId, name, questions})
        })
        if(res.ok){
            const updatedBusiness = await res.json()
            setUser(updatedBusiness)
            setPage('home')
        } else {
            setError("Something went wrong with your request. Please try again later.")
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Title title="Add Category" setPage={setPage} setTab={setTab} setTabTo="categories"/>
            <label htmlFor="name">Category Name</label>
            <input 
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <h3>{"Questions for client (optional)"}</h3>
            {questions.map((question, index) => 
                <div key={`question${index}`}>
                    <label htmlFor={`question${index}`}>Question {index + 1}</label>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setQuestions(prev => prev.slice(0, index).concat(prev.slice(index + 1)))
                        }}
                    >
                        Delete
                    </button>
                    <textarea
                        id={`question${index}`}
                        value={questions[index]}
                        onChange={(e) => {
                            setQuestions(prev => {
                                const newQuestions = prev.slice()
                                newQuestions[index] = e.target.value
                                return newQuestions
                            })
                        }}
                        required 
                    />
                </div>
            )}
            <button
                onClick={(e) => {
                    e.preventDefault()
                    setQuestions(prev => {
                        const newQuestions = prev.slice()
                        newQuestions.push("")
                        return newQuestions
                    })
                }}
            >
                + Add Question
            </button>
            {error && <p>{error}</p>}
            <input 
                type="submit" 
                value="Add Category"
            />

        </form>
    )
}