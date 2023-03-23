import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/usersSlice';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import NamePasswordInput from './NamePasswordInput';
import Errors from './Errors';

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
                return r.json().then((e) => setErrors(Object.values(e)))
            } else {
                return r.json().then((data) => dispatch(loginUser(data)))
            }
        })
        setName("")
        setPassword("")
        navigate('/me')
    }

  return (
    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
        <p className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}><MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>Log in</p>
        <form onSubmit={handleLoginSubmit}>
        <NamePasswordInput 
        name={name}
        setName={setName} 
        password={password}
        setPassword={setPassword}
        />
       
        <MDBBtn 
            className="mb-4 px-5 mx-5 w-100"
            size='lg'
        >Log in</MDBBtn>
        </form>
        <Errors errors={errors} />
    </div>
  )
}

export default LoginForm