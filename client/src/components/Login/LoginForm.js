import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { userSelector, clearState, loginUser, fetchUser } from '../../redux/usersSlice';


const LoginForm = () => {

    const dispatch = useDispatch()
    const { isError, errorMessage } = useSelector(userSelector)

    const navigate = useNavigate()


    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(false)

    useEffect(() => {
        if (isError) {
            setErrors(errorMessage)
            dispatch(clearState())
        }
    }, [isError, dispatch, errorMessage])

    function handleLoginSubmit(e) {
        e.preventDefault()
        const user = {
            name,
            password
        }
        dispatch(loginUser(user))
        setName("")
        setPassword("")
        navigate('/me')
        // window.history.pushState({}, '', '/me')
        // window.location.reload();
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