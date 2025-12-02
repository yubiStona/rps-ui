import React from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import DashboardLayout from '../../layouts/DashboardLayout';

const StudentResults: React.FC = () => {
  const results = [
    {
      courseCode: 'CS101',
      courseName: 'Introduction to Programming',
      assignment: 22,
      midterm: 24,
      final: 35,
      practical: 9,
      total: 90,
      average: 90,
      grade: 'A+'
    },
    {
      courseCode: 'CS102',
      courseName: 'Data Structures',
      assignment: 20,
      midterm: 22,
      final: 32,
      practical: 8,
      total: 82,
      average: 82,
      grade: 'A'
    },
    {
      courseCode: 'MATH101',
      courseName: 'Calculus I',
      assignment: 18,
      midterm: 20,
      final: 30,
      practical: 7,
      total: 75,
      average: 75,
      grade: 'B'
    }
  ];

  const overall = {
    totalMarks: results.reduce((sum, result) => sum + result.total, 0),
    average: Math.round(results.reduce((sum, result) => sum + result.average, 0) / results.length),
    cgpa: 3.8,
    coursesCompleted: results.length
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h2 className="fw-bold">My Results</h2>
        <p className="text-muted">Semester 3 - 2024</p>
      </div>

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="border-0 bg-primary text-white text-center">
            <Card.Body>
              <h4 className="fw-bold">{overall.average}%</h4>
              <p className="mb-0">Overall Average</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 bg-success text-white text-center">
            <Card.Body>
              <h4 className="fw-bold">{overall.cgpa}</h4>
              <p className="mb-0">CGPA</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 bg-info text-white text-center">
            <Card.Body>
              <h4 className="fw-bold">{overall.coursesCompleted}</h4>
              <p className="mb-0">Courses Completed</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Detailed Results</h5>
          <Button variant="outline-primary">
            📄 Download PDF
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Assignment</th>
                  <th>Midterm</th>
                  <th>Final</th>
                  <th>Practical</th>
                  <th>Total</th>
                  <th>Average</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{result.courseCode}</td>
                    <td>{result.courseName}</td>
                    <td>{result.assignment}/25</td>
                    <td>{result.midterm}/25</td>
                    <td>{result.final}/40</td>
                    <td>{result.practical}/10</td>
                    <td className="fw-bold">{result.total}/100</td>
                    <td className="fw-bold">{result.average}%</td>
                    <td className={`fw-bold ${
                      result.grade === 'A+' ? 'text-success' :
                      result.grade === 'F' ? 'text-danger' : 'text-primary'
                    }`}>
                      {result.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
};

export default StudentResults;