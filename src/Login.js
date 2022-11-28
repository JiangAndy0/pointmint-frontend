import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, updateUser } from "./app/userSlice"

export const Login = ({ setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const status = useSelector(selectStatus)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(updateUser({ endpoint: 'login', bodyObj: { username, password } }))
    }

    const handleTryBusiness = async(e) => {
        e.preventDefault()
        const businesses = [
            {username: 'jerrys123', password: 'abcdedcba'},
            {username: 'mackiehair11', password: '4321abcd'}
        ]
        const index = Math.floor(Math.random() * businesses.length)
        console.log(index)
        dispatch(updateUser({endpoint: 'login', bodyObj: businesses[index]}))
    }

    const handleTryClient = async(e) => {
        e.preventDefault()
        const clients = [
            {username: 'klient', password: 'abcd4321'},
            {username: 'pattycatty', password: 'efgh8765'}
        ]
        const index = Math.floor(Math.random() * clients.length)
        dispatch(updateUser({ endpoint: 'login', bodyObj: clients[index] }))
    }

    return (
        <form onSubmit={handleSubmit} className="start-form">
            <h2>Log in to your account</h2>
            {status === 'failed' && <p className="error">Username or password incorrect</p>}
            <section className="label-field">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </section>
            <section className="label-field">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                
            </section>
            <input type="submit" value="Log in" />
            <button
                className="link"
                onClick={e => {
                    e.preventDefault()
                    setPage('signup')
                }}
            >
                Don't have an account? Sign up
            </button>
            <hr></hr>
            <button
                className="full-width"
                onClick={handleTryBusiness}
            >
                Try out a business account <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
            </button>
            <button
                className="full-width"
                onClick={handleTryClient}
            >
                Try out a client account <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
            </button>
        </form>
    )
}