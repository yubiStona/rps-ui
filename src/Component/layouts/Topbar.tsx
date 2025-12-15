import React, { useState } from "react";
import { Navbar, Nav, Dropdown, Badge } from "react-bootstrap";

interface TopbarProps {
  onToggleSidebar: () => void;
  onLogout: () => void;
  user: { name: string; email: string; role: string };
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, onLogout, user }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
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

  return (
    <Navbar className="topbar bg-white shadow-sm border-bottom">
      <div className="container-fluid px-3">
        {/* Left Side - Toggle Button and Brand */}
        <div className="d-flex align-items-center">
          <button
            className="btn sidebar-toggle me-3 p-2"
            onClick={onToggleSidebar}
            title="Toggle Sidebar"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="dashboard-title">
            <h4 className="fw-bold mb-1 text-dark">
              {getDashboardTitle(user.role)}
            </h4>
            <p className="text-muted mb-0 small">
              Welcome back, {user.name}. {getDashboardSubtitle(user.role)}
            </p>
          </div>
        </div>

        {/* Right Side - User Info and Notifications */}
        <Nav className="ms-auto align-items-center">
          {/* Notification Bell */}
          <div className="notification-wrapper position-relative me-3">
            <button
              className="btn btn-light btn-sm p-2 rounded-circle border"
              title="Show Notifications"
            >
              <i className="fas fa-bell text-dark"></i>
            </button>
            <Badge
              pill
              bg="danger"
              className="position-absolute top-0 start-100 translate-middle"
            >
              3
            </Badge>
          </div>

          {/* User Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              id="user-dropdown"
              className="user-dropdown d-flex align-items-center px-2"
            >
              <div className="user-avatar me-2">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info-text d-none d-md-block">
                <div>{user.name}</div>
                <div>{getRoleDisplayName(user.role)}</div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow-lg border-0 mt-2">
              <Dropdown.Header className="text-muted small">
                Signed in as
                <br />
                <span className="fw-bold">{user.email}</span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item className="d-flex align-items-center py-2">
                <i className="fas fa-user me-3 text-primary"></i>
                <div>
                  <div className="fw-semibold">Profile</div>
                  <small className="text-muted">View your profile</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className="d-flex align-items-center py-2">
                <i className="fas fa-cog me-3 text-warning"></i>
                <div>
                  <div className="fw-semibold">Settings</div>
                  <small className="text-muted">Manage your settings</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={onLogout}
                className="d-flex align-items-center py-2 text-danger"
              >
                <i className="fas fa-sign-out-alt me-3"></i>
                <div>
                  <div className="fw-semibold">Logout</div>
                  <small>Sign out from system</small>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Topbar;
