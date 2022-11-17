export const BusinessProfile = (
    {name, email, phone, businessCode, address,
    setName, setEmail, setPhone, setBusinessCode, setAddress}
) => {
    return (
        <div>
            <label htmlFor="name">Business Name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <label htmlFor="code">Business Code</label>
            <input
                type="text"
                id="code"
                value={businessCode}
                onChange={e => setBusinessCode(e.target.value)}
                minLength="6"
                required
            />
            <label htmlFor="email">Business Email</label>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <label htmlFor="phone">Business Phone Number</label>
            <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
            />
            <label>Business Address</label>
            <input
                placeholder="Street Number and Street"
                value={address[0]}
                onChange={e => setAddress(prev => {
                    const newAddress = prev.slice()
                    newAddress[0] = e.target.value
                    return newAddress
                })}
                required
            />
            <input
                placeholder="Apt/Unit#"
                value={address[1]}
                onChange={e => setAddress(prev => {
                    const newAddress = prev.slice()
                    newAddress[1] = e.target.value
                    return newAddress
                })}
            />
            <input
                placeholder="City"
                value={address[2]}
                onChange={e => setAddress(prev => {
                    const newAddress = prev.slice()
                    newAddress[2] = e.target.value
                    return newAddress
                })}
                required
            />
            <input
                placeholder="State"
                value={address[3]}
                onChange={e => setAddress(prev => {
                    const newAddress = prev.slice()
                    newAddress[3] = e.target.value
                    return newAddress
                })}
                required
            />
            <input
                placeholder="ZIP Code"
                value={address[4]}
                inputMode="numeric"
                onChange={e => setAddress(prev => {
                    const newAddress = prev.slice()
                    newAddress[4] = e.target.value
                    return newAddress
                })}
                required
            />
        </div>
    )
}