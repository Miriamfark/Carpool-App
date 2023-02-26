import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { signupUser } from '../../redux/usersSlice';
import { useNavigate } from 'react-router-dom';

function SignupForm() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        const user = {
            name,
            password,
            passwordConfirmation,
            email
        }
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
    })
    .then((r) => {
        if(!r.ok) {
            return r.json().then((e) => setErrors(Object.entries(e).toString()))
        } else {
            return r.json().then((data) => dispatch(signupUser(data)))
        }
    })
    navigate('/me')
}

  return (
    <div className="row container valign-wrapper">
        <form onSubmit={handleSubmit} className="col s8">
            <div className="row">
                <div className="input-field col s8">
                    <label>Username </label>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div className="input-field col s8">
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div className="input-field col s8">
                    <label>Confirm Password</label>
                    <input 
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                     ></input>
                </div>
                <div>
                    <label>Email Address</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    ></input>
                </div>
                <div className="input-field col s8">
                    <input className="btn" type="submit" value="Sign Up" />
                </div>
            </div>
        </form>
        { errors ? <h5>{errors}</h5> : null }
    </div>
  )
}

export default SignupForm