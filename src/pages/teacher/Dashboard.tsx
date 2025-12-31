// src/pages/teacher/Dashboard.tsx
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = [
    { title: 'Total Courses', value: '8', icon: '📚', color: 'primary' },
    { title: 'Students', value: '240', icon: '👨‍🎓', color: 'success' },
    { title: 'Pending Marks', value: '45', icon: '📝', color: 'warning' },
    { title: 'Average Rating', value: '4.8', icon: '⭐', color: 'info' },
  ];
  
  const enterMarks = () => {
    navigate('/teacher/marks');
  }

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h2 className="fw-bold">Teacher Dashboard</h2>
        <p className="text-muted">Welcome back, Dr. Smith</p>
      </div>

      <Row className="g-3 mb-4">
        {stats.map((stat, index) => (
          <Col xs={12} sm={6} lg={3} key={index}>
            <Card className={`border-0 bg-${stat.color} text-white`}>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="fw-bold">{stat.value}</h4>
                    <p className="mb-0">{stat.title}</p>
                  </div>
                  <div className="display-4">{stat.icon}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Recent Activities</h5>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Activity</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CS101</td>
                      <td>Marks entry completed</td>
                      <td>2 hours ago</td>
                    </tr>
                    <tr>
                      <td>CS102</td>
                      <td>New assignment uploaded</td>
                      <td>1 day ago</td>
                    </tr>
                    <tr>
                      <td>CS101</td>
                      <td>Student feedback received</td>
                      <td>2 days ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary text-start" onClick={enterMarks}>
                  📝 Enter Marks
                </button>
                <button className="btn btn-outline-success text-start">
                  📁 Upload Resources
                </button>
                <button className="btn btn-outline-info text-start">
                  💬 View Feedback
                </button>
                <button className="btn btn-outline-warning text-start">
                  📊 View Reports
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default TeacherDashboard;