import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
        <Link className="navlink" to={'/'}>Home</Link>
        <Link className="navlink" to={'/cars'}>Browse Cars</Link>
        <Link className="navlink" to={'/kids'}>My Kids</Link>
        <Link className="navlink" to={'/logout'}>Logout</Link>
    </div>
  )
}

export default NavBar