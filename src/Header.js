import { useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export const Header = ({setPage}) => {
    const [dropDown, setDropDown] = useState(false)
    return (
        <header>
            <h1>Point<span>Mint</span></h1>
            <button
                onClick={e => {
                    e.preventDefault()
                    setDropDown(!dropDown)
                }}
            >
                <FontAwesomeIcon icon={faUser} />
                {dropDown &&
                    <div 
                        className="dropdown"
                    >
                        <p onClick={() => setPage('profile')}>Profile</p>
                        <p onClick={() => window.location.reload()}>Sign out</p>
                    </div>
                }
            </button>
        </header>
    )
}