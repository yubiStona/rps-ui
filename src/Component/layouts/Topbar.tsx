import React from "react";
import { Navbar, Nav, Dropdown, Badge, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface TopbarProps {
  onToggleSidebar: () => void;
  onLogout: () => void;
  user: { name: string; email: string; role: string };
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, onLogout, user }) => {
  const navigate = useNavigate();
  const { title, subtitle } = useAppSelector((state) => state.ui);
  // Format role display name
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "teacher":
        return "Teacher";
      case "student":
        return "Student";
      default:
        return "User";
    }
  };

  // Get dashboard title based on user role
  const getDashboardTitle = (role: string) => {
    switch (role) {
      case "admin":
        return "Result Management Dashboard";
      case "teacher":
        return "Teacher Dashboard";
      case "student":
        return "Student Dashboard";
      default:
        return "Dashboard";
    }
  };

  // Get dashboard subtitle based on user role
  const getDashboardSubtitle = (role: string) => {
    switch (role) {
      case "admin":
        return "Here's an overview of your LMS performance";
      case "teacher":
        return "Manage your courses and students";
      case "student":
        return "Track your progress and results";
      default:
        return "Welcome to your dashboard";
    }
  };

  const displayTitle = title || getDashboardTitle(user.role);
  const displaySubtitle = subtitle || `Welcome back, ${user.name}. ${getDashboardSubtitle(user.role)}`;

  return (
    <Navbar
      className="bg-white shadow-sm border-bottom position-sticky top-0"
      style={{
        zIndex: 1020,
        height: "80px",
        minHeight: "80px",
      }}
    >
      <Container fluid className="px-4 h-100">
        <div className="d-flex align-items-center justify-content-between w-100 h-100">
          {/* Left Side - Toggle Button and Brand */}
          <div className="d-flex align-items-center">
            <button
              className="btn btn-link text-dark p-0 me-3"
              onClick={onToggleSidebar}
              title="Toggle Sidebar"
              style={{
                width: "24px",
                height: "24px",
                border: "none",
                background: "none",
              }}
            >
              <i className="fas fa-bars" style={{ fontSize: "20px" }}></i>
            </button>
            <div className="d-flex flex-column justify-content-center">
              <h1
                className="fw-bold mb-1 text-dark"
                style={{ fontSize: "28px", lineHeight: "1.2" }}
              >
                {displayTitle}
              </h1>
              <p
                className="text-muted mb-0 d-none d-md-block"
                style={{ fontSize: "16px", lineHeight: "1.2" }}
              >
                {displaySubtitle}
              </p>
            </div>
          </div>

          {/* Right Side - User Info and Notifications */}
          <Nav className="align-items-center">
            {/* Notification Bell */}
            <div className="position-relative me-3">
              <button
                className="btn btn-light p-2 rounded-circle border-0"
                title="Show Notifications"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <i
                  className="fas fa-bell text-dark"
                  style={{ fontSize: "18px" }}
                ></i>
              </button>
              <Badge
                pill
                bg="danger"
                className="position-absolute"
                style={{
                  fontSize: "0.65rem",
                  padding: "0.25em 0.5em",
                  minWidth: "18px",
                  top: "0",
                  right: "0",
                  transform: "translate(25%, -25%)",
                }}
              >
                3
              </Badge>
            </div>

            {/* User Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                id="user-dropdown"
                className="d-flex align-items-center px-2 py-1 border-0"
                style={{
                  minHeight: "40px",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center me-2 rounded-circle text-white"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "linear-gradient(135deg, #4a6fa5, #166088)",
                    fontSize: "14px",
                    fontWeight: "600",
                    flexShrink: 0,
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-start d-none d-lg-block">
                  <div
                    className="fw-semibold text-dark"
                    style={{ fontSize: "14px", lineHeight: "1.3" }}
                  >
                    {user.name}
                  </div>
                  <div
                    className="text-muted"
                    style={{ fontSize: "12px", lineHeight: "1.3" }}
                  >
                    {getRoleDisplayName(user.role)}
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="shadow border"
                style={{
                  minWidth: "280px",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              >
                <Dropdown.Header className="text-muted small py-2">
                  Signed in as
                  <br />
                  <span className="fw-bold text-dark">{user.email}</span>
                </Dropdown.Header>
                <Dropdown.Divider className="my-1" />
                <Dropdown.Item className="d-flex align-items-center py-2 px-3">
                  <i
                    className="fas fa-user me-3 text-primary"
                    style={{ width: "20px" }}
                  ></i>
                  <div>
                    <div className="fw-semibold">Profile</div>
                    <small className="text-muted">View your profile</small>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex align-items-center py-2 px-3"
                  onClick={() => navigate("/admin/administration")}
                >
                  <i
                    className="fas fa-user-gear me-3 text-warning"
                    style={{ width: "20px" }}
                  ></i>
                  <div>
                    <div className="fw-semibold">Administration</div>
                    <small className="text-muted">Manage your admins</small>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider className="my-1" />
                <Dropdown.Item
                  onClick={onLogout}
                  className="d-flex align-items-center py-2 px-3 text-danger"
                >
                  <i
                    className="fas fa-sign-out-alt me-3"
                    style={{ width: "20px" }}
                  ></i>
                  <div>
                    <div className="fw-semibold">Logout</div>
                    <small>Sign out from system</small>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;
