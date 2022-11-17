export const ClientProfile = (
    {firstName, lastName, email, phone,
    setFirstName, setLastName, setEmail, setPhone}
) => {
    return (
        <div>
            <label htmlFor="firstName">First Name</label>
            <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <label htmlFor="phone">Phone Number</label>
            <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
            />
        </div>
    )    
}