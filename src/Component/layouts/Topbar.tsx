import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

interface TopbarProps {
  onToggleSidebar: () => void;
  onLogout: () => void;
  user: { name: string; email: string; role: string };
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, onLogout, user }) => {
  return (
    <Navbar className="topbar bg-white shadow-sm">
      <div className="container-fluid">
        <button
          className="btn sidebar-toggle"
          onClick={onToggleSidebar}
          title="Toggle Sidebar"
        >
          ≡
        </button>
        
        <Navbar.Brand className="topbar-brand">
          Internal Evaluation System
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="user-dropdown" className="user-dropdown">
              <i className="fas fa-user me-2"></i>
              {user.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="fas fa-user me-2"></i>Profile
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fas fa-cog me-2"></i>Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Topbar;