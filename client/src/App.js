import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom"
import { useSelector } from 'react-redux';
import './App.css';
import KidsList from './components/KidsList';
import Login from './components/Login/Login';
import NavBar from './components/NavBar';
import Cars from './components/Cars';
import UserInfo from './components/UserInfo';
import { fetchUser } from './redux/usersSlice';
import EditKid from './components/EditKid';

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
      <div>
       <h1>Welcome {user.name}</h1>
     </div>
      <Routes>
        <Route path="/cars" element={<Cars />}/>
        <Route path="/kids" element={<KidsList />}>
          <Route path=":kidId" element={<EditKid kids={user.kids}/>} />
        </Route>
        <Route path="/me" element={<UserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
