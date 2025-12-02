// src/layouts/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { clearCredentials } from '../features/auth/authSlice';
import Sidebar from '../Component/layouts/Sidebar';
import Topbar from '../Component/layouts/Topbar';
import { getRoleByType } from '../helper';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Auto-close sidebar on mobile, auto-open on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(clearCredentials());
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user) {
    return null;
  }

  const userRole = getRoleByType(user.UserType) as 'admin' | 'teacher' | 'student';

  return (
    <div className="dashboard-layout">
      <Sidebar role={userRole} isOpen={sidebarOpen} />
      
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="main-content">
        <Topbar 
          user={{
            name: user.name || 'User',
            email: user.email || '',
            role: userRole
          }} 
          onToggleSidebar={toggleSidebar}
          onLogout={handleLogout}
        />
        <Container fluid className="p-2">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default DashboardLayout;