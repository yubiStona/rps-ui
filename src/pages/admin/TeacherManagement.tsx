import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Table, 
  Modal, 
  Form, 
  Badge,
  InputGroup
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { mockTeachers } from '../../data/mockTeachers';
import { Teacher } from '../../types';

interface TeacherFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  gender: 'M' | 'F' | 'O';
  dob: string;
}

const TeacherManagement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormData>();

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(teacher =>
    teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (teacher.phone && teacher.phone.includes(searchTerm))
  );

  const onSubmit = async (data: TeacherFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingTeacher) {
        // Update existing teacher
        setTeachers(prev => prev.map(teacher => 
          teacher.id === editingTeacher.id 
            ? { 
                ...teacher, 
                ...data,
                updated_at: new Date().toISOString()
              }
            : teacher
        ));
      } else {
        // Add new teacher
        const newTeacher: Teacher = {
          id: teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1,
          ...data,
          phone: data.phone || null,
          address2: data.address2 || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setTeachers(prev => [...prev, newTeacher]);
      }
      
      setIsLoading(false);
      handleCloseModal();
    }, 1000);
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    reset({
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      email: teacher.email,
      phone: teacher.phone || '',
      address1: teacher.address1,
      address2: teacher.address2 || '',
      gender: teacher.gender,
      dob: teacher.dob
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setIsLoading(true);
      setTimeout(() => {
        setTeachers(prev => prev.filter(teacher => teacher.id !== id));
        setIsLoading(false);
      }, 500);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTeacher(null);
    reset({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      gender: 'M',
      dob: ''
    });
  };

  const handleAddNew = () => {
    setEditingTeacher(null);
    reset({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      gender: 'M',
      dob: ''
    });
    setShowModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getGenderBadge = (gender: 'M' | 'F' | 'O') => {
    const config = {
      'M': { label: 'Male', variant: 'primary' },
      'F': { label: 'Female', variant: 'danger' },
      'O': { label: 'Other', variant: 'info' }
    };
    return config[gender];
  };

  return (
    <>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold">Teacher Management</h2>
            <p className="text-muted">Manage teacher profiles and information</p>
          </div>
          <Button 
            variant="primary" 
            onClick={handleAddNew}
            className="d-flex align-items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Add Teacher
          </Button>
        </div>

        {/* Stats Cards */}
        <Row className="g-3 mb-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="fw-bold text-primary mb-2">{teachers.length}</h3>
                <p className="text-muted mb-0">Total Teachers</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="fw-bold text-success mb-2">
                  {teachers.filter(t => t.gender === 'M').length}
                </h3>
                <p className="text-muted mb-0">Male Teachers</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="fw-bold text-danger mb-2">
                  {teachers.filter(t => t.gender === 'F').length}
                </h3>
                <p className="text-muted mb-0">Female Teachers</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="text-center">
                <h3 className="fw-bold text-info mb-2">
                  {teachers.filter(t => t.gender === 'O').length}
                </h3>
                <p className="text-muted mb-0">Other</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Search Bar */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-3">
            <div className="d-flex align-items-center">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="fas fa-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 bg-light"
                  placeholder="Search teachers by name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Teachers Table */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
            <h5 className="mb-0">Teachers List</h5>
            <span className="text-muted">
              Showing {filteredTeachers.length} of {teachers.length} teachers
            </span>
          </Card.Header>
          <Card.Body className="p-0">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filteredTeachers.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-users fa-3x text-muted mb-3"></i>
                <h5>No teachers found</h5>
                <p className="text-muted">
                  {searchTerm ? 'Try a different search term' : 'Add your first teacher to get started'}
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Gender</th>
                      <th>Date of Birth</th>
                      <th>Joined On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((teacher) => {
                      const genderConfig = getGenderBadge(teacher.gender);
                      return (
                        <tr key={teacher.id}>
                          <td className="fw-semibold">#{teacher.id}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm bg-light rounded-circle d-flex align-items-center justify-content-center me-2">
                                <i className="fas fa-user text-primary"></i>
                              </div>
                              <div>
                                <div className="fw-semibold">
                                  {teacher.first_name} {teacher.last_name}
                                </div>
                                <small className="text-muted">
                                  {teacher.address1}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <a href={`mailto:${teacher.email}`} className="text-decoration-none">
                              {teacher.email}
                            </a>
                          </td>
                          <td>
                            {teacher.phone ? (
                              <a href={`tel:${teacher.phone}`} className="text-decoration-none">
                                {teacher.phone}
                              </a>
                            ) : (
                              <span className="text-muted">Not provided</span>
                            )}
                          </td>
                          <td>
                            <Badge bg={genderConfig.variant}>
                              {genderConfig.label}
                            </Badge>
                          </td>
                          <td>{formatDate(teacher.dob)}</td>
                          <td>{formatDate(teacher.created_at)}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleEdit(teacher)}
                                title="Edit"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(teacher.id)}
                                title="Delete"
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                              <Button
                                variant="outline-info"
                                size="sm"
                                title="View Details"
                              >
                                <i className="fas fa-eye"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Clean, Spacious Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        size="lg"
        centered
      >
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title className="fw-bold w-100">
            <div className="d-flex align-items-center gap-3 mb-2">
              <div className="bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center" 
                   style={{ width: '44px', height: '44px' }}>
                <i className={`fas ${editingTeacher ? 'fa-user-edit' : 'fa-user-plus'} text-white fs-5`}></i>
              </div>
              <div>
                <h5 className="mb-0">{editingTeacher ? 'Edit Teacher Profile' : 'Add New Teacher'}</h5>
                <small className="text-muted">
                  {editingTeacher ? 'Update teacher information' : 'Fill in the details to add a new teacher'}
                </small>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            {/* Personal Information Section */}
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center me-3">
                  <i className="fas fa-user text-primary"></i>
                </div>
                <h6 className="fw-bold mb-0">Personal Information</h6>
              </div>
              
              <Row className="g-4">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      First Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      {...register('first_name', { 
                        required: 'First name is required' 
                      })}
                      isInvalid={!!errors.first_name}
                      placeholder="Enter first name"
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.first_name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Last Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      {...register('last_name', { 
                        required: 'Last name is required' 
                      })}
                      isInvalid={!!errors.last_name}
                      placeholder="Enter last name"
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.last_name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      isInvalid={!!errors.email}
                      placeholder="teacher@university.edu"
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Phone Number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-light">
                        <i className="fas fa-phone"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="tel"
                        {...register('phone')}
                        placeholder="+1234567890"
                        className="py-2"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Gender <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      {...register('gender', { 
                        required: 'Gender is required' 
                      })}
                      isInvalid={!!errors.gender}
                      className="py-2"
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.gender?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Date of Birth <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      {...register('dob', { 
                        required: 'Date of birth is required' 
                      })}
                      isInvalid={!!errors.dob}
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dob?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </div>

            {/* Address Information Section */}
            <div className="mb-3">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center me-3">
                  <i className="fas fa-home text-primary"></i>
                </div>
                <h6 className="fw-bold mb-0">Address Information</h6>
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Address Line 1 <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  {...register('address1', { 
                    required: 'Address is required' 
                  })}
                  isInvalid={!!errors.address1}
                  placeholder="Street address, P.O. box, company name"
                  className="py-2"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address1?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="fw-semibold">Address Line 2 (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  {...register('address2')}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  className="py-2"
                />
              </Form.Group>
            </div>
          </Modal.Body>
          
          <Modal.Footer className="border-top-0">
            <Button 
              variant="outline-secondary" 
              onClick={handleCloseModal}
              className="px-4"
            >
              <i className="fas fa-times me-2"></i>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="px-4"
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  {editingTeacher ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <i className={`fas ${editingTeacher ? 'fa-save' : 'fa-plus'} me-2`}></i>
                  {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default TeacherManagement;