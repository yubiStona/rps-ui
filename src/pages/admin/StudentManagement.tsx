import React, { useState } from 'react';
import { Row, Col, Card, Button, Table, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import DashboardLayout from '../../layouts/DashboardLayout';
import { mockStudents } from '../../data/mockData';
import { Student } from '../../types';

interface StudentForm {
  registrationNo: string;
  name: string;
  email: string;
  faculty: string;
  program: string;
  semester: number;
  contact: string;
}

const StudentManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentForm>();

  const onSubmit = async (data: StudentForm) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingStudent) {
        // Update existing student
        setStudents(prev => prev.map(student => 
          student.id === editingStudent.id 
            ? { ...student, ...data }
            : student
        ));
      } else {
        // Add new student
        const newStudent: Student = {
          id: Date.now().toString(),
          ...data,
          createdAt: new Date()
        };
        setStudents(prev => [...prev, newStudent]);
      }
      
      setIsLoading(false);
      handleCloseModal();
    }, 1000);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    reset(student);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setIsLoading(true);
      setTimeout(() => {
        setStudents(prev => prev.filter(student => student.id !== id));
        setIsLoading(false);
      }, 500);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    reset();
  };

  const handleAddNew = () => {
    setEditingStudent(null);
    reset({
      registrationNo: '',
      name: '',
      email: '',
      faculty: '',
      program: '',
      semester: 1,
      contact: ''
    });
    setShowModal(true);
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Student Management</h2>
          <p className="text-muted">Manage student registrations and information</p>
        </div>
        <Button variant="primary" onClick={handleAddNew}>
          + Add Student
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Registered Students</h5>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>Reg No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Faculty</th>
                    <th>Program</th>
                    <th>Semester</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.registrationNo}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.faculty}</td>
                      <td>{student.program}</td>
                      <td>{student.semester}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingStudent ? 'Edit Student' : 'Register New Student'}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="registrationNo" className="form-label">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    {...register('registrationNo', { required: 'Registration number is required' })}
                    className={`form-control ${errors.registrationNo ? 'is-invalid' : ''}`}
                  />
                  {errors.registrationNo && (
                    <div className="invalid-feedback">{errors.registrationNo.message}</div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name.message}</div>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">Contact</label>
                  <input
                    type="tel"
                    {...register('contact', { required: 'Contact is required' })}
                    className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                  />
                  {errors.contact && (
                    <div className="invalid-feedback">{errors.contact.message}</div>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="faculty" className="form-label">Faculty</label>
                  <select
                    {...register('faculty', { required: 'Faculty is required' })}
                    className={`form-control ${errors.faculty ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select Faculty</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                  </select>
                  {errors.faculty && (
                    <div className="invalid-feedback">{errors.faculty.message}</div>
                  )}
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="program" className="form-label">Program</label>
                  <select
                    {...register('program', { required: 'Program is required' })}
                    className={`form-control ${errors.program ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select Program</option>
                    <option value="BSc Computer Science">BSc Computer Science</option>
                    <option value="BSc Information Technology">BSc Information Technology</option>
                    <option value="Bachelor of Business Administration">Bachelor of Business Administration</option>
                  </select>
                  {errors.program && (
                    <div className="invalid-feedback">{errors.program.message}</div>
                  )}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label htmlFor="semester" className="form-label">Semester</label>
                  <select
                    {...register('semester', {
                      required: 'Semester is required',
                      valueAsNumber: true,
                    })}
                    className={`form-control ${errors.semester ? 'is-invalid' : ''}`}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                  {errors.semester && (
                    <div className="invalid-feedback">{errors.semester.message}</div>
                  )}
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {editingStudent ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                editingStudent ? 'Update Student' : 'Register Student'
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default StudentManagement;