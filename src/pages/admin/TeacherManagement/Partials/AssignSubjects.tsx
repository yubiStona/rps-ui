import React, { useState, useEffect, useMemo } from "react";
import { 
  Modal, 
  Button, 
  Form, 
  Spinner, 
  Row, 
  Col, 
  Badge,
  Alert 
} from "react-bootstrap";
import toast from "react-hot-toast";
import { 
  useGetSubjectAssignListQuery,
  useAssignSubjectMutation
} from "../../../../features/admin/teacher/teacherApi";
import { SubjectList } from "../../../../features/admin/teacher/utils";

interface AssignSubjectsModalProps {
  show: boolean;
  onHide: () => void;
  teacherId: number;
  teacherName: string;
}

const AssignSubjectsModal: React.FC<AssignSubjectsModalProps> = ({
  show,
  onHide,
  teacherId,
  teacherName,
}) => {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [alreadyAssignedSubject, setAlreadyAssignedSubject] = useState<{
    subjectId: number;
    subjectName: string;
    assignedTo: string;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (show) {
      setSelectedSubjectIds([]);
      setSearchTerm("");
      setAlreadyAssignedSubject(null);
    }
  }, [show]);

  // Query parameters for the API
  const queryParams = useMemo(
    () => ({
      teacherId,
      search: debouncedSearch || undefined,
    }),
    [teacherId, debouncedSearch]
  );

  const { 
    data: subjectsResponse, 
    isLoading, 
    isFetching,
  } = useGetSubjectAssignListQuery(queryParams, { 
    refetchOnMountOrArgChange: true,
    skip: !teacherId || !show
  });

  const [assignSubject, { isLoading: isAssigning }] = useAssignSubjectMutation();

  const subjects = subjectsResponse?.data || [];

  const handleSubjectToggle = (subjectId: number, subject: SubjectList) => {
    const isAssigned = !!subject.subjectTeacher;
    
    if (isAssigned) {
      // Show confirmation for already assigned subject
      setAlreadyAssignedSubject({
        subjectId,
        subjectName: subject.name,
        assignedTo: `${subject.subjectTeacher?.firstName} ${subject.subjectTeacher?.lastName}`
      });
      return;
    }

    setSelectedSubjectIds(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
  };

  const handleCardClick = (subjectId: number, subject: SubjectList, e: React.MouseEvent) => {
    // Prevent triggering when clicking on checkbox itself (to avoid double toggle)
    if ((e.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    
    handleSubjectToggle(subjectId, subject);
  };

  const handleConfirmAlreadyAssigned = () => {
    if (!alreadyAssignedSubject) return;
    
    const { subjectId } = alreadyAssignedSubject;
    
    setSelectedSubjectIds(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
    
    setAlreadyAssignedSubject(null);
  };

  const handleClearSelection = () => {
    setSelectedSubjectIds([]);
    toast.success("Selection cleared");
  };

  const handleAssignSubjects = async () => {
    if (selectedSubjectIds.length === 0) {
      toast.error("Please select at least one subject");
      return;
    }

    try {
      const payload = {
        teacherId,
        subjects: selectedSubjectIds
      };
      const response = await assignSubject(payload).unwrap();

      if (response.success) {
        toast.success(response.message || `Successfully assigned ${selectedSubjectIds.length} subject(s) to ${teacherName}`);
        onHide();
      } else {
        toast.error(response.message || "Failed to assign subjects");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to assign subjects");
    }
  };

  // Count statistics
  const totalSubjects = subjects.length;
  const availableSubjects = subjects.filter(s => !s.subjectTeacher).length;
  const assignedSubjects = subjects.filter(s => s.subjectTeacher).length;
  const selectedAssignedSubjects = selectedSubjectIds.filter(id => {
    const subject = subjects.find(s => s.id === id);
    return subject?.subjectTeacher;
  }).length;

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        centered
        backdrop="static"
        keyboard={false}
        scrollable
      >
        <Modal.Header closeButton className="bg-light text-dark border-bottom">
          <Modal.Title>
            <i className="fas fa-book text-primary me-2"></i>
            Assign Subjects to Teacher
            <div className="small text-muted mt-1">
              Teacher: <strong className="text-dark">{teacherName}</strong>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Search Section */}
          <Row className="mb-4">
            <Col md={8}>
              <div className="input-group">
                <span className="input-group-text bg-light border">
                  <i className="fas fa-search"></i>
                </span>
                <Form.Control
                  type="text"
                  placeholder="Search subjects by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border"
                />
              </div>
            </Col>
            <Col md={4}>
              {/* Static Dropdown - For UI demonstration */}
              <Form.Select className="border" disabled>
                <option>Filter by Program (Coming Soon)</option>
                <option>Computer Science</option>
                <option>Information Technology</option>
                <option>Electrical Engineering</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Action Buttons */}
          <Row className="mb-3">
            <Col>
              <div className="d-flex gap-2 flex-wrap">
                {/* Clear Selection Button - Only shown when subjects are selected */}
                {selectedSubjectIds.length > 0 && (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleClearSelection}
                  >
                    <i className="fas fa-times me-1"></i>
                    Clear Selection
                  </Button>
                )}
                
                <div className="ms-auto d-flex align-items-center gap-2">
                  {selectedAssignedSubjects > 0 && (
                    <Badge bg="warning" className="me-2">
                      <i className="fas fa-exclamation-triangle me-1"></i>
                      {selectedAssignedSubjects} Reassignment(s)
                    </Badge>
                  )}
                  <Badge bg="info">
                    Selected: {selectedSubjectIds.length}
                  </Badge>
                </div>
              </div>
            </Col>
          </Row>

          {/* Subjects List */}
          {(isLoading || isFetching) ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <div className="mt-3">Loading subjects...</div>
            </div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-4">
              <i className="fas fa-search fa-2x text-muted mb-3"></i>
              <p className="text-muted">
                {searchTerm 
                  ? "No subjects match your search" 
                  : "No subjects available"}
              </p>
              {searchTerm && (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <div
              className="subject-list"
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              {subjects.map((subject) => {
                const isAssigned = !!subject.subjectTeacher;
                const isSelected = selectedSubjectIds.includes(subject.id);
                const assignedToName = subject.subjectTeacher 
                  ? `${subject.subjectTeacher.firstName} ${subject.subjectTeacher.lastName}`
                  : "";

                return (
                  <div
                    key={subject.id}
                    className={`card mb-3 border-start ${isAssigned ? 'border-warning' : 'border-success'} border-3 cursor-pointer`}
                    onClick={(e) => handleCardClick(subject.id, subject, e)}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: isSelected ? '#f8f9fa' : 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="card-body">
                      <Row className="align-items-center">
                        <Col xs={1}>
                          <Form.Check
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSubjectToggle(subject.id, subject)}
                            id={`subject-${subject.id}`}
                            className="mt-0"
                            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking checkbox
                          />
                        </Col>
                        <Col xs={8}>
                          <div className="d-flex align-items-center">
                            <div className="fw-bold mb-0">
                              {subject.name}
                              <Badge bg="secondary" className="ms-2">
                                {subject.code}
                              </Badge>
                              <Badge bg="light" text="dark" className="ms-2">
                                {subject.type === 1 ? 'Theory' : 'Practical'}
                              </Badge>
                              {isAssigned ? (
                                <Badge bg="warning" className="ms-2">
                                  <i className="fas fa-user-tie me-1"></i>
                                  Assigned
                                </Badge>
                              ) : (
                                <Badge bg="success" className="ms-2">
                                  <i className="fas fa-check me-1"></i>
                                  Available
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-muted small mt-1">
                            <span className="me-3">
                              <i className="fas fa-graduation-cap me-1"></i>
                              {subject.program.name} ({subject.program.code})
                            </span>
                            <span>
                              <i className="fas fa-layer-group me-1"></i>
                              Semester {subject.semester}
                            </span>
                          </div>
                          {isAssigned && assignedToName && (
                            <Alert variant="light" className="small mt-2 mb-0 py-2">
                              <i className="fas fa-info-circle text-warning me-2"></i>
                              Currently assigned to: <strong>{assignedToName}</strong>
                            </Alert>
                          )}
                        </Col>
                        <Col xs={3} className="text-end">
                          <div className="small">
                            {isAssigned ? (
                              <span className="text-warning">
                                <i className="fas fa-sync-alt me-1"></i>
                                Will be reassigned
                              </span>
                            ) : (
                              <span className="text-success">
                                <i className="fas fa-unlock me-1"></i>
                                Available for Assignment
                              </span>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between border-top pt-3">
          <div className="d-flex gap-2 align-items-center">
            <Badge bg="light" text="dark" className="me-2">
              Total: {totalSubjects}
            </Badge>
            <Badge bg="success" className="me-2">
              Available: {availableSubjects}
            </Badge>
            <Badge bg="warning">
              Already Assigned: {assignedSubjects}
            </Badge>
            {selectedAssignedSubjects > 0 && (
              <Alert variant="warning" className="mb-0 py-1 px-2 small">
                <i className="fas fa-exclamation-triangle me-1"></i>
                {selectedAssignedSubjects} subject(s) will be reassigned
              </Alert>
            )}
          </div>
          <div>
            <Button variant="outline-secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAssignSubjects}
              disabled={selectedSubjectIds.length === 0 || isAssigning}
            >
              {isAssigning ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Assigning...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus me-2"></i>
                  Assign {selectedSubjectIds.length} Subject(s)
                </>
              )}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Already Assigned Confirmation Modal */}
      <Modal
        show={!!alreadyAssignedSubject}
        onHide={() => setAlreadyAssignedSubject(null)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="bg-warning text-white">
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Subject Already Assigned
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alreadyAssignedSubject && (
            <>
              <p>
                The subject <strong>"{alreadyAssignedSubject.subjectName}"</strong> is already assigned to another teacher.
              </p>
              <Alert variant="warning" className="mt-3">
                <div className="d-flex">
                  <i className="fas fa-user-tie me-3 mt-1"></i>
                  <div>
                    <h6 className="alert-heading">Currently Assigned To:</h6>
                    <p className="mb-0"><strong>{alreadyAssignedSubject.assignedTo}</strong></p>
                  </div>
                </div>
              </Alert>
              <Alert variant="danger" className="mt-3">
                <i className="fas fa-exclamation-circle me-2"></i>
                <strong>Warning:</strong> Assigning this subject to {teacherName} will unassign it from the current teacher.
              </Alert>
              <p className="text-muted small mt-3">
                Are you sure you want to reassign this subject?
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAlreadyAssignedSubject(null)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleConfirmAlreadyAssigned}>
            <i className="fas fa-sync-alt me-2"></i>
            Yes, Reassign Subject
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssignSubjectsModal;