import React from "react";
import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { ProgramList } from "../../../../features/admin/students/utils";
import { useForm } from "react-hook-form";

interface StudentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rollNumber: string;
  enrollmentDate: string;
  registrationNumber: string;
  gender: "M" | "F" | "O";
  DOB: string;
  address1: string;
  address2: string;
  programId: number;
}

interface StudentFormModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: StudentForm) => void;
  isLoading: boolean;
  programs: ProgramList[];
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({
  show,
  onHide,
  onSubmit,
  isLoading,
  programs,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentForm>();

  const handleFormSubmit = (data: StudentForm) => {
    onSubmit(data);
  };

  // Reset form when modal opens
  React.useEffect(() => {
    if (show) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        rollNumber: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
        registrationNumber: "",
        gender: "M",
        DOB: "",
        address1: "",
        address2: "",
        programId: 0,
      });
    }
  }, [show, reset]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title className="fw-bold w-100">
          <div className="d-flex align-items-center gap-3 mb-2">
            <div
              className="bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
              style={{ width: "44px", height: "44px" }}
            >
              <i className="fas fa-user-plus text-white fs-5"></i>
            </div>
            <div>
              <h5 className="mb-0">Register New Student</h5>
              <small className="text-muted">
                Fill in the details to register a new student
              </small>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
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
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    isInvalid={!!errors.firstName}
                    placeholder="Enter first name"
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName?.message}
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
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    isInvalid={!!errors.lastName}
                    placeholder="Enter last name"
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName?.message}
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
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    isInvalid={!!errors.email}
                    placeholder="student@university.edu"
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Phone Number <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light">
                      <i className="fas fa-phone"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[0-9]{10,15}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      isInvalid={!!errors.phone}
                      placeholder="+1234567890"
                      className="py-2"
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    {errors.phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Gender <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    {...register("gender", {
                      required: "Gender is required",
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
                    {...register("DOB", {
                      required: "Date of birth is required",
                    })}
                    isInvalid={!!errors.DOB}
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.DOB?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Academic Information Section */}
          <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center me-3">
                <i className="fas fa-graduation-cap text-primary"></i>
              </div>
              <h6 className="fw-bold mb-0">Academic Information</h6>
            </div>

            <Row className="g-4">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Roll Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...register("rollNumber", {
                      required: "Roll number is required",
                    })}
                    isInvalid={!!errors.rollNumber}
                    placeholder="Enter roll number"
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rollNumber?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Registration Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...register("registrationNumber", {
                      required: "Registration number is required",
                    })}
                    isInvalid={!!errors.registrationNumber}
                    placeholder="Enter registration number"
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.registrationNumber?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Enrollment Date <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    {...register("enrollmentDate", {
                      required: "Enrollment date is required",
                    })}
                    isInvalid={!!errors.enrollmentDate}
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.enrollmentDate?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Program <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    {...register("programId", {
                      required: "Program is required",
                      valueAsNumber: true,
                    })}
                    isInvalid={!!errors.programId}
                    className="py-2"
                  >
                    <option value="">Select Program</option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.code}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.programId?.message}
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
                {...register("address1", {
                  required: "Address is required",
                })}
                isInvalid={!!errors.address1}
                placeholder="Street address, P.O. box, company name"
                className="py-2"
              />
              <Form.Control.Feedback type="invalid">
                {errors.address1?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group>
              <Form.Label className="fw-semibold">
                Address Line 2 (Optional)
              </Form.Label>
              <Form.Control
                type="text"
                {...register("address2")}
                placeholder="Apartment, suite, unit, building, floor, etc."
                className="py-2"
              />
            </Form.Group> */}
          </div>
        </Modal.Body>

        <Modal.Footer className="border-top-0">
          <Button variant="outline-secondary" onClick={onHide} className="px-4">
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
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Creating...
              </>
            ) : (
              <>
                <i className="fas fa-plus me-2"></i>
                Register Student
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StudentFormModal;
