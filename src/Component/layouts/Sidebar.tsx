// src/components/layout/Sidebar.tsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  role: 'admin' | 'teacher' | 'student';
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const adminMenu = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/students', label: 'Student Management', icon: '👨‍🎓' },
    { path: '/admin/teachers', label: 'Teacher Management', icon: '👨‍🏫' },
    { path: '/admin/courses', label: 'Course Management', icon: '📚' },
    { path: '/admin/faculties', label: 'Faculty Management', icon: '🏛️' },
    { path: '/admin/reports', label: 'Reports', icon: '📈' },
  ];

  const teacherMenu = [
    { path: '/teacher/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/teacher/marks', label: 'Marks Entry', icon: '📝' },
    { path: '/teacher/resources', label: 'Resources', icon: '📁' },
    { path: '/teacher/feedback', label: 'Feedback', icon: '💬' },
  ];

  const studentMenu = [
    { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/student/results', label: 'View Results', icon: '📊' },
    { path: '/student/resources', label: 'Resources', icon: '📁' },
    { path: '/student/feedback', label: 'Feedback', icon: '💬' },
  ];

  const menuItems = role === 'admin' ? adminMenu : 
                   role === 'teacher' ? teacherMenu : studentMenu;

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <i className="fas fa-graduation-cap"></i>
          {isOpen && <span className="logo-text">IES</span>}
        </div>
        {isOpen && (
          <div className="sidebar-portal">
            {role === 'admin' && 'Admin Portal'}
            {role === 'teacher' && 'Teacher Portal'}
            {role === 'student' && 'Student Portal'}
          </div>
        )}
      </div>
      <Nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Nav.Link
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && <span className="nav-label">{item.label}</span>}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;