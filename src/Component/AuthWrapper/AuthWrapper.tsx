import React, { ReactNode } from "react";
import "./css/auth.css";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <div className="container1">
      {/* Logo Panel - Desktop Only */}
      <div className="logo-panel">
        <div className="logo-content">
          <div className="logo-container">
            <div className="logo-circle">
              <i className="fas fa-graduation-cap logo-icon"></i>
            </div>
          </div>
          <h1 className="system-title">IES</h1>
          <div className="title-underline"></div>
          <p className="system-subtitle">Internal Evaluation System</p>
          <div className="feature-icons">
            <div className="feature-item">
              <i className="fas fa-chart-line"></i>
              <span>Analytics</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-shield-alt"></i>
              <span>Secure</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-bolt"></i>
              <span>Fast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Wrapper - Right Side */}
      <div className="forms-container">
        <div className="signin-signup">{children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
