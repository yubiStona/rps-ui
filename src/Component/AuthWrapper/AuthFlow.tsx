import React, { useState } from "react";
import AuthWrapper from "./AuthWrapper";
import LoginComponent from "./LoginComponent";
import ForgotPasswordComponent from "./ForgotPasswordComponent";
import OTPVerificationComponent from "./OTPVerificationComponent";
import ResetPasswordComponent from "./ResetPasswordComponent";

type AuthStep = "login" | "forgotPassword" | "verifyOTP" | "resetPassword";

const AuthFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login");
  const [userEmail, setUserEmail] = useState<string>("");

  const handleForgotPassword = (): void => {
    setCurrentStep("forgotPassword");
  };

  const handleSendOTP = (email: string): void => {
    setUserEmail(email);
    setCurrentStep("verifyOTP");
  };

  const handleVerifyOTP = (otp: string): void => {
    console.log("OTP verified:", otp);
    // Add your OTP verification logic here
    setCurrentStep("resetPassword");
  };

  const handleResetPassword = (password: string): void => {
    console.log("Password reset successful");
    // Add your password reset logic here
    // After successful reset, redirect to login
    alert("Password reset successful! Please login with your new password.");
    setCurrentStep("login");
    setUserEmail("");
  };

  const handleBackToLogin = (): void => {
    setCurrentStep("login");
    setUserEmail("");
  };

  const handleBackToForgotPassword = (): void => {
    setCurrentStep("forgotPassword");
  };

  return (
    <AuthWrapper>
      {currentStep === "login" && (
        <LoginComponent onForgotPassword={handleForgotPassword} />
      )}
      {currentStep === "forgotPassword" && (
        <ForgotPasswordComponent
          onSendOTP={handleSendOTP}
          onBack={handleBackToLogin}
        />
      )}
      {currentStep === "verifyOTP" && (
        <OTPVerificationComponent
          email={userEmail}
          onVerifyOTP={handleVerifyOTP}
          onBack={handleBackToForgotPassword}
        />
      )}
      {currentStep === "resetPassword" && (
        <ResetPasswordComponent
          email={userEmail}
          onResetPassword={handleResetPassword}
        />
      )}
    </AuthWrapper>
  );
};

export default AuthFlow;
