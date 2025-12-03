import React, { useRef, KeyboardEvent, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { toast } from 'react-toastify';
import "./css/auth.css";
import { useVerifyOTPMutation } from "../../features/auth/authApi";
import { useVerifyEmailMutation } from "../../features/auth/authApi";

interface OTPVerificationComponentProps {
  email: string;
  onVerifyOTP: (otp: string) => void;
  onBack: () => void;
}

interface OTPFormData {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
}

const OTPVerificationComponent: React.FC<OTPVerificationComponentProps> = ({
  email,
  onVerifyOTP,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors,isSubmitting },
  } = useForm<OTPFormData>({
    defaultValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
    },
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpValues = watch();

  // Timer state - 10 minutes = 600 seconds
  const [timeLeft, setTimeLeft] = useState(600);
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimerExpired(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const [verifyOTP, { isLoading: isVerifying }] = useVerifyOTPMutation();
  const [resendOTP, { isLoading: resending }] = useVerifyEmailMutation();
  const onSubmit: SubmitHandler<OTPFormData> = async (data) => {
    const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}${data.otp6}`;
    console.log("Verify OTP:", otp);
    try {
      const res = await verifyOTP({ email, otp }).unwrap();
      if (res.statusCode == 200 || res.success) {
        toast.success(res?.message || "OTP verified successfully.");
        onVerifyOTP(otp);
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to verify OTP.";
      toast.error(errorMessage);

    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const fieldName = `otp${index + 1}` as keyof OTPFormData;
    setValue(fieldName, value.slice(0, 1));

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const fieldName = `otp${index + 1}` as keyof OTPFormData;
    if (e.key === "Backspace" && !otpValues[fieldName] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      const fieldName = `otp${i + 1}` as keyof OTPFormData;
      setValue(fieldName, pastedData[i]);
    }

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResendOTP = async () => {
    try {
      const res = await resendOTP({email}).unwrap();
      if (res?.statusCode == 200 || res?.status) {
        toast.success(res?.message || "OTP sent successfully.");
        reset();
        setTimeLeft(600);
        setIsTimerExpired(false);
      }

      inputRefs.current[0]?.focus();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to send OTP.";
      toast.error(errorMessage);
    }
  };

  const isOTPComplete = Object.values(otpValues).every((val) => val !== "");

  // Show expired message if timer ran out
  if (isTimerExpired) {
    return (
      <form className="sign-in-form">
        <div className="mobile-logo-header">
          <div className="mobile-logo-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <h2 className="mobile-logo-text">RPS</h2>
          <p className="mobile-logo-subtitle">Result Processing System</p>
        </div>

        <h2 className="title">OTP Expired</h2>
        <p
          style={{
            fontSize: "0.95rem",
            color: "#e74c3c",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Your OTP has expired. Please request a new one.
        </p>

        <input
          type="button"
          value="Resend OTP"
          className="btn-auth"
          onClick={handleResendOTP}
        />

        <button
          type="button"
          className="forgot-link"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginTop: "0.5rem",
            color: "#888",
          }}
        >
          Back
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
      {/* Mobile Logo Header */}
      <div className="mobile-logo-header">
        <div className="mobile-logo-icon">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <h2 className="mobile-logo-text">IES</h2>
        <p className="mobile-logo-subtitle">Internal Evaluation System</p>
      </div>

      <h2 className="title">Verify OTP</h2>
      <p
        style={{
          fontSize: "0.95rem",
          color: "#666",
          marginBottom: "0.5rem",
          textAlign: "center",
        }}
      >
        Enter the 6-digit code sent to{" "}
        <strong style={{ color: "#5995fd" }}>{email}</strong>
      </p>

      {/* Timer Display */}
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          color: timeLeft < 60 ? "#e74c3c" : "#5995fd",
          marginBottom: "1rem",
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <i className="fas fa-clock" style={{ marginRight: "0.5rem" }}></i>
        {formatTime(timeLeft)}
      </div>

      <div className="otp-container">
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const fieldName = `otp${index + 1}` as keyof OTPFormData;
          return (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="otp-input"
              {...register(fieldName, { required: true })}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              autoFocus={index === 0}
            />
          );
        })}
      </div>

      <input
        type="submit"
        value={isVerifying ? "Verifying..." : "Verify OTP"}
        className="btn-auth"
        disabled={isVerifying || !isOTPComplete}
      />

      <input
        type="button"
        className="forgot-link"
        onClick={handleResendOTP}
        value={resending ? "Resending..." : "Resend OTP"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          marginTop: "0.5rem",
        }}
      />

      <button
        type="button"
        className="forgot-link"
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          marginTop: "0.3rem",
          color: "#888",
        }}
      >
        Back
      </button>
    </form>
  );
};

export default OTPVerificationComponent;
