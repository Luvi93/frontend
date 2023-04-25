import React, { useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBNavbar,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";

const LoginPage = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div>
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand>
            {" "}
            <h4 className="m-1">Company Employee Registration</h4>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <div className="home-login">
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0 d-flex align-items-center">
            <MDBCol md="4">
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                alt="phone"
                className="rounded-t-5 rounded-tr-lg-0"
                fluid
              />
            </MDBCol>

            <MDBCol md="8">
              <MDBCardBody>
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="form1"
                    type="email"
                    name="email" 
                    value={formData.email}
                     onChange={handleChange}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="form2"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <MDBBtn className="mb-4 w-100">Login</MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      </div>
    </div>
  );
};

export default LoginPage;
