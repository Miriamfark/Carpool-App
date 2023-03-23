import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/usersSlice';
import { useSelector } from 'react-redux';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBBtn
} from 'mdb-react-ui-kit';

const NavBar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.users.user)

  function handleLogout() {
    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>          
      <MDBNavbarBrand href='/cars'>The Carpool App</MDBNavbarBrand>
      <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
          <MDBNavbarLink href='/me'>{user.name}'s Info</MDBNavbarLink>
          <MDBNavbarLink href='/kids'>Kids</MDBNavbarLink>
          <MDBNavbarLink href='/cars'>Browse All Cars</MDBNavbarLink>
          <MDBNavbarLink href='/my_cars'>My Carpools</MDBNavbarLink>
          <MDBBtn outline color="secondary" size="sm" type='button' onClick={handleLogout}>Log Out</MDBBtn>
        </MDBNavbarNav>
      </MDBContainer> 
    </MDBNavbar>
  )
}

export default NavBar