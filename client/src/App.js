import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
import './App.css';
import KidsList from './Kids/KidsList';
import Login from './components/Login/Login';
import NavBar from './components/NavBar';
import Cars from './components/Cars/Cars';
import UserInfo from './components/UserInfo';
import UserCars from './components/Cars/UserCars';
import { fetchUser } from './redux/usersSlice';
import EditKid from './Kids/EditKid';
import EditCar from './components/Cars/EditCar';

function App() {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.users.user)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if (!user) return <Login />;

  return (
    <div className='App'>
      <NavBar /> 
      <Routes>
        <Route path="/cars" element={<Cars />} />
        <Route path="/search?/:searchTerm" element={<Cars/>} />
        <Route path="/kids" element={<KidsList />}>
          <Route path=":kidId" element={<EditKid kids={user.kids}/>} />
        </Route>
        <Route path="/me" element={<UserInfo />} />
        <Route path="/my_cars" element={<UserCars />} >
          <Route path=":carId" element={<EditCar cars={user.cars} user={user}/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
