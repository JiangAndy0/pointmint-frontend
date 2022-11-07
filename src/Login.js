import { useState } from "react"

export const Login = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await fetch("http://localhost:5500/login", {
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
            {error && <span>Username or password incorrect</span>}
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
            <input type="submit" value="Sign in"/>
        </form>
    )
}