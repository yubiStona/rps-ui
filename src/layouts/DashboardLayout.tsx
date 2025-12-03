// src/layouts/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { clearCredentials } from '../features/auth/authSlice';
import Sidebar from '../Component/layouts/Sidebar';
import Topbar from '../Component/layouts/Topbar';
import { getRoleByType } from '../helper';
import { useLogoutMutation } from '../features/auth/authApi';
import { toast } from 'react-toastify';
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logout, { isLoading: logging }] = useLogoutMutation();

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

  const handleLogout = async () => {
    try {
      const res = await logout(user?.email).unwrap();
      if (res?.statusCode == 200) {
        toast.success(res?.data?.message || "Logged out Successfully");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      dispatch(clearCredentials());
      window.location.href = '/';
    }
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