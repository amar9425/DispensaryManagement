import React, { useState } from 'react';
import './forgotModal.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const ForgotModal = (props) => {
  const [step, setStep] = useState(1);
  const [buttonText, setButtonText] = useState("Send OTP");
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  const API = import.meta.env.VITE_BACKEND_URL;

  const handleOnChange = (event, key) => {
    setInputField({ ...inputField, [key]: event.target.value });
  };

  const sendOTPToMail = async () => {
    if (inputField.email.trim().length === 0) return toast.error("Please enter your email.");
    props.showLoader();
    try {
      const response = await axios.post(`${API}/api/auth/send-otp`, { email: inputField.email }, { withCredentials: true });
      setStep(2);
      setButtonText("Enter the OTP");
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to send OTP");
    } finally {
      props.hideLoader();
    }
  };

  const checkOtp = async () => {
    if (inputField.otp.trim().length === 0) return toast.error("Please enter the OTP.");
    props.showLoader();
    try {
      const response = await axios.post(`${API}/api/auth/verify-otp`, {
        email: inputField.email,
        otp: inputField.otp
      }, { withCredentials: true });
      setStep(3);
      setButtonText("Update Password");
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err?.response?.data?.error || "OTP verification failed");
    } finally {
      props.hideLoader();
    }
  };

  const resetPassword = async () => {
    if (inputField.newPassword.trim().length === 0) return toast.error("Please enter new password.");
    props.showLoader();
    try {
      const response = await axios.post(`${API}/api/auth/reset-password`, {
        email: inputField.email,
        newPassword: inputField.newPassword
      }, { withCredentials: true });
      toast.success(response.data.message);
      props.closeModal();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Password reset failed");
    } finally {
      props.hideLoader();
    }
  };

  const handleForgotBtn = async () => {
    if (step === 1) {
      await sendOTPToMail();
    } else if (step === 2) {
      await checkOtp();
    } else if (step === 3) {
      await resetPassword();
    }
  };

  return (
    <div className='forgot-password-modal'>
      <div className='signup-page-card'>
        <div className='card-header-form'>Reset Password</div>
        <div className='form-input-fields'>
          <input
            value={inputField.email}
            disabled={step !== 1}
            onChange={(e) => handleOnChange(e, 'email')}
            className='form-input'
            type="email"
            placeholder='Enter your email'
          />
          {(step === 2 || step === 3) && (
            <input
              value={inputField.otp}
              disabled={step !== 2}
              onChange={(e) => handleOnChange(e, 'otp')}
              className='form-input'
              type="text"
              placeholder='Enter OTP'
            />
          )}
          {step === 3 && (
            <input
              value={inputField.newPassword}
              onChange={(e) => handleOnChange(e, 'newPassword')}
              className='form-input'
              type="password"
              placeholder='New Password'
            />
          )}
        </div>
        <div className='form-btn forgot-password-btn' onClick={handleForgotBtn}>
          {buttonText}
        </div>
        <div className='form-btn forgot-password-btn' onClick={props.closeModal}>
          Cancel
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotModal;
