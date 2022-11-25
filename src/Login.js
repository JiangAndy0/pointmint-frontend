import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, updateUser } from "./app/userSlice"

export const Login = ({setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const status = useSelector(selectStatus)

    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault()
        dispatch(updateUser({endpoint: 'login', bodyObj: {username, password}}))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log in to your account</h2>
            {status === 'failed' && <p>Username or password incorrect</p>}
            <label htmlFor="username">Username</label>
            <input 
                id="username" 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input 
                id="password" 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <input type="submit" value="Log in"/>
            <button 
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