import React from 'react';
import {
  MDBBtn,
} from "mdb-react-ui-kit";

const LogoutButton = ({ setLoggedIn, setUser }) => {
const handleLogout = () => {
  localStorage.removeItem('token');
  setLoggedIn(false);
  setUser(null); 
};

  return <MDBBtn onClick={handleLogout}>Logout</MDBBtn>;
};

export default LogoutButton;
