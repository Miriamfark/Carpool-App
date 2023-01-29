import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/usersSlice';
import { useSelector } from 'react-redux';

const NavBar = () => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.users.user)
  console.log(user)

  function handleLogout() {
    dispatch(logoutUser())
  }

  return (
    <div>
        <Link to={'/me'}>{user.name}'s Info</Link>
        <Link to={'/cars'}>Browse All Cars</Link>
        <Link to={'/kids'}>My Kids</Link>
        <Link to={'/logout'} onClick={handleLogout}>Logout</Link>
    </div>
  )
}

export default NavBar