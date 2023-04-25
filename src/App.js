import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeList from "./EmployeeList";
import RegistrationForm from "./RegistrationForm";
import LoginPage from "./LoginPage";
import LogoutButton from "./LogoutButton";
import EmployeeModal from "./EmployeeModal";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,

} from "mdb-react-ui-kit";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("http://localhost:3001/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
  };

  const closeEditModal = () => {
    setEditingEmployee(null);
  };

  if (!loggedIn) {
    return <LoginPage setLoggedIn={setLoggedIn} />;
  }

  return (
    <div className="App">
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand>
            {" "}
            <h4 className="m-1">Company Employee Registration</h4>
          </MDBNavbarBrand>
          <LogoutButton setLoggedIn={setLoggedIn} setUser={setUser} />
        </MDBContainer>
      </MDBNavbar>

      <RegistrationForm />
      <EmployeeList loggedIn={loggedIn} openEditModal={openEditModal} />
      {editingEmployee && (
        <EmployeeModal
          employee={editingEmployee}
          closeEditModal={closeEditModal}
        />
      )}
    </div>
  );
}

export default App;
