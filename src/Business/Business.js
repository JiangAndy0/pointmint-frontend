import { useState } from "react"
import { BusinessHome } from "./BusinessHome"
import { BusinessProfileEdit } from "./BusinessProfileEdit"

export const Business = ({user, setUser}) => {
    const [page, setPage] = useState("home")
    return(
        <div>
            {page === 'home' && <BusinessHome user={user} setPage={setPage}/>}
            {page === 'profile' && <BusinessProfileEdit user={user} setUser={setUser} setPage={setPage}/>}
        </div>
    )
}