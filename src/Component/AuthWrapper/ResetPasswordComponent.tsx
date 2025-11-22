import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./css/auth.css";

interface ResetPasswordComponentProps {
  email: string;
  onResetPassword: (password: string) => void;
}

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPasswordComponent: React.FC<ResetPasswordComponentProps> = ({
  email,
  onResetPassword,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const password = watch("password");

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    console.log("Reset password for:", email);
    // Add your reset password logic here
    // Example: await resetPasswordAPI(email, data.password);
    onResetPassword(data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
      {/* Mobile Logo Header */}
      <div className="mobile-logo-header">
        <div className="mobile-logo-icon">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <h2 className="mobile-logo-text">RPS</h2>
        <p className="mobile-logo-subtitle">Result Processing System</p>
      </div>

      <h2 className="title">Reset Password</h2>
      <p
        style={{
          fontSize: "0.95rem",
          color: "#666",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Enter your new password
      </p>

      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        <i
          className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
      {errors.password && (
        <span className="error-text">{errors.password.message}</span>
      )}

      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        <i
          className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
      {errors.confirmPassword && (
        <span className="error-text">{errors.confirmPassword.message}</span>
      )}

      <input
        type="submit"
        value={isSubmitting ? "Resetting..." : "Reset Password"}
        className="btn-auth"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default ResetPasswordComponent;
