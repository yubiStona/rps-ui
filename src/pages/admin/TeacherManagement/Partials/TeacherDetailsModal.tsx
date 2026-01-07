import React from "react";
import { Modal, Button, Spinner, Row, Col, Card } from "react-bootstrap";
import { Teacher } from "../../../../features/admin/teacher/utils";

interface ViewTeacherDetailsModalProps {
  show: boolean;
  onHide: () => void;
  teacher?: Teacher;
  isLoading: boolean;
}

const ViewTeacherDetailsModal: React.FC<ViewTeacherDetailsModalProps> = ({
  show,
  onHide,
  teacher,
  isLoading = false,
}) => {
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
          <Modal.Title>Loading Teacher Details...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Fetching Teacher information...</p>
        </Modal.Body>
      </Modal>
    );
  }

  if (!teacher) {
    return (
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title>Teacher Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-5">
          <i className="fas fa-chalkboard-teacher-slash text-muted mb-3 fs-1"></i>
          <p className="text-muted">No teacher data available</p>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button variant="outline-secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const genderText = getGenderText(teacher.gender);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header
        closeButton
        className="border-bottom-0 pb-0 position-relative"
      >
        <div className="d-flex align-items-center w-100">
          <div className="flex-shrink-0">
            <div
              className="rounded-circle bg-info bg-opacity-10 p-3 d-flex align-items-center justify-content-center"
              style={{ width: "70px", height: "70px" }}
            >
              <i className="fas fa-chalkboard-teacher text-info fs-3"></i>
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            <Modal.Title className="mb-2">
              {teacher.firstName} {teacher.lastName}
            </Modal.Title>
            <p className="text-muted mb-0">
              <i className="fas fa-envelope me-1"></i>
              {teacher.email}
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
                  <i className="fas fa-user-circle text-info me-2"></i>
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
                      <p className="mb-0 fw-semibold">{teacher.firstName}</p>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div>
                      <label className="text-muted small d-block mb-1">
                        Last Name
                      </label>
                      <p className="mb-0 fw-semibold">{teacher.lastName}</p>
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
                        teacher.gender === "M"
                          ? "fa-mars"
                          : teacher.gender === "F"
                          ? "fa-venus"
                          : "fa-genderless"
                      } me-2 text-info`}
                    ></i>
                    {genderText}
                  </p>
                </div>

                {teacher.DOB && (
                  <div className="mb-3">
                    <label className="text-muted small d-block mb-1">
                      Date of Birth
                    </label>
                    <p className="mb-0 fw-semibold">
                      <i className="fas fa-birthday-cake me-2 text-info"></i>
                      {formatDate(teacher.DOB)}
                    </p>
                  </div>
                )}

                <div className="mb-2">
                  <label className="text-muted small d-block mb-1">
                    Account Created
                  </label>
                  <p className="mb-0 fw-semibold">
                    <i className="fas fa-calendar-check me-2 text-info"></i>
                    {formatDate(teacher.createdAt)}
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
                  <i className="fas fa-address-book text-info me-2"></i>
                  Contact Information
                </h6>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <label className="text-muted small d-block mb-1">
                    Email Address
                  </label>
                  <a
                    href={`mailto:${teacher.email}`}
                    className="text-decoration-none d-block"
                  >
                    <i className="fas fa-envelope me-2 text-info"></i>
                    <span className="fw-semibold text-info">
                      {teacher.email}
                    </span>
                  </a>
                </div>

                <div className="mb-3">
                  <label className="text-muted small d-block mb-1">
                    Phone Number
                  </label>
                  {teacher.phone ? (
                    <a
                      href={`tel:${teacher.phone}`}
                      className="text-decoration-none d-block"
                    >
                      <i className="fas fa-phone me-2 text-info"></i>
                      <span className="fw-semibold text-info">
                        {teacher.phone}
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
                    <i className="fas fa-map-marker-alt me-2 text-info"></i>
                    {teacher.address1}
                    {/* {teacher.address2 && (
                      <span className="d-block text-muted small mt-1 ms-4">
                        {teacher.address2}
                      </span>
                    )} */}
                  </p>
                </div>
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

export default ViewTeacherDetailsModal;