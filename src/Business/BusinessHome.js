import React from "react"
export const BusinessHome = ({user}) => {
    return(
        <div>
            <p>Your Business Code:</p>
            <p>{user.businessCode}</p>
        </div>
    )
}