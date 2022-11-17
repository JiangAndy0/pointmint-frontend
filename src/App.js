import './App.css';
import { useState } from 'react';
import { Login } from './Login.js';
import { BusinessHome } from './Business/BusinessHome.js';
import { Client } from './Client/Client.js';
import { Signup } from './Signup';

function App() {
    const [user, setUser] = useState()
    const [page, setPage] = useState('login')
    return (
        <div className="App">
        {!user ? 
            <div>
                <h1>Point<span>Mint</span></h1>
                {page === 'login' && <Login setUser={setUser} setPage={setPage}/>}
                {page === 'signup' && <Signup setUser={setUser}/>}
            </div>
            :
            <div>
                {user.businessCode ? <BusinessHome user={user} setUser={setUser}/> : <Client user={user} setUser={setUser}/> }
            </div>
        } 
        </div>
    );
}

export default App;
