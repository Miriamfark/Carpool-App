import React from 'react'
import { MDBInput } from 'mdb-react-ui-kit';

const NamePasswordInput = ({ name, setName, password, setPassword }) => {
  return (
    <div>
        <MDBInput 
            wrapperClass='mb-4 mx-5 w-100' 
            size="lg"
            label='User Name' 
            id='form1' 
            type='text'  
            value={name}              
            onChange={(e) => setName(e.target.value)}
        />
        <MDBInput 
            wrapperClass='mb-4 mx-5 w-100' 
            size="lg"            
            label='Password' 
            id='form2'
            value={password} 
            type='password'
            onChange={(e) => setPassword(e.target.value)}
        />
    </div>
  )
}

export default NamePasswordInput