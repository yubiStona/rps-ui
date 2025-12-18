import React from 'react';
import { Modal, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface Program {
    id: number;
    name: string;
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

interface StudentFormModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (data: StudentForm) => void;
    register: UseFormRegister<StudentForm>;
    errors: FieldErrors<StudentForm>;
    isLoading: boolean;
    editingStudent: boolean;
    programs: Program[];
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({
                                                               show,
                                                               onHide,
                                                               onSubmit,
                                                               register,
                                                               errors,
                                                               isLoading,
                                                               editingStudent,
                                                               programs,
                                                               handleSubmit,
                                                           }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton className="border-bottom-0">
                <Modal.Title className="fw-bold w-100">
                    <div className="d-flex align-items-center gap-3 mb-2">
                        <div className="bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                             style={{ width: '44px', height: '44px' }}>
                            <i className={`fas ${editingStudent ? 'fa-user-edit' : 'fa-user-plus'} text-white fs-5`}></i>
                        </div>
                        <div>
                            <h5 className="mb-0">{editingStudent ? 'Edit Student Profile' : 'Register New Student'}</h5>
                            <small className="text-muted">
                                {editingStudent ? 'Update student information' : 'Fill in the details to register a new student'}
                            </small>
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
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
                                    <Form.Label className="fw-semibold">Phone Number *</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-light">
                                            <i className="fas fa-phone"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="tel"
                                            {...register('phone', {
                                                required: 'Phone is required',
                                                pattern: {
                                                    value: /^[0-9]{10,15}$/,
                                                    message: 'Invalid phone number'
                                                }
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
                                        {...register('roll_no', {
                                            required: 'Roll number is required'
                                        })}
                                        isInvalid={!!errors.roll_no}
                                        placeholder="Enter roll number"
                                        className="py-2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.roll_no?.message}
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
                                        {...register('registration_no', {
                                            required: 'Registration number is required'
                                        })}
                                        isInvalid={!!errors.registration_no}
                                        placeholder="Enter registration number"
                                        className="py-2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.registration_no?.message}
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
                                        {...register('enrollment_date', {
                                            required: 'Enrollment date is required'
                                        })}
                                        isInvalid={!!errors.enrollment_date}
                                        className="py-2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.enrollment_date?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">
                                        Status <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Select
                                        {...register('status', {
                                            required: 'Status is required'
                                        })}
                                        isInvalid={!!errors.status}
                                        className="py-2"
                                    >
                                        <option value="A">Active</option>
                                        <option value="P">Pending</option>
                                        <option value="S">Suspended</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.status?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">
                                        Program <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Select
                                        {...register('program_id', {
                                            required: 'Program is required',
                                            valueAsNumber: true
                                        })}
                                        isInvalid={!!errors.program_id}
                                        className="py-2"
                                    >
                                        <option value="">Select Program</option>
                                        {programs.map((program) => (
                                            <option key={program.id} value={program.id}>
                                                {program.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.program_id?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">
                                        Current Semester <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Select
                                        {...register('current_semester', {
                                            required: 'Semester is required',
                                            valueAsNumber: true,
                                        })}
                                        isInvalid={!!errors.current_semester}
                                        className="py-2"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                            <option key={sem} value={sem}>
                                                Semester {sem}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.current_semester?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Pass Status</Form.Label>
                                    <Form.Select
                                        {...register('is_passed', {
                                            valueAsNumber: true,
                                        })}
                                        className="py-2"
                                    >
                                        <option value={0}>Studying</option>
                                        <option value={1}>Passed</option>
                                    </Form.Select>
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
                        onClick={onHide}
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
                                {editingStudent ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            <>
                                <i className={`fas ${editingStudent ? 'fa-save' : 'fa-plus'} me-2`}></i>
                                {editingStudent ? 'Update Student' : 'Register Student'}
                            </>
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default StudentFormModal;