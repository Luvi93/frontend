import React, { useState, useEffect } from "react";
import axios from "axios";
import RegistrationForm from "./RegistrationForm";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const EmployeeList = ({ loggedIn }) => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [loggedIn]);

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const createEmployee = async (employeeData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/register",
        employeeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error creating employee", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const updateEmployee = async (id, employeeData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3001/api/employees/${id}`,
        employeeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  return (
    <div >
        <MDBContainer>
        <h2 class="mt-5 my-4 text-lg-start">Employees</h2>
      <p className="text-lg-start">
      The employee table identifies every employee by an employee email, name, last name and age and lists basic personnel information.
    </p>
        </MDBContainer>

        <MDBContainer>
    <section class="table-responsive">
            <MDBContainer>
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Firs name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Age</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="text-muted mb-0">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td>{employee.firstName}</td>
                <td>
                  <p className="text-muted mb-0">{employee.lastName}</p>
                </td>
                <td>
                  <MDBBadge color="success" pill>
                    {employee.age}
                  </MDBBadge>
                </td>

                <td>
                  <MDBBtn
                    color="link"
                    rounded
                    size="md a"
                    
                    onClick={() => handleEditEmployee(employee)}
                  >
                    Edit
                  </MDBBtn>
                  <MDBBtn
                    color="danger"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    </section>
    </MDBContainer>

      <MDBContainer className="my-4">
        <MDBRow className="g-0 align-items-center">
          <MDBCol col="6">
            <MDBCard
              className="my-3"
              style={{
                background: "hsla(0, 0%, 100%, 0.55)",
                backdropFilter: "blur(30px)",
              }}
            >
              <MDBCardBody className="p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Create Employee</h2>
                <form onSubmit={createEmployee}>
                  <MDBRow>
                    <MDBCol col="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="First name"
                        id="form1"
                        type="text"
                        name="firstName"
                        required
                      />
                    </MDBCol>

                    <MDBCol col="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Last name"
                        id="form2"
                        type="text"
                        name="lastName"
                        required
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="form3"
                    type="email"
                    name="email"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Age"
                    id="form4"
                    type="number"
                    name="age"
                    min="18"
                    max="100"
                    required
                  />
                  <MDBBtn size="md" type="submit">
                    Create
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {editingEmployee && (
        <RegistrationForm
          editingEmployee={editingEmployee}
          setEditingEmployee={setEditingEmployee}
          fetchEmployees={fetchEmployees}
          updateEmployee={updateEmployee}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default EmployeeList;
