import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { userSelector, clearState, loginUser } from '../../redux/usersSlice';


const LoginForm = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(false)

    function handleLoginSubmit(e) {
        e.preventDefault()
        const user = {
            name,
            password
        }
        dispatch(loginUser(user))
        setName("")
        setPassword("")
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
    </div>
  )
}

export default LoginForm