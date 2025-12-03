import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import DashboardLayout from '../../layouts/DashboardLayout';

const AdminDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Students', value: '1,234', icon: '👨‍🎓', color: 'primary' },
    { title: 'Total Teachers', value: '45', icon: '👨‍🏫', color: 'success' },
    { title: 'Courses', value: '89', icon: '📚', color: 'info' },
    { title: 'Faculties', value: '6', icon: '🏛️', color: 'warning' },
  ];

  return (
    <DashboardLayout >
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">Welcome to the Internal Evaluation System</p>
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
                      <th>Activity</th>
                      <th>User</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>New student registered</td>
                      <td>John Doe</td>
                      <td>2 hours ago</td>
                    </tr>
                    <tr>
                      <td>Course updated</td>
                      <td>Dr. Smith</td>
                      <td>4 hours ago</td>
                    </tr>
                    <tr>
                      <td>Marks entry completed</td>
                      <td>Prof. Johnson</td>
                      <td>1 day ago</td>
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
                <button className="btn btn-outline-primary text-start">
                  📝 Register New Student
                </button>
                <button className="btn btn-outline-success text-start">
                  👨‍🏫 Add Teacher
                </button>
                <button className="btn btn-outline-info text-start">
                  📚 Create Course
                </button>
                <button className="btn btn-outline-warning text-start">
                  📊 Generate Reports
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default AdminDashboard;