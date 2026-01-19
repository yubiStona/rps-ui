import React, { useState } from 'react';
import { 
  Container, Row, Col, Form, Card, 
  Accordion, Button 
} from 'react-bootstrap';
import { ChevronDown, ChevronUp, Save } from 'lucide-react';
import CommonBreadCrumb from '../common/BreadCrumb';
import { FaTachometerAlt, FaUserGraduate } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface MarksData {
  theory: string;
  assignment: string;
  discipline: string;
  attendance: string;
  uniform: string;
  punctuality: string;
}

interface MarkField {
  name: keyof MarksData;
  label: string;
  maxMarks: number;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  marks: MarksData;
}

interface StudentInfo {
  name: string;
  rollNo: string;
  semester: string;
  registrationNo: string;
}

const MarksEntryPage = () => {
  const [selectedTerminal, setSelectedTerminal] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const markFields: MarkField[] = [
    { name: 'theory', label: 'Theory', maxMarks: 40 },
    { name: 'assignment', label: 'Assignment', maxMarks: 20 },
    { name: 'discipline', label: 'Discipline', maxMarks: 10 },
    { name: 'attendance', label: 'Attendance', maxMarks: 10 },
    { name: 'uniform', label: 'Uniform', maxMarks: 10 },
    { name: 'punctuality', label: 'Punctuality', maxMarks: 10 }
  ];

  const [studentInfo] = useState<StudentInfo>({
    name: 'John Doe',
    rollNo: '2024-CS-001',
    semester: '5th Semester',
    registrationNo: 'REG-2024-001'
  });

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Mathematics',
      code: 'MATH101',
      marks: { theory: '', assignment: '', discipline: '', attendance: '', uniform: '', punctuality: '' }
    },
    {
      id: '2',
      name: 'Physics',
      code: 'PHY101',
      marks: { theory: '', assignment: '', discipline: '', attendance: '', uniform: '', punctuality: '' }
    },
    {
      id: '3',
      name: 'Chemistry',
      code: 'CHEM101',
      marks: { theory: '', assignment: '', discipline: '', attendance: '', uniform: '', punctuality: '' }
    },
    {
      id: '4',
      name: 'English',
      code: 'ENG101',
      marks: { theory: '', assignment: '', discipline: '', attendance: '', uniform: '', punctuality: '' }
    }
  ]);

  const handleMarkChange = (subjectId: string, field: keyof MarksData, value: string) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(subject =>
        subject.id === subjectId
          ? { ...subject, marks: { ...subject.marks, [field]: value } }
          : subject
      )
    );
  };

  const handleSaveSubject = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      console.log('Saving marks for subject:', subject);
      toast.success(`Saved marks for ${subject.name}`);
    }
  };

  const handleSaveAll = () => {
    console.log('Saving all marks:', subjects);
    toast.success('All marks saved successfully!');
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
                  <strong>{studentInfo.name}</strong>
                </div>
              </Col>
              <Col md={3} className="mb-3 mb-md-0">
                <div>
                  <small className="text-muted d-block mb-1">Roll Number</small>
                  <strong>{studentInfo.rollNo}</strong>
                </div>
              </Col>
              <Col md={3} className="mb-3 mb-md-0">
                <div>
                  <small className="text-muted d-block mb-1">Semester</small>
                  <strong>{studentInfo.semester}</strong>
                </div>
              </Col>
              <Col md={3}>
                <div>
                  <small className="text-muted d-block mb-1">Registration Number</small>
                  <strong>{studentInfo.registrationNo}</strong>
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

        {/* Subject Cards */}
        <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key as string)} className="mb-4">
          {subjects.map((subject) => (
            <Card
              key={subject.id}
              className="mb-3 border-0 shadow-sm"
            >
              <Accordion.Item eventKey={subject.id} className="border-0">
                <Accordion.Header className="bg-white">
                  <div className="w-100 d-flex justify-content-between align-items-center pe-3">
                    <div>
                      <span className="fw-semibold">
                        {subject.name}
                      </span>
                      <span className="text-muted ms-2">
                        {subject.code}
                      </span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="bg-light">
                  <Row className="g-4">
                    {markFields.map((field) => (
                      <Col md={6} lg={4} key={field.name}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            {field.label} <span className="text-muted">(out of {field.maxMarks})</span>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter marks"
                            value={subject.marks[field.name]}
                            onChange={(e) => handleMarkChange(subject.id, field.name, e.target.value)}
                            className="bg-white"
                            min="0"
                            max={field.maxMarks}
                          />
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>
                  <div className="d-flex justify-content-end mt-4">
                    <Button
                      variant="success"
                      onClick={() => handleSaveSubject(subject.id)}
                      className="d-flex align-items-center gap-2"
                    >
                      <Save size={18} />
                      Save {subject.name} Marks
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          ))}
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
            Save All
          </Button>
        </div>
      </div>
    </>
  );
};

export default MarksEntryPage;