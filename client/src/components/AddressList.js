import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddressList = ({ cars }) => {

  const id = useParams()
  const navigate = useNavigate()

  const car = cars && cars.filter((car) => car.id == id.carId)[0]
  const kids = car.kids
  const addresses = []

  kids.map((kid)=> {
    addresses.push(kid.address)
  })

  let unique = [...new Set(addresses)];

  return (
    <div>
        <h6>Carpool Route:</h6>
        <ul>
          {unique.map((address, index)=> <li key={index}>{address}</li>)}
        </ul>
        <button onClick={()=>navigate(-1)}>Hide Route</button>
    </div>
  )
}

export default AddressList