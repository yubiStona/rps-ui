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
  const [performanceData] = useState([
    { course: "Mathematics", score: 85 },
    { course: "Science", score: 78 },
    { course: "English", score: 92 },
    { course: "History", score: 75 },
    { course: "Computer Science", score: 88 },
    { course: "Physics", score: 80 },
  ]);

  const [distributionData, setDistributionData] = useState<
    { program: string; students: number; color: string }[]
  >([]);

  const generateColor = (index: number) => {
    const hue = (index * 137.508) % 360; // golden angle
    return `hsl(${hue}, 65%, 55%)`;
  };

  const {data:statisticsData,isLoading} = useGetStatisticsQuery();

  useEffect(() => {
    if (!statisticsData?.data?.studentsDistributions) return;

    const mappedData = Object.entries(
      statisticsData.data.studentsDistributions
    ).map(([program, students], index) => ({
      program,
      students,
      color: generateColor(index + 1),
    }));

    setDistributionData(mappedData);
  }, [statisticsData]);

  const stats = [
    {
      title: "Total Students",
      value: statisticsData?.data.students.total || 0,
      icon: <FaUsers />,
      color: "primary",
      id: "totalStudents",
    },
    {
      title: "Total Programs",
      value:statisticsData?.data.programs || 0,
      icon: <FaBook />,
      color: "success",
      id: "totalPrograms",
    },
    {
      title: "Total Teachers",
      value:statisticsData?.data.teachers || 0,
      icon: <FaChalkboardTeacher />,
      color: "info",
      id: "totalTeachers",
    },
    {
      title: "Total Faculties",
      value: statisticsData?.data.faculties || 0,
      icon: <FaUniversity />,
      color: "warning",
      id: "totalFaculties",
    },
  ];

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

  return (
    /* Main Dashboard Content - No header here */
    <div className="dashboard-content">
      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        {stats.map((stat, index) => (
          <Col xs={12} sm={6} lg={3} key={index}>
            <Card className="border-0 shadow-sm stat-card">
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 120 }}>
                  <span className="spinner-border text-primary" role="status" aria-hidden="true"></span>
                </div>
              ) : (
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
              )}
                  </Card>
                </Col>
              ))}
      </Row>

      {/* Charts Row */}
      <Row className="mb-4">
        {/* <Col lg={6} className="mb-4 mb-lg-0">
          <PerformanceChart data={performanceData} />
        </Col> */}
        <Col lg={12}>
          <StudentDistributionChart data={distributionData} Loading={isLoading} />
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
