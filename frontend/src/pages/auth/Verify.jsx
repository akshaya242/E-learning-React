import React from 'react'
import "./Auth.css"
import { Link } from 'react-router-dom'

const Verify = () => {
    return(
    <div className="auth-page">
        <div className="auth-form">
        <h2>Verify Account</h2>
        <form>
            <label htmlFor="otp">Otp</label>
            <input type="number" required />
            <button className="common-btn">Verify</button>
        </form>
        <p>
            Go To <Link to={"/login"}>Login</Link> Page
         </p>
        </div>
        </div>
)
}

export default Verify
