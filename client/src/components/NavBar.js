import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/usersSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.users.user)
  console.log(user)

  function handleLogout() {
    dispatch(logoutUser())
    Navigate('/')
  }

  return (
    <div>
        <Link to={'/me'}>{user.name}'s Info</Link>
        <Link to={'/cars'}>Browse All Cars</Link>
        <Link to={'/kids'}>My Kids</Link>
        <Link to={'/my_cars'}>My Cars</Link>
        <Link to={'/logout'} onClick={handleLogout}>Logout</Link>
        
    </div>
  )
}

export default NavBar