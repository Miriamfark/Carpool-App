import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/usersSlice';


const LoginForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(false)

    function handleLoginSubmit(e) {
        e.preventDefault()
        const user = {
            name,
            password
        }
        fetch('login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then((r) => {
            if (!r.ok) {
                return r.json().then((e) => setErrors(Object.entries(e).toString()))
            } else {
                return r.json().then((data) => dispatch(loginUser(data)))
            }
        })
        setName("")
        setPassword("")
        navigate('/me')
    }

  return (
    <div>
        <form onSubmit={handleLoginSubmit}>
            <div>
                <label>Username</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ></input>
            </div>
            <div>
                <label>Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></input>
            </div>
            <div>
                <input type="submit"></input>
            </div>
        </form>
        { errors ? <h5>{errors}</h5> : null }
    </div>
  )
}

export default LoginForm