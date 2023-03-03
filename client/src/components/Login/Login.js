import React, { useState } from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
  }
  from 'mdb-react-ui-kit';

const Login = () => {

    const [showSignup, setShowSignup] = useState(false)
    

  return (
    <MDBContainer fluid> 
        <MDBRow>
            <MDBCol sm='6'>
                <div className='d-flex flex-row ps-5 pt-5'>
                    <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
                    <span className="h1 fw-bold mb-0">The Carpool App</span>
                </div>     
    { showSignup ? (
            <div>
                <SignupForm /> 
                <p className='ms-5'>Already have an account?  
                    <MDBBtn onClick={()=>setShowSignup(!showSignup)} >Log In Here</MDBBtn>
                </p>
            </div>
        ) : (
            <div>
                <LoginForm />
                <p className='ms-5'>Don't have an account?  
                    <MDBBtn onClick={()=>setShowSignup(!showSignup)} >Register Here</MDBBtn>
                </p>
            </div>
        )
        }
            </MDBCol>

            <MDBCol sm='6' className='d-none d-sm-block px-0'>
                <img src="https://www.care.com/c/wp-content/uploads/sites/2/2021/04/LaurenGarcia-201909252109059744-1620x1080.jpg.optimal.jpg"
                alt="Login image" className="w-100 vh-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  )
}

export default Login