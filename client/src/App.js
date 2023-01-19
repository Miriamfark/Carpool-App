import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';

function App() {

  const [cars, setCars] = useState([])

  // useEffect(() => {
  //   fetch('http://localhost:4000/cars')
  //   .then((r) => r.json())
  //   .then((data) => setCars(data))
  // })

  // const mappedCars = cars.map((car) => {
  //   return <li key={car.id}>{car.user}</li>
  // })

  return (
    <div className="App">
      <NavBar />
     <div>
      <ul>
        {/* {mappedCars} */}
      </ul>
     </div>
    </div>
  );
}

export default App;
