import React from "react";
import { Modal, Button, Spinner, Row, Col, Badge, Card } from "react-bootstrap";
import { Student } from "../../../../features/admin/students/utils";

interface ViewDetailsModalProps {
  show: boolean;
  onHide: () => void;
  student?: Student;
  isLoading: boolean;
}

const ViewStudentDetailsModal: React.FC<ViewDetailsModalProps> = ({
  show,
  onHide,
  student,
  isLoading = false,
}) => {
  const getStatusBadge = (status: "A" | "P" | "S") => {
    switch (status) {
      case "A":
        return {
          label: "Active",
          variant: "success",
          icon: "fas fa-check-circle",
        };
      case "P":
        return {
          label: "Passed",
          variant: "warning",
          icon: "fas fa-graduation-cap",
        };
      case "S":
        return { label: "Suspended", variant: "secondary", icon: "fas fa-ban" };
      default:
        return {
          label: "Unknown",
          variant: "secondary",
          icon: "fas fa-question-circle",
        };
    }
  };

  const getGenderText = (gender: "M" | "F" | "O") => {
    switch (gender) {
      case "M":
        return "Male";
      case "F":
        return "Female";
      case "O":
        return "Other";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title>Loading Student Details...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Fetching student information...</p>
        </Modal.Body>
      </Modal>
    );
  }

  if (!student) {
    return (
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title>Student Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-5">
          <i className="fas fa-user-slash text-muted mb-3 fs-1"></i>
          <p className="text-muted">No student data available</p>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button variant="outline-secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const statusConfig = getStatusBadge(student.status);
  const genderText = getGenderText(student.gender);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header
        closeButton
        className="border-bottom-0 pb-0 position-relative"
      >
        <div className="d-flex align-items-center w-100">
          <div className="flex-shrink-0">
            <div
              className="rounded-circle bg-primary bg-opacity-10 p-3 d-flex align-items-center justify-content-center"
              style={{ width: "70px", height: "70px" }}
            >
              <i className="fas fa-user-graduate text-primary fs-3"></i>
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            <Modal.Title className="mb-2">
              {student.firstName} {student.lastName}
              <span className="ms-2">
                <Badge
                  bg={statusConfig.variant}
                  className="d-inline-flex align-items-center gap-1 px-2 py-1"
                  title={statusConfig.label}
                >
                  <i className={`${statusConfig.icon} fs-6`}></i>
                  <span>{statusConfig.label}</span>
                </Badge>
              </span>
            </Modal.Title>
            <p className="text-muted mb-0">
              <i className="fas fa-id-badge me-1"></i>
              {student.registrationNumber}
            </p>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="pt-3">
        <Row className="g-3">
          {/* Personal Information */}
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-bottom py-2">
                <h6 className="mb-0 fw-semibold">
                  <i className="fas fa-user-circle text-primary me-2"></i>
                  Personal Information
                </h6>
              </Card.Header>
              <Card.Body>
                <Row className="mb-2">
                  <Col xs={6}>
                    <div>
                      <label className="text-muted small d-block mb-1">
                        First Name
                      </label>
                      <p className="mb-0 fw-semibold">{student.firstName}</p>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div>
                      <label className="text-muted small d-block mb-1">
                        Last Name
                      </label>
                      <p className="mb-0 fw-semibold">{student.lastName}</p>
                    </div>
                  </Col>
                </Row>

                <div className="mb-3">
                  <label className="text-muted small d-block mb-1">
                    Gender
                  </label>
                  <p className="mb-0 fw-semibold">
                    <i
                      className={`fas ${
                        student.gender === "M"
                          ? "fa-mars"
                          : student.gender === "F"
                          ? "fa-venus"
                          : "fa-genderless"
                      } me-2 text-primary`}
                    ></i>
                    {genderText}
                  </p>
                </div>

                {student.DOB && (
                  <div className="mb-3">
                    <label className="text-muted small d-block mb-1">
                      Date of Birth
                    </label>
                    <p className="mb-0 fw-semibold">
                      <i className="fas fa-birthday-cake me-2 text-primary"></i>
                      {formatDate(student.DOB)}
                    </p>
                  </div>
                )}

                <div className="mb-2">
                  <label className="text-muted small d-block mb-1">
                    Enrollment Date
                  </label>
                  <p className="mb-0 fw-semibold">
                    <i className="fas fa-calendar-check me-2 text-primary"></i>
                    {formatDate(student.enrollmentDate || student.createdAt)}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-bottom py-2">
                <h6 className="mb-0 fw-semibold">
                  <i className="fas fa-address-book text-primary me-2"></i>
                  Contact Information
                </h6>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <label className="text-muted small d-block mb-1">
                    Email Address
                  </label>
                  <a
                    href={`mailto:${student.email}`}
                    className="text-decoration-none d-block"
                  >
                    <i className="fas fa-envelope me-2 text-primary"></i>
                    <span className="fw-semibold text-primary">
                      {student.email}
                    </span>
                  </a>
                </div>

                <div className="mb-3">
                  <label className="text-muted small d-block mb-1">
                    Phone Number
                  </label>
                  {student.phone ? (
                    <a
                      href={`tel:${student.phone}`}
                      className="text-decoration-none d-block"
                    >
                      <i className="fas fa-phone me-2 text-primary"></i>
                      <span className="fw-semibold text-primary">
                        {student.phone}
                      </span>
                    </a>
                  ) : (
                    <p className="mb-0 fw-semibold text-muted">
                      <i className="fas fa-phone me-2"></i>
                      Not provided
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-muted small d-block mb-1">
                    Address
                  </label>
                  <p className="mb-0 fw-semibold">
                    <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                    {student.address1}
                    {student.address2 && (
                      <span className="d-block text-muted small mt-1 ms-4">
                        {student.address2}
                      </span>
                    )}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Academic Information */}
          <Col md={12}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-bottom py-2">
                <h6 className="mb-0 fw-semibold">
                  <i className="fas fa-graduation-cap text-primary me-2"></i>
                  Academic Information
                </h6>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Row className="mb-3">
                      <Col xs={6}>
                        <div>
                          <label className="text-muted small d-block mb-1">
                            Registration No
                          </label>
                          <p className="mb-0 fw-semibold">
                            <i className="fas fa-id-badge me-1 text-primary"></i>
                            {student.registrationNumber}
                          </p>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div>
                          <label className="text-muted small d-block mb-1">
                            Roll No
                          </label>
                          <p className="mb-0 fw-semibold">
                            <i className="fas fa-id-card me-1 text-primary"></i>
                            {student.rollNumber}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <label className="text-muted small d-block mb-1">
                        Program
                      </label>
                      <p className="mb-0 fw-semibold">
                        <i className="fas fa-book me-2 text-primary"></i>
                        {student.program?.name || "Not specified"}
                      </p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <div>
                      <label className="text-muted small d-block mb-1">
                        Current Semester
                      </label>
                      <p className="mb-0 fw-semibold">
                        <i className="fas fa-layer-group me-2 text-primary"></i>
                        Semester {student.currentSemester}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="bg-light border-top-0">
        <Button
          variant="outline-secondary"
          onClick={onHide}
          className="d-flex align-items-center gap-2"
        >
          <i className="fas fa-times"></i>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewStudentDetailsModal;
