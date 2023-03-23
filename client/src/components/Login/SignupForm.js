import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { signupUser } from '../../redux/usersSlice';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import NamePasswordInput from './NamePasswordInput';
import Errors from '../Errors';

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
            return r.json().then((e) => setErrors(Object.values(e).toString()))
        } else {
            return r.json().then((data) => dispatch(signupUser(data)))
        }
    })
    navigate('/me')
}

  return (
    <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
        <p className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}><MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>Sign Up</p>
        <form onSubmit={handleSubmit}>
               <NamePasswordInput 
               name={name}
               setName={setName}
               password={password}
               setPassword={setPassword}
               />
                <MDBInput 
                    wrapperClass='mb-4 mx-5 w-100' 
                    size="lg"            
                    label='Confirm Password' 
                    value={passwordConfirmation} 
                    type='password'
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <MDBInput 
                    wrapperClass='mb-4 mx-5 w-100' 
                    size="lg"            
                    label='Email Address' 
                    value={email} 
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <MDBBtn 
                    className="mb-4 px-5 mx-5 w-100"
                    size='lg'
                >Sign Up</MDBBtn>
        </form>
        <Errors errors={errors} />
    </div>
  )
}

export default SignupForm