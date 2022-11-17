import './App.css';
import { useState } from 'react';
import { Login } from './Login.js';
import { BusinessHome } from './Business/BusinessHome.js';
import { Client } from './Client/Client.js';

function App() {
    const [user, setUser] = useState()
    return (
        <div className="App">
        {!user ? 
            <Login setUser={setUser} /> :
            <div>
                {user.businessCode ? <BusinessHome user={user} setUser={setUser}/> : <Client user={user} setUser={setUser}/> }
            </div>
        } 
        </div>
    );
}

export default App;
