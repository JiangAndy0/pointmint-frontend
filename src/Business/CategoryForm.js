import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, selectUser, updateUser } from "../app/userSlice"
import { Title } from "../Title"

export const CategoryForm = ({setPage, setTab, category}) => {
    const user = useSelector(selectUser)
    const status = useSelector(selectStatus)
    const [name, setName] = useState(category ? category.name : "")
    const [questions, setQuestions] = useState(category && category.questions ? category.questions : [])
    //input fields are disabled if there is an appointment already with a client in this category
    const disabled = category && user.appointments.some(app => app.client && app.category._id === category._id)

    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const bodyObj = category 
            ? {businessId: user._id, name, questions, categoryId: category._id} 
            : {businessId: user._id, name, questions}
        dispatch(updateUser({
            endpoint: `categories/${category ? 'update' : 'add'}`,
            bodyObj
        }))
        if(status === 'succeeded'){
            setPage('home')
        }
    }

    const handleDelete = async(e) => {
        e.preventDefault()
        dispatch(updateUser({
            endpoint: 'categories/delete', 
            bodyObj: {businessId: user._id, categoryId: category._id}
        }))
        if(status === 'succeeded'){
            setPage('home')
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
            {status === 'failed' && <p>Something went wrong with your request. Please try again later</p>}
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