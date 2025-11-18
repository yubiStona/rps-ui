import React, { useState, FormEvent, ChangeEvent } from "react";
import { useLoginUserMutation } from "../features/auth/authApi";
import "../assets/css/login.css";
import { setCredentials } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import {toast} from "react-toastify"

// Type definitions
interface FormData {
  email: string;
  password: string;
}

type InputType = "password" | "text";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const [inputType, setInputType] = useState<InputType>("password");
  const [login,{isLoading:isLogginIn}] = useLoginUserMutation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = (): void => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    try{
      e.preventDefault();
      const user_type="A";
      const data = {...formData,user_type}
      const res = await login(data).unwrap()
      if (res.status === "success") {
        dispatch(setCredentials({ user: res.userDetails }));
        toast.success(res.message || "Login successful!");
      }

    }catch(error:any){
      console.log("Failed to login: ", error);
      const errorMessage = error?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Mobile Logo Header */}
          <div className="mobile-logo-header">
            <div className="mobile-logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3 className="mobile-logo-text">RPS</h3>
            <p className="mobile-logo-subtitle">Result Processing System</p>
          </div>

          <h2 className="form-title">Sign in</h2>

          {/* Email Field */}
          <div className="input-field">
            <i className="fas fa-user" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="input-field">
            <i className="fas fa-lock" />
            <input
              name="password"
              type={inputType}
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <i
              className={
                inputType === "password" ? "fas fa-eye-slash" : "fas fa-eye"
              }
              onClick={togglePasswordVisibility}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#acacac",
                fontSize: "1.1rem",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>): void => {
                (e.target as HTMLElement).style.color = "#5995fd";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>): void => {
                (e.target as HTMLElement).style.color = "#acacac";
              }}
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="btn-login" disabled={isLogginIn}>
            {isLogginIn ? "Logging in..." : "Login"}
          </button>

          {/* Forgot Password Link */}
          <a href="/forgot-password" className="forgot-link">
            Forgot Password?
          </a>
        </form>
      </div>

      {/* Desktop Logo Panel */}
      <div className="logo-panel">
        <div className="logo-content">
          <div className="logo-container">
            <div className="logo-circle">
              <i className="fas fa-graduation-cap logo-icon" />
            </div>
          </div>
          <h1 className="system-title">Result Processing System</h1>
          <div className="title-underline"></div>
          <p className="system-subtitle">
            Welcome to our Result Management Platform
          </p>
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
    </div>
  );
};

export default LoginForm;
