import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  Form
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import TeacherFormModal from './Partials/TeacherFormModal';
import DeleteConfirmationModal from './Partials/DeleteConfirmationModal';
import { mockTeachers } from '../../../data/mockTeachers';
import { Teacher } from '../../../types';

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

const ITEMS_PER_PAGE = 5;

const TeacherManagement: React.FC = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deletingTeacher, setDeletingTeacher] = useState<Teacher | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormData>();

  // Filter teachers based on search term and filters
  const filteredTeachers = teachers.filter(teacher => {
    // Text search
    const matchesSearch =
        teacher.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.phone && teacher.phone.includes(searchTerm));

    // Gender filter
    const matchesGender = genderFilter === 'all' || teacher.gender === genderFilter;

    // Status filter (if you have status field, otherwise remove)
    // const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;

    return matchesSearch && matchesGender; // Add && matchesStatus if you have status field
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genderFilter, statusFilter]);

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
      handleCloseFormModal();
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
    setShowFormModal(true);
  };

  const handleDeleteClick = (teacher: Teacher) => {
    setDeletingTeacher(teacher);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTeacher) return;

    setIsLoading(true);
    setTimeout(() => {
      setTeachers(prev => prev.filter(teacher => teacher.id !== deletingTeacher.id));
      setIsLoading(false);
      handleCloseDeleteModal();
    }, 500);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
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

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingTeacher(null);
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
    setShowFormModal(true);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setGenderFilter('all');
    setStatusFilter('all');
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

          {/* Search and Filters Section */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-3">
              <Row className="g-3">
                {/* Search Bar */}
                <Col md={6}>
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
                </Col>

                {/* Gender Filter */}
                <Col md={3}>
                  <Form.Select
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value)}
                      className="bg-light border-0"
                  >
                    <option value="all">All Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </Form.Select>
                </Col>

                {/* Status Filter (if available) */}
                {/* <Col md={3}>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-light border-0"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Col> */}
              </Row>

              {/* Clear Filters Button */}
              {(searchTerm || genderFilter !== 'all' || statusFilter !== 'all') && (
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

          {/* Teachers Table */}
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0">Teachers List</h5>
              <div className="d-flex align-items-center gap-3">
              <span className="text-muted">
                Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredTeachers.length)} of {filteredTeachers.length} teachers
              </span>

                {/* Pagination Controls - Fixed to show alongside text */}
                {totalPages > 1 && (
                    <div className="d-flex align-items-center gap-2">
                      <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </Button>

                      <div className="d-flex align-items-center gap-1">
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
                                        <span className="mx-1 text-muted">...</span>
                                    )}
                                    <Button
                                        variant={currentPage === page ? "primary" : "outline-secondary"}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 ${currentPage === page ? 'fw-bold' : ''}`}
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
                          className="px-3"
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
              ) : filteredTeachers.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-users fa-3x text-muted mb-3"></i>
                    <h5>No teachers found</h5>
                    <p className="text-muted">
                      {searchTerm || genderFilter !== 'all' || statusFilter !== 'all'
                          ? 'Try adjusting your filters or search term'
                          : 'Add your first teacher to get started'}
                    </p>
                  </div>
              ) : (
                  <div className="table-responsive">
                    <Table hover className="mb-0">
                      <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Teacher Information</th>
                        <th>Contact</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Joined On</th>
                        <th>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {paginatedTeachers.map((teacher) => {
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
                                <div>
                                  <a href={`mailto:${teacher.email}`} className="text-decoration-none d-block">
                                    <i className="fas fa-envelope me-1"></i>
                                    {teacher.email}
                                  </a>
                                  {teacher.phone && (
                                      <a href={`tel:${teacher.phone}`} className="text-decoration-none d-block mt-1">
                                        <i className="fas fa-phone me-1"></i>
                                        {teacher.phone}
                                      </a>
                                  )}
                                </div>
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
                                      onClick={() => handleDeleteClick(teacher)}
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
        <TeacherFormModal
            show={showFormModal}
            onHide={handleCloseFormModal}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            isLoading={isLoading}
            editingTeacher={!!editingTeacher}
            handleSubmit={handleSubmit(onSubmit)}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
            show={showDeleteModal}
            onHide={handleCloseDeleteModal}
            onConfirm={handleDeleteConfirm}
            teacherName={deletingTeacher ? `${deletingTeacher.first_name} ${deletingTeacher.last_name}` : ''}
            isLoading={isLoading}
        />
      </>
  );
};

export default TeacherManagement;