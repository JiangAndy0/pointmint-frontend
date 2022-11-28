import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons"

export const BusinessProfile = (
    { name, email, phone, businessCode, address,
        setName, setEmail, setPhone, setBusinessCode, setAddress }
) => {
    return (
        <div id="business-profile" className="profile-fields">
            <div className="label-field">
                <label htmlFor="name">Business Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
            <div className="label-field">
                <label htmlFor="code">
                    Business Code
                    <div className="info-hover">
                        <FontAwesomeIcon icon={faCircleQuestion}/>
                        <p>
                            {`Your business code is what your clients will use to gain access to all your appointment slots. 
                            It's best to keep it simple and related to your business name 
                            (i.e. "juan-catering" or "flowerville-shop").`}
                        </p>
                    </div>
                </label>
                <input
                    type="text"
                    id="code"
                    value={businessCode}
                    onChange={e => setBusinessCode(e.target.value)}
                    minLength="6"
                    required
                />
            </div>
            <div className="label-field">
                <label htmlFor="email">Business Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="label-field">
                <label htmlFor="phone">Business Phone Number</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                />
            </div>
            <div className="label-field" id="business-address">
                <label>Business Address</label>
                <input
                    type="text"
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
                    type="text"
                    placeholder="Apt/Unit#"
                    value={address[1]}
                    onChange={e => setAddress(prev => {
                        const newAddress = prev.slice()
                        newAddress[1] = e.target.value
                        return newAddress
                    })}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={address[2]}
                    onChange={e => setAddress(prev => {
                        const newAddress = prev.slice()
                        newAddress[2] = e.target.value
                        return newAddress
                    })}
                    required
                />
                <div id="state-zip-row">
                    <input
                        type="text"
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
                        type="text"
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
            </div>
        </div>
    )
}