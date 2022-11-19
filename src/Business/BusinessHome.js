import React from "react"
import { Header } from "../Header"

export const BusinessHome = ({user, setPage}) => {
    return(
        <div>
            <Header setPage={setPage}/>
            <p>Your Business Code:</p>
            <p>{user.businessCode}</p>
        </div>
    )
}