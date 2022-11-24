import { useState } from "react"
import { getApi, sortEarlyToLate } from "../helpers"
import { Title } from "../Title"

export const CategoryForm = ({setPage, setTab, businessId, setUser, category, appointments}) => {
    const [name, setName] = useState(category ? category.name : "")
    const [questions, setQuestions] = useState(category && category.questions ? category.questions : [])
    const [error, setError] = useState("")

    //input fields are disabled if there is an appointment already with a client in this category
    const disabled = category && appointments.some(app => app.client && app.category._id === category._id)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
        const bodyObj = category ? {businessId, name, questions, categoryId: category._id} : {businessId, name, questions}
        const res = await fetch(`${getApi()}/categories/${category ? 'update' : 'add'}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        })
        if(res.ok){
            const updatedBusiness = await res.json()
            sortEarlyToLate(updatedBusiness.appointments)
            setUser(updatedBusiness)
            setPage('home')
        } else {
            setError("Something went wrong with your request. Please try again later.")
        }
    }

    const handleDelete = async(e) => {
        e.preventDefault()
        setError("")
        const res = await fetch(`${getApi()}/categories/delete`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({businessId, categoryId: category._id})
        })
        if(res.ok){
            const updatedBusiness = await res.json()
            sortEarlyToLate(updatedBusiness.appointments)
            setUser(updatedBusiness)
            setPage('home')
        } else {
            setError("Something went wrong with deleting this category. Please try again later.")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Title title={category ? "Edit Category" : "Add Category"} setPage={setPage} setTab={setTab} setTabTo="categories"/>
            {disabled && <p>Edit and Delete disabled because clients have appointments with this category</p>}
            <label htmlFor="name">Category Name</label>
            <input 
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                disabled={disabled}
            >
                + Add Question
            </button>
            {error && <p>{error}</p>}
            <input 
                type="submit" 
                value={category ? "Save Changes" : "Add Category"}
                disabled={
                    category 
                    && category.name === name 
                    && questions.length === category.questions.length
                    && questions.every((q, i) => questions[i] === category.questions[i])
                }
            />
            {category && 
                <button
                    disabled={disabled}
                    onClick={handleDelete}
                >
                    Delete Category
                </button>
            }
        </form>
    )
}