import React from 'react';
import { Modal, Button, Spinner, Alert, Row, Col, Card } from 'react-bootstrap';
import { Teacher } from '../../../types';
import { Student } from '../../../features/admin/students/utils';

interface ViewDetailsModalProps {
    show: boolean;
    onHide: () => void;
    entityType: 'student' | 'teacher' | 'admin';
    entityId: number | null;
    data?: Student | Teacher | any;
    isLoading?: boolean;
    error?: any;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
    show,
    onHide,
    entityType,
    entityId,
    data,
    isLoading = false,
    error = null,
}) => {
    const renderStudentDetails = (student: Student) => {
        return (
            <>
                <Row className="mb-3">
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-user me-2"></i>First Name
                            </label>
                            <p className="mb-0 fw-semibold">{student.firstName}</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-user me-2"></i>Last Name
                            </label>
                            <p className="mb-0 fw-semibold">{student.lastName}</p>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-envelope me-2"></i>Email
                            </label>
                            <p className="mb-0 fw-semibold">{student.email}</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-phone me-2"></i>Phone
                            </label>
                            <p className="mb-0 fw-semibold">{student.phone}</p>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-id-card me-2"></i>Roll No
                            </label>
                            <p className="mb-0 fw-semibold">{student.rollNumber}</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-id-badge me-2"></i>Registration No
                            </label>
                            <p className="mb-0 fw-semibold">{student.registrationNumber}</p>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-venus-mars me-2"></i>Gender
                            </label>
                            <p className="mb-0 fw-semibold">
                                {student.gender === 'M' ? 'Male' : student.gender === 'F' ? 'Female' : 'Other'}
                            </p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-birthday-cake me-2"></i>Date of Birth
                            </label>
                            <p className="mb-0 fw-semibold">
                                {new Date(student.DOB).toLocaleDateString()}
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-calendar me-2"></i>Enrollment Date
                            </label>
                            <p className="mb-0 fw-semibold">
                                {new Date(student.enrollmentDate).toLocaleDateString()}
                            </p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-info-circle me-2"></i>Status
                            </label>
                            <p className="mb-0">
                                <span className={`badge ${
                                    student.status === 'A' ? 'bg-success' : 
                                    student.status === 'P' ? 'bg-warning' : 'bg-secondary'
                                }`}>
                                    {student.status === 'A' ? 'Active' : 
                                     student.status === 'P' ? 'Pending' : 'Suspended'}
                                </span>
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-book me-2"></i>Current Semester
                            </label>
                            <p className="mb-0 fw-semibold">{student.currentSemester}</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-graduation-cap me-2"></i>Program
                            </label>
                            <p className="mb-0 fw-semibold">{student.program?.name || `Program ID: ${student.programId}`}</p>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-map-marker-alt me-2"></i>Address
                            </label>
                            <p className="mb-0 fw-semibold">
                                {student.address1}
                                {student.address2 && <><br />{student.address2}</>}
                            </p>
                        </div>
                    </Col>
                </Row>

                {student.createdAt && (
                    <Row className="mb-2">
                        <Col md={6}>
                            <div className="detail-item mb-3">
                                <label className="text-muted small mb-1">
                                    <i className="fas fa-clock me-2"></i>Created At
                                </label>
                                <p className="mb-0 small">
                                    {new Date(student.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </Col>
                        {student.updatedAt && (
                            <Col md={6}>
                                <div className="detail-item mb-3">
                                    <label className="text-muted small mb-1">
                                        <i className="fas fa-clock me-2"></i>Updated At
                                    </label>
                                    <p className="mb-0 small">
                                        {new Date(student.updatedAt).toLocaleString()}
                                    </p>
                                </div>
                            </Col>
                        )}
                    </Row>
                )}
            </>
        );
    };

    const renderTeacherDetails = (teacher: Teacher) => {
        return (
            <>
                <Row className="mb-3">
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-user me-2"></i>First Name
                            </label>
                            <p className="mb-0 fw-semibold">{teacher.first_name}</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-user me-2"></i>Last Name
                            </label>
                            <p className="mb-0 fw-semibold">{teacher.last_name}</p>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-envelope me-2"></i>Email
                            </label>
                            <p className="mb-0 fw-semibold">{teacher.email}</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-phone me-2"></i>Phone
                            </label>
                            <p className="mb-0 fw-semibold">{teacher.phone || 'N/A'}</p>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-venus-mars me-2"></i>Gender
                            </label>
                            <p className="mb-0 fw-semibold">
                                {teacher.gender === 'M' ? 'Male' : teacher.gender === 'F' ? 'Female' : 'Other'}
                            </p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-birthday-cake me-2"></i>Date of Birth
                            </label>
                            <p className="mb-0 fw-semibold">
                                {new Date(teacher.dob).toLocaleDateString()}
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={12}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-map-marker-alt me-2"></i>Address
                            </label>
                            <p className="mb-0 fw-semibold">
                                {teacher.address1}
                                {teacher.address2 && <><br />{teacher.address2}</>}
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-clock me-2"></i>Created At
                            </label>
                            <p className="mb-0 small">
                                {new Date(teacher.created_at).toLocaleString()}
                            </p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="detail-item mb-3">
                            <label className="text-muted small mb-1">
                                <i className="fas fa-clock me-2"></i>Updated At
                            </label>
                            <p className="mb-0 small">
                                {new Date(teacher.updated_at).toLocaleString()}
                            </p>
                        </div>
                    </Col>
                </Row>
            </>
        );
    };

    const getTitle = () => {
        switch (entityType) {
            case 'student':
                return 'Student Details';
            case 'teacher':
                return 'Teacher Details';
            case 'admin':
                return 'Admin Details';
            default:
                return 'Details';
        }
    };

    const getIcon = () => {
        switch (entityType) {
            case 'student':
                return 'fa-user-graduate';
            case 'teacher':
                return 'fa-chalkboard-teacher';
            case 'admin':
                return 'fa-user-shield';
            default:
                return 'fa-info-circle';
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    <i className={`fas ${getIcon()} me-2`}></i>
                    {getTitle()}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="text-muted mt-3">Loading details...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error?.data?.message || 'Failed to load details. Please try again.'}
                    </Alert>
                ) : data ? (
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            {entityType === 'student' && renderStudentDetails(data as Student)}
                            {entityType === 'teacher' && renderTeacherDetails(data as Teacher)}
                            {entityType === 'admin' && (
                                <Alert variant="info">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Admin details rendering not yet implemented
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                ) : (
                    <Alert variant="warning">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        No data available
                    </Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>
                    <i className="fas fa-times me-2"></i>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewDetailsModal;
