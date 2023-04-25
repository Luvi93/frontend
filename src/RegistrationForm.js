import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const RegistrationForm = ({
  editingEmployee,
  setEditingEmployee,
  fetchEmployees,
  updateEmployee,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        firstName: editingEmployee.firstName,
        lastName: editingEmployee.lastName,
        email: editingEmployee.email,
        age: editingEmployee.age,
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/register",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchEmployees();
    } catch (error) {
      console.error("Error creating employee", error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      await updateEmployee(editingEmployee.id, formData);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, formData);
        setEditingEmployee(null);
      } else {
        const token = localStorage.getItem("token");
        const dataString = JSON.stringify(formData);
        await axios.post("http://localhost:3001/api/register", dataString, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchEmployees();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error processing employee data", error);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div>
          <div id="myModal" class="modal">
            <div class="modal-content">
              <MDBContainer  fluid className="p-0 fluid">
                <MDBRow className="g-0 align-items-center">
                  <MDBCol col="6">
                    <MDBCard
                      className=""
                      style={{
                        background: "hsla(0, 0%, 100%, 0.55)",
                        backdropFilter: "blur(30px)",
                      }}
                    >
                      <MDBCardBody className=" shadow-5 text-center ">
                        <h2 className="fw-bold mb-5">
                          {editingEmployee ? "Edit Employee" : "Add Employee"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                          <MDBRow>
                            <MDBCol col="6">
                              <MDBInput
                                wrapperClass="mb-4"
                                label="First name"
                                id="form1"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                              />
                            </MDBCol>

                            <MDBCol col="6">
                              <MDBInput
                                wrapperClass="mb-4"
                                label="Last name"
                                id="form2"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                              />
                            </MDBCol>
                          </MDBRow>

                          <MDBInput
                            wrapperClass="mb-4"
                            label="Email"
                            id="form3"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Age"
                            id="form4"
                            type="number"
                            min="18"
                            max="100"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                          />

                          <MDBBtn
                            className="mb-4 w-100"
                            size="lg"
                            type="submit"
                          >
                            {editingEmployee ? "Update" : "Create"}
                          </MDBBtn>
                          <MDBBtn
                            className="w-100"
                            size="lg"
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Cancel
                          </MDBBtn>
                        </form>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
