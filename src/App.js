import './App.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Login } from './Login.js';
import { Business } from './Business/Business';
import { Client } from './Client/Client.js';
import { Signup } from './Signup';
import { selectUser } from './app/userSlice';


function App() {
    const user = useSelector(selectUser)
    const [page, setPage] = useState('login')
    return (
        <div className="App">
        {!user ? 
            <div>
                <h1>Point<span>Mint</span></h1>
                {page === 'login' && <Login setPage={setPage}/>}
                {page === 'signup' && <Signup setPage={setPage}/>}
            </div>
            :
            <div>
                {user.businessCode ? <Business/> : <Client/> }
            </div>
        } 
        </div>
    );
}

export default App;
