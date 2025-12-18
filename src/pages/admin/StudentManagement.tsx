import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Badge, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import DashboardLayout from '../../layouts/DashboardLayout';
import StudentFormModal from './partials/StudentFormModal';
import DeleteConfirmationModal from './partials/DeleteConfirmationModal';
import { mockStudents } from '../../data/mockData';

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  roll_no: string;
  enrollment_date: string;
  status: 'A' | 'P' | 'S';
  registration_no: string;
  gender: 'M' | 'F' | 'O';
  dob: string;
  address1: string;
  address2: string | null;
  current_semester: number;
  program_id: number;
  program_name?: string;
  is_passed: number;
  created_at?: string;
  updated_at?: string;
}

interface StudentForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  roll_no: string;
  enrollment_date: string;
  status: 'A' | 'P' | 'S';
  registration_no: string;
  gender: 'M' | 'F' | 'O';
  dob: string;
  address1: string;
  address2: string;
  current_semester: number;
  program_id: number;
  is_passed: number;
}

const mockPrograms = [
  { id: 1, name: 'BSc Computer Science' },
  { id: 2, name: 'BSc Information Technology' },
  { id: 3, name: 'Bachelor of Business Administration' },
  { id: 4, name: 'BSc Electrical Engineering' },
  { id: 5, name: 'Bachelor of Commerce' },
];

const ITEMS_PER_PAGE = 5;

const StudentManagement: React.FC = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isLoading, setIsLoading] = useState(false);
  const [programs] = useState(mockPrograms);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [passedFilter, setPassedFilter] = useState<string>('all');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentForm>();

  // Filter students based on search term and filters
  const filteredStudents = students.filter(student => {
    // Text search
    const matchesSearch =
        student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.roll_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.registration_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone.includes(searchTerm);

    // Status filter
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;

    // Program filter
    const matchesProgram = programFilter === 'all' || student.program_id.toString() === programFilter;

    // Semester filter
    const matchesSemester = semesterFilter === 'all' || student.current_semester.toString() === semesterFilter;

    // Passed filter
    const matchesPassed = passedFilter === 'all' ||
        (passedFilter === 'passed' && student.is_passed === 1) ||
        (passedFilter === 'studying' && student.is_passed === 0);

    return matchesSearch && matchesStatus && matchesProgram && matchesSemester && matchesPassed;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, programFilter, semesterFilter, passedFilter]);

  const onSubmit = async (data: StudentForm) => {
    setIsLoading(true);

    setTimeout(() => {
      if (editingStudent) {
        setStudents(prev => prev.map(student =>
            student.id === editingStudent.id
                ? {
                  ...student,
                  ...data,
                  updated_at: new Date().toISOString()
                }
                : student
        ));
      } else {
        const newStudent: Student = {
          id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          program_name: programs.find(p => p.id === data.program_id)?.name
        };
        setStudents(prev => [...prev, newStudent]);
      }

      setIsLoading(false);
      handleCloseFormModal();
    }, 1000);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    reset({
      ...student,
      address2: student.address2 || '',
      enrollment_date: student.enrollment_date.split('T')[0],
      dob: student.dob.split('T')[0]
    });
    setShowFormModal(true);
  };

  const handleDeleteClick = (student: Student) => {
    setDeletingStudent(student);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingStudent) return;

    setIsLoading(true);
    setTimeout(() => {
      setStudents(prev => prev.filter(student => student.id !== deletingStudent.id));
      setIsLoading(false);
      handleCloseDeleteModal();
    }, 500);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingStudent(null);
    reset({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      roll_no: '',
      enrollment_date: new Date().toISOString().split('T')[0],
      status: 'A',
      registration_no: '',
      gender: 'M',
      dob: '',
      address1: '',
      address2: '',
      current_semester: 1,
      program_id: 1,
      is_passed: 0
    });
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingStudent(null);
  };

  const handleAddNew = () => {
    setEditingStudent(null);
    reset({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      roll_no: '',
      enrollment_date: new Date().toISOString().split('T')[0],
      status: 'A',
      registration_no: '',
      gender: 'M',
      dob: '',
      address1: '',
      address2: '',
      current_semester: 1,
      program_id: 1,
      is_passed: 0
    });
    setShowFormModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: 'A' | 'P' | 'S') => {
    switch(status) {
      case 'A': return <Badge bg="success">Active</Badge>;
      case 'P': return <Badge bg="warning">Pending</Badge>;
      case 'S': return <Badge bg="secondary">Suspended</Badge>;
      default: return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const getGenderBadge = (gender: 'M' | 'F' | 'O') => {
    const config = {
      'M': { label: 'Male', variant: 'primary' },
      'F': { label: 'Female', variant: 'danger' },
      'O': { label: 'Other', variant: 'info' }
    };
    return config[gender];
  };

  const getPassedStatus = (is_passed: number) => {
    return is_passed === 1 ?
        <Badge bg="success" className="mt-1">Passed</Badge> :
        <Badge bg="info" className="mt-1">Studying</Badge>;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setProgramFilter('all');
    setSemesterFilter('all');
    setPassedFilter('all');
  };

  return (
      <DashboardLayout>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold">Student Management</h2>
              <p className="text-muted">Manage student registrations and information</p>
            </div>
            <Button
                variant="primary"
                onClick={handleAddNew}
                className="d-flex align-items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              Add Student
            </Button>
          </div>

          {/* Stats Cards */}
          <Row className="g-3 mb-4">
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center">
                  <h3 className="fw-bold text-primary mb-2">{students.length}</h3>
                  <p className="text-muted mb-0">Total Students</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center">
                  <h3 className="fw-bold text-success mb-2">
                    {students.filter(s => s.status === 'A').length}
                  </h3>
                  <p className="text-muted mb-0">Active Students</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center">
                  <h3 className="fw-bold text-warning mb-2">
                    {students.filter(s => s.status === 'P').length}
                  </h3>
                  <p className="text-muted mb-0">Pending Students</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center">
                  <h3 className="fw-bold text-danger mb-2">
                    {students.filter(s => s.is_passed === 1).length}
                  </h3>
                  <p className="text-muted mb-0">Passed Out</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Search and Filters Section */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-3">
              <Row className="g-3">
                {/* Search Bar */}
                <Col md={4}>
                  <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                    <input
                        type="text"
                        className="form-control border-0 bg-light"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </Col>

                {/* Status Filter */}
                <Col md={2}>
                  <Form.Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-light border-0"
                  >
                    <option value="all">All Status</option>
                    <option value="A">Active</option>
                    <option value="P">Pending</option>
                    <option value="S">Suspended</option>
                  </Form.Select>
                </Col>

                {/* Program Filter */}
                <Col md={2}>
                  <Form.Select
                      value={programFilter}
                      onChange={(e) => setProgramFilter(e.target.value)}
                      className="bg-light border-0"
                  >
                    <option value="all">All Programs</option>
                    {programs.map(program => (
                        <option key={program.id} value={program.id}>
                          {program.name}
                        </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Semester Filter */}
                <Col md={2}>
                  <Form.Select
                      value={semesterFilter}
                      onChange={(e) => setSemesterFilter(e.target.value)}
                      className="bg-light border-0"
                  >
                    <option value="all">All Semesters</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Pass Status Filter */}
                <Col md={2}>
                  <Form.Select
                      value={passedFilter}
                      onChange={(e) => setPassedFilter(e.target.value)}
                      className="bg-light border-0"
                  >
                    <option value="all">All Status</option>
                    <option value="studying">Studying</option>
                    <option value="passed">Passed</option>
                  </Form.Select>
                </Col>
              </Row>

              {/* Clear Filters Button */}
              {(searchTerm || statusFilter !== 'all' || programFilter !== 'all' || semesterFilter !== 'all' || passedFilter !== 'all') && (
                  <div className="mt-3">
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={clearFilters}
                        className="d-flex align-items-center gap-1"
                    >
                      <i className="fas fa-times"></i>
                      Clear Filters
                    </Button>
                  </div>
              )}
            </Card.Body>
          </Card>

          {/* Students Table */}
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0">Students List</h5>
              <div className="d-flex align-items-center gap-3">
              <span className="text-muted">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredStudents.length)} of {filteredStudents.length} students
              </span>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="d-flex align-items-center gap-2">
                      <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </Button>

                      <div className="d-flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(page => {
                              // Show first, last, current, and pages around current
                              if (page === 1 || page === totalPages) return true;
                              if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                              return false;
                            })
                            .map((page, index, array) => {
                              // Add ellipsis for gaps
                              const prevPage = array[index - 1];
                              const showEllipsis = prevPage && page - prevPage > 1;

                              return (
                                  <React.Fragment key={page}>
                                    {showEllipsis && (
                                        <span className="mx-1">...</span>
                                    )}
                                    <Button
                                        variant={currentPage === page ? "primary" : "outline-secondary"}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        className="px-3"
                                    >
                                      {page}
                                    </Button>
                                  </React.Fragment>
                              );
                            })}
                      </div>

                      <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </Button>
                    </div>
                )}
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {isLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
              ) : filteredStudents.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-user-graduate fa-3x text-muted mb-3"></i>
                    <h5>No students found</h5>
                    <p className="text-muted">
                      {searchTerm || statusFilter !== 'all' || programFilter !== 'all' || semesterFilter !== 'all' || passedFilter !== 'all'
                          ? 'Try adjusting your filters or search term'
                          : 'Register your first student to get started'}
                    </p>
                  </div>
              ) : (
                  <div className="table-responsive">
                    <Table hover className="mb-0">
                      <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Registration No</th>
                        <th>Program</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {paginatedStudents.map((student) => {
                        const genderConfig = getGenderBadge(student.gender);
                        return (
                            <tr key={student.id}>
                              <td className="fw-semibold">#{student.id}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-sm bg-light rounded-circle d-flex align-items-center justify-content-center me-2">
                                    <i className="fas fa-user-graduate text-primary"></i>
                                  </div>
                                  <div>
                                    <div className="fw-semibold">
                                      {student.first_name} {student.last_name}
                                    </div>
                                    <div className="mt-1">
                                      <Badge bg={genderConfig.variant} className="me-1">
                                        {genderConfig.label}
                                      </Badge>
                                      <small className="text-muted">
                                        DOB: {formatDate(student.dob)}
                                      </small>
                                    </div>
                                    <small className="text-muted d-block mt-1">
                                      {student.address1}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="fw-semibold">{student.roll_no}</div>
                                <small className="text-muted">Roll Number</small>
                              </td>
                              <td>
                                <div className="fw-semibold">{student.registration_no}</div>
                                <small className="text-muted">Registration Number</small>
                              </td>
                              <td>
                                <div>
                                  <div className="fw-semibold">
                                    {student.program_name || `Program ${student.program_id}`}
                                  </div>
                                  <div className="d-flex align-items-center gap-2 mt-1">
                                <span className="badge bg-light text-dark">
                                  Semester {student.current_semester}
                                </span>
                                    {getPassedStatus(student.is_passed)}
                                  </div>
                                  <small className="text-muted d-block mt-1">
                                    Enrolled: {formatDate(student.enrollment_date)}
                                  </small>
                                </div>
                              </td>
                              <td>
                                <div>
                                  <a href={`mailto:${student.email}`} className="text-decoration-none d-block">
                                    <i className="fas fa-envelope me-1"></i>
                                    {student.email}
                                  </a>
                                  {student.phone && (
                                      <a href={`tel:${student.phone}`} className="text-decoration-none d-block mt-1">
                                        <i className="fas fa-phone me-1"></i>
                                        {student.phone}
                                      </a>
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="d-flex flex-column gap-1">
                                  {getStatusBadge(student.status)}
                                  <small className="text-muted">
                                    Updated: {student.updated_at ? formatDate(student.updated_at) : 'N/A'}
                                  </small>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Button
                                      variant="outline-primary"
                                      size="sm"
                                      onClick={() => handleEdit(student)}
                                      title="Edit"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                  <Button
                                      variant="outline-danger"
                                      size="sm"
                                      onClick={() => handleDeleteClick(student)}
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

        {/* Form Modal */}
        <StudentFormModal
            show={showFormModal}
            onHide={handleCloseFormModal}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            isLoading={isLoading}
            editingStudent={!!editingStudent}
            programs={programs}
            handleSubmit={handleSubmit(onSubmit)}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
            show={showDeleteModal}
            onHide={handleCloseDeleteModal}
            onConfirm={handleDeleteConfirm}
            studentName={deletingStudent ? `${deletingStudent.first_name} ${deletingStudent.last_name}` : ''}
            isLoading={isLoading}
        />
      </DashboardLayout>
  );
};

export default StudentManagement;