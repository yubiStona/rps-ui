import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  FaUsers,
  FaBook,
  FaChalkboardTeacher,
  FaUniversity,
} from "react-icons/fa";
import PerformanceChart from "./PerformanceChart";
import StudentDistributionChart from "./StudentDistributionChart";
import RecentActivity from "./RecentActivity";
import "./Dashboard.css";
import { useGetStatisticsQuery } from "../../features/admin/dashboard/dahboardApi";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState([
    {
      title: "Total Students",
      value: 1245,
      icon: <FaUsers />,
      color: "primary",
      id: "totalStudents",
    },
    {
      title: "Total Programs",
      value: 42,
      icon: <FaBook />,
      color: "success",
      id: "totalPrograms",
    },
    {
      title: "Total Teachers",
      value: 68,
      icon: <FaChalkboardTeacher />,
      color: "info",
      id: "totalTeachers",
    },
    {
      title: "Total Faculties",
      value: 5,
      icon: <FaUniversity />,
      color: "warning",
      id: "totalFaculties",
    },
  ]);

  const [performanceData] = useState([
    { course: "Mathematics", score: 85 },
    { course: "Science", score: 78 },
    { course: "English", score: 92 },
    { course: "History", score: 75 },
    { course: "Computer Science", score: 88 },
    { course: "Physics", score: 80 },
  ]);

const generateColor = (index: number) => {
  const hue = (index * 137.508) % 360; // golden angle
  return `hsl(${hue}, 65%, 55%)`;
};

const [distributionData] = useState([
  { program: "BBA", students: 0, color: generateColor(1) },
  { program: "BCA", students: 320, color: generateColor(2) },
  { program: "B.Tech", students: 250, color: generateColor(3) },
  { program: "B.Sc", students: 220, color: generateColor(4) },
  { program: "BA", students: 180, color: generateColor(5) },
  { program: "B.Com", students: 195, color: generateColor(6) },
]);


  const [activities] = useState([
    {
      id: 1,
      title: "Results published for Mathematics 101",
      description: "Results for the final exam have been published",
      time: "2 hours ago",
      icon: "check",
      type: "success" as const,
    },
    {
      id: 2,
      title: "3 results pending review",
      description: "Require attention from the examination committee",
      time: "5 hours ago",
      icon: "exclamation",
      type: "warning" as const,
    },
    {
      id: 3,
      title: "15 new students enrolled",
      description: "New batch of students added to the system",
      time: "1 day ago",
      icon: "user-plus",
      type: "info" as const,
    },
    {
      id: 4,
      title: "Performance report generated",
      description: "Monthly performance report is ready for download",
      time: "2 days ago",
      icon: "chart-line",
      type: "success" as const,
    },
  ]);

  const {data,isLoading} = useGetStatisticsQuery();

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: stat.value + Math.floor(Math.random() * 10) - 5,
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    /* Main Dashboard Content - No header here */
    <div className="dashboard-content">
      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        {stats.map((stat, index) => (
          <Col xs={12} sm={6} lg={3} key={index}>
            <Card className="border-0 shadow-sm stat-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
                  <div className="stat-info ms-3">
                    <h4 className="fw-bold mb-1">
                      {stat.value.toLocaleString()}
                    </h4>
                    <p className="text-muted mb-0">{stat.title}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row className="mb-4">
        <Col lg={6} className="mb-4 mb-lg-0">
          <PerformanceChart data={performanceData} />
        </Col>
        <Col lg={6}>
          <StudentDistributionChart data={distributionData} />
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row>
        <Col lg={12}>
          <Card className="border-0 shadow-sm activity-card">
            <Card.Header className="bg-white border-0">
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              <RecentActivity activities={activities} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
