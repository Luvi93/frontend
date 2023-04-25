import React, { useState } from 'react';
import Modal from 'react-modal';
import RegistrationForm from './RegistrationForm';

const EmployeeModal = ({ isOpen, onClose, editingEmployee, fetchEmployees }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const handleClose = () => {
    setModalIsOpen(false);
    onClose();
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={handleClose}>
      <h2>{editingEmployee ? 'Edit Employee' : 'Register Employee'}</h2>
      <RegistrationForm
        editingEmployee={editingEmployee}
        fetchEmployees={fetchEmployees}
        setModalIsOpen={setModalIsOpen}
        handleClose={handleClose}
      />
    </Modal>
  );
};

export default EmployeeModal;
