import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Form, Card, Accordion, Button } from 'react-bootstrap';
import { Save } from 'lucide-react';
import CommonBreadCrumb from '../common/BreadCrumb';
import { FaTachometerAlt, FaUserGraduate } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useGetStudentSubjectListQuery } from '../../features/admin/students/studentApi';
import { StudentSubjectData } from '../../features/admin/students/utils';
import { useLocation } from 'react-router-dom';
import { Student } from '../../features/admin/students/utils';

interface MarksData {
  theory: string;
  [key: string]: string; // For dynamic evaluation parameters
}

interface MarkField {
  id: string;
  name: string;
  label: string;
  maxMarks: number;
  isEvaluationParam: boolean;
  paramCode?: string; 
  paramId?: number;   
}

const MarksEntryPage: React.FC = () => {
  const [selectedTerminal, setSelectedTerminal] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [marksData, setMarksData] = useState<Record<number, MarksData>>({});
  const location = useLocation();
  const studentId = location.state.id;
  const studentData = location.state.item as Student;

  const { data: subjectsResponse, isLoading } = useGetStudentSubjectListQuery(
    { studentId: studentId || 0 },
    { skip: !studentId }
  );


  const subjects = useMemo(() => subjectsResponse?.data || [], [subjectsResponse?.data]);


  // Initialize marks data when subjects are loaded
  useEffect(() => {
    if (subjects.length > 0) {
      const initialMarks: Record<number, MarksData> = {};
      
      subjects.forEach(subject => {
        // Initialize with theory field
        const subjectMarks: MarksData = { theory: '' };
        subject.evaluationParameters.forEach(param => {
          subjectMarks[`param_${param.id}`] = '';
        });
        
        initialMarks[subject.id] = subjectMarks;
      });
      
      setMarksData(initialMarks);
    }
  }, [subjects]);

  const handleMarkChange = (subjectId: number, field: string, value: string) => {
    setMarksData(prev => ({
      ...prev,
      [subjectId]: {
        ...prev[subjectId],
        [field]: value
      }
    }));
  };

  const handleSaveSubject = (subjectId: number, subjectName: string) => {
    const subjectMarks = marksData[subjectId];
    if (subjectMarks) {
      const hasMarks = Object.values(subjectMarks).some(value => value.trim() !== '');
      
      if (hasMarks) {
        console.log('Saving marks for subject:', subjectName, subjectMarks);
        toast.success(`Saved marks for ${subjectName}`);
      } else {
        toast.error(`No marks entered for ${subjectName}`);
      }
    } else {
      toast.error(`No marks data found for ${subjectName}`);
    }
  };

  const handleSaveAll = () => {
    // Check if any marks are entered
    const hasAnyMarks = Object.values(marksData).some(subjectMarks => 
      Object.values(subjectMarks).some(value => value.trim() !== '')
    );
    
    if (!hasAnyMarks) {
      toast.error('No marks entered to save');
      return;
    }
    
    console.log('Saving all marks:', marksData);
    
    const submissionData = Object.entries(marksData).map(([subjectId, marks]) => {
      const subject = subjects.find(s => s.id === parseInt(subjectId));
      const transformedMarks: Record<string, any> = {
        subjectId: parseInt(subjectId),
        theory: marks.theory || 0
      };
      
      if (subject) {
        subject.evaluationParameters.forEach(param => {
          const paramKey = `param_${param.id}`;
          transformedMarks[`param_${param.id}`] = marks[paramKey] || 0;
        });
      }
      
      return transformedMarks;
    });
    
    console.log('Transformed submission data:', submissionData);
    toast.success('All marks saved successfully!');
  };

  const getSubjectMarks = (subjectId: number): MarksData => {
    return marksData[subjectId] || { theory: '' };
  };

  const getMarkFieldsForSubject = (subject: StudentSubjectData): MarkField[] => {
    const fields: MarkField[] = [
      {
        id: 'theory',
        name: 'theory',
        label: 'Theory',
        maxMarks: 40,
        isEvaluationParam: false
      }
    ];

    subject.evaluationParameters.forEach(param => {
      fields.push({
        id: `param_${param.id}`,
        name: `param_${param.id}`,
        label: param.name,
        maxMarks: param.weight,
        isEvaluationParam: true,
        paramCode: param.code, 
        paramId: param.id
      });
    });

    return fields;
  };

  return (
    <>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <CommonBreadCrumb
            items={[
              {
                label: "Dashboard",
                link: "/admin/dashboard",
                icon: <FaTachometerAlt />,
              },
              {
                label: "Student Management",
                link: "/admin/students",
                icon: <FaUserGraduate />,
              },
              {
                label: "Marks Entry",
                active: true,
              },
            ]}
          />
        </div>

        {/* Student Information Card */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-4">
            <h5 className="mb-3 fw-semibold">Student Information</h5>
            <Row>
              <Col md={3} className="mb-3 mb-md-0">
                <div>
                  <small className="text-muted d-block mb-1">Student Name</small>
                  <strong>{`${studentData?.firstName} ${studentData?.lastName}`}</strong>
                </div>
              </Col>
              <Col md={3} className="mb-3 mb-md-0">
                <div>
                  <small className="text-muted d-block mb-1">Roll Number</small>
                  <strong>{studentData?.rollNumber}</strong>
                </div>
              </Col>
              <Col md={3} className="mb-3 mb-md-0">
                <div>
                  <small className="text-muted d-block mb-1">Current Semester</small>
                  <strong>{studentData?.currentSemester}</strong>
                </div>
              </Col>
              <Col md={3}>
                <div>
                  <small className="text-muted d-block mb-1">Registration Number</small>
                  <strong>{studentData?.registrationNumber}</strong>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Filter Section */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-4">
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <Form.Group>
                  <Form.Label className="fw-semibold">Terminal</Form.Label>
                  <Form.Select
                    value={selectedTerminal}
                    onChange={(e) => setSelectedTerminal(e.target.value)}
                    className="bg-light border-0"
                  >
                    <option value="">Select Terminal</option>
                    <option value="terminal1">Terminal 1</option>
                    <option value="terminal2">Terminal 2</option>
                    <option value="terminal3">Terminal 3</option>
                    <option value="final">Final Term</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Subject</Form.Label>
                  <Form.Select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="bg-light border-0"
                  >
                    <option value="">All Subjects</option>
                    <option value="math">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="english">English</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Loading State */}
        {isLoading ? (
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading subjects...</p>
            </Card.Body>
          </Card>
        ) : subjects.length === 0 ? (
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="text-center py-5">
              <i className="fas fa-book fa-2x text-muted mb-3"></i>
              <p className="text-muted">No subjects found for this student</p>
            </Card.Body>
          </Card>
        ) : (
          <>
            {/* Subject Cards */}
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key as string)} className="mb-4">
              {subjects.map((subject: StudentSubjectData) => {
                const subjectMarks = getSubjectMarks(subject.id);
                const markFields = getMarkFieldsForSubject(subject);
                
                return (
                  <Card
                    key={subject.id}
                    className="mb-3 border-0 shadow-sm"
                  >
                    <Accordion.Item eventKey={subject.id.toString()} className="border-0">
                      <Accordion.Header className="bg-white">
                        <div className="w-100 d-flex justify-content-between align-items-center pe-3">
                          <div>
                            <span className="fw-semibold">
                              {subject.name}
                            </span>
                            <span className="text-muted ms-2">
                              {subject.code}
                            </span>
                            <span className="badge bg-secondary ms-2">
                              Semester {subject.semester}
                            </span>
                            <span className="badge bg-light text-dark ms-2">
                              {subject.type}
                            </span>
                            {subject.subjectTeacher === null && (
                              <span className="badge bg-warning ms-2">
                                <i className="fas fa-exclamation-triangle me-1"></i>
                                No Teacher Assigned
                              </span>
                            )}
                          </div>
                          <div className="text-muted small">
                            {subject.evaluationParameters.length > 0 && (
                              <span>
                                <i className="fas fa-sliders-h me-1"></i>
                                {subject.evaluationParameters.length} Evaluation Parameters
                              </span>
                            )}
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="bg-light">
                        <Row className="g-4">
                          {markFields.map((field) => (
                            <Col md={6} lg={4} key={field.id}>
                              <Form.Group>
                                <Form.Label className="fw-semibold d-flex align-items-center justify-content-between">
                                  <span>
                                    {field.label}
                                    {field.isEvaluationParam && field.paramCode && (
                                      <span className="text-muted small ms-1">
                                        ({field.paramCode})
                                      </span>
                                    )}
                                  </span>
                                  <span className="badge bg-info">
                                    Max: {field.maxMarks}
                                  </span>
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Enter marks"
                                  value={subjectMarks[field.name] || ''}
                                  onChange={(e) => handleMarkChange(subject.id, field.name, e.target.value)}
                                  className="bg-white"
                                  min="0"
                                  max={field.maxMarks}
                                  step="0.01"
                                />
                                {field.isEvaluationParam && (
                                  <Form.Text className="text-muted small">
                                    Weight: {field.maxMarks}%
                                  </Form.Text>
                                )}
                              </Form.Group>
                            </Col>
                          ))}
                        </Row>
                        
                        <div className="d-flex justify-content-end mt-4">
                          <Button
                            variant="success"
                            onClick={() => handleSaveSubject(subject.id, subject.name)}
                            className="d-flex align-items-center gap-2"
                          >
                            <Save size={18} />
                            Save {subject.name} Marks
                          </Button>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Card>
                );
              })}
            </Accordion>

            {/* Save All Button */}
            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                size="lg"
                onClick={handleSaveAll}
                className="d-flex align-items-center gap-2"
              >
                <i className="fas fa-save"></i>
                Save All Marks
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MarksEntryPage;