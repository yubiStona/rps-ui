// src/layouts/DashboardLayout.tsx
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { clearCredentials } from "../features/auth/authSlice";
import Sidebar from "../Component/layouts/Sidebar";
import Topbar from "../Component/layouts/Topbar";
import { getRoleByType } from "../helper";
import { useLogoutMutation } from "../features/auth/authApi";
import { toast } from "react-toastify";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [topbarVisible, setTopbarVisible] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [ logout ] = useLogoutMutation();

  // Refs for scroll tracking
  const scrollPositionRef = useRef(0);
  const mainContentRef = useRef<HTMLDivElement>(null);

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
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll to show/hide topbar
  useEffect(() => {
    const contentArea = mainContentRef.current?.querySelector(".content-area");
    if (!contentArea) return;

    const handleScroll = () => {
      const currentScroll = contentArea.scrollTop;
      const scrollDifference = currentScroll - scrollPositionRef.current;

      // Only hide/show on significant scroll (more than 5px to prevent jitter)
      if (Math.abs(scrollDifference) > 5) {
        if (scrollDifference > 0 && currentScroll > 50) {
          // Scrolling DOWN and not at the very top
          setTopbarVisible(false);
        } else {
          // Scrolling UP or at top
          setTopbarVisible(true);
        }
      }

      scrollPositionRef.current = currentScroll;
    };

    contentArea.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      contentArea.removeEventListener("scroll", handleScroll);
    };
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
      window.location.href = "/";
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user) {
    return null;
  }

  const userRole = getRoleByType(user.UserType) as
    | "admin"
    | "teacher"
    | "student";

  return (
    <div className="dashboard-layout">
      <Sidebar
        role={userRole}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        ref={mainContentRef}
        className={`main-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div
          className={`topbar-wrapper ${topbarVisible ? "visible" : "hidden"}`}
        >
          <Topbar
            user={{
              name: user.name || "User",
              email: user.email || "",
              role: userRole,
            }}
            // sidebarOpen={sidebarOpen}
            onToggleSidebar={toggleSidebar}
            onLogout={handleLogout}
          />
        </div>
        <div className="content-area">{children}</div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
