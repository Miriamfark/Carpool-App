import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/Login/Login';
import NavBar from './components/NavBar';
import Cars from './components/Cars/Cars';
import UserInfo from './components/UserInfo';
import UserCars from './components/Cars/UserCars';
import { fetchUser, clearState } from './redux/usersSlice';
import EditCar from './components/Cars/EditCar';
import EditKid from './components/Kids/EditKid'
import KidsList from './components/Kids/KidsList'
import RequestPending from './components/RequestPending';

function App() {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.users.user)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch, user?.id])

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
        <Route path="/request_pending/:id" element={<RequestPending />} />
      </Routes>
    </div>
  );
}

export default App;
