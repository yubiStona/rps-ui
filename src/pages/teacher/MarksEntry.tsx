import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import DashboardLayout from '../../layouts/DashboardLayout';

interface MarkEntry {
  id: string;
  studentName: string;
  registrationNo: string;
  assignment: number;
  midterm: number;
  final: number;
  practical: number;
  total: number;
  average: number;
  grade: string;
}

const MarksEntry: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const [marks, setMarks] = useState<MarkEntry[]>([
    {
      id: '1',
      studentName: 'John Doe',
      registrationNo: '2023001',
      assignment: 0,
      midterm: 0,
      final: 0,
      practical: 0,
      total: 0,
      average: 0,
      grade: '-'
    }
  ]);

  const calculateMarks = (index: number, field: string, value: number) => {
    const updatedMarks = [...marks];
    updatedMarks[index] = {
      ...updatedMarks[index],
      [field]: value
    };

    const { assignment, midterm, final, practical } = updatedMarks[index];
    const total = assignment + midterm + final + practical;
    const average = total / 4;
    
    let grade = '-';
    if (average >= 90) grade = 'A+';
    else if (average >= 80) grade = 'A';
    else if (average >= 70) grade = 'B';
    else if (average >= 60) grade = 'C';
    else if (average >= 50) grade = 'D';
    else if (average > 0) grade = 'F';

    updatedMarks[index] = {
      ...updatedMarks[index],
      total,
      average: Math.round(average),
      grade
    };

    setMarks(updatedMarks);
  };

  return (
    <DashboardLayout role="teacher">
      <div className="mb-4">
        <h2 className="fw-bold">Marks Entry</h2>
        <p className="text-muted">Enter and manage student marks</p>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Select Course</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Faculty</Form.Label>
                <Form.Select 
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  <option value="">Select Faculty</option>
                  <option value="cs">Computer Science</option>
                  <option value="eng">Engineering</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Program</Form.Label>
                <Form.Select 
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                >
                  <option value="">Select Program</option>
                  <option value="bsc-cs">BSc Computer Science</option>
                  <option value="bsc-it">BSc IT</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Semester</Form.Label>
                <Form.Select 
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="">Select Semester</option>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Course</Form.Label>
                <Form.Select 
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  <option value="cs101">Introduction to Programming</option>
                  <option value="cs102">Data Structures</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {selectedCourse && (
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Student Marks</h5>
            <Button variant="primary">Save All Marks</Button>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Reg No</th>
                    <th>Assignment (25)</th>
                    <th>Midterm (25)</th>
                    <th>Final (40)</th>
                    <th>Practical (10)</th>
                    <th>Total</th>
                    <th>Average</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((mark, index) => (
                    <tr key={mark.id}>
                      <td>{mark.studentName}</td>
                      <td>{mark.registrationNo}</td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="25"
                          value={mark.assignment}
                          onChange={(e) => calculateMarks(index, 'assignment', parseInt(e.target.value) || 0)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="25"
                          value={mark.midterm}
                          onChange={(e) => calculateMarks(index, 'midterm', parseInt(e.target.value) || 0)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="40"
                          value={mark.final}
                          onChange={(e) => calculateMarks(index, 'final', parseInt(e.target.value) || 0)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="10"
                          value={mark.practical}
                          onChange={(e) => calculateMarks(index, 'practical', parseInt(e.target.value) || 0)}
                        />
                      </td>
                      <td className="fw-bold">{mark.total}</td>
                      <td className="fw-bold">{mark.average}%</td>
                      <td className={`fw-bold ${
                        mark.grade === 'A+' ? 'text-success' :
                        mark.grade === 'F' ? 'text-danger' : 'text-primary'
                      }`}>
                        {mark.grade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default MarksEntry;