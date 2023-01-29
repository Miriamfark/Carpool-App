import React, { useState } from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'


const Login = () => {

    const [showSignup, setShowSignup] = useState(false)
    

  return (
    <div>
        { showSignup ? (
            <>
                <SignupForm /> 
                <p>Already have an account?</p>
                <button  onClick={()=>setShowSignup(!showSignup)} >Log In Here</button>
            </>
        ) : (
            <>
                <LoginForm />
                <p>Don't have an account?</p>
                <button onClick={()=>setShowSignup(!showSignup)} >Sign Up Here</button>
            </>
        )
        }
    </div>
  )
}

export default Login