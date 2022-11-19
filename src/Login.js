import { useState } from "react"
import { getApi } from "./helpers"

export const Login = ({setUser, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const api = getApi()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await fetch(`${api}/login`, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        if(res.ok){
            setError(false)
            const json = await res.json()
            setUser(json)
        } else {
            setError(true)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log in to your account</h2>
            {error && <p>Username or password incorrect</p>}
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