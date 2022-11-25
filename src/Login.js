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

    return (
        <form onSubmit={handleSubmit} id="login">
            <h2>Log in to your account</h2>
            {status === 'failed' && <p className="error">Username or password incorrect</p>}
            <section>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </section>
            <section>
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
                class="link"
                onClick={e => {
                    e.preventDefault()
                    setPage('signup')
                }}
            >
                Don't have an account? Sign up
            </button>
        </form>
    )
}