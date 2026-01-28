
import React, { useState } from 'react';
import { signupStyles } from '../assets/dummyStyles';
import { ArrowLeft, CheckCircle, User, Mail, EyeOff, Eye, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Signup = ({ onSignupSuccess = null }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // ✅ added
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!isValidEmail(email)) e.email = "Please enter a valid email";

    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";

    if (!confirmPassword) e.confirmPassword = "Confirm Password is required";
    else if (password !== confirmPassword)
      e.confirmPassword = "Passwords do not match";

    return e;
  };

  const API_BASE = "http://localhost:4000";

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitError("");
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      };
      const resp = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await resp.json();
      } catch (e) {}

      if (!resp.ok) {
        const msg = data?.message || "Registration failed";
        setSubmitError(msg);
        return;
      }

      if (data?.token) {
        try {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(
              data.user || {
                name: name.trim(),
                email: email.trim().toLowerCase(),
              }
            )
          );
        } catch (error) {}
      }

      if (typeof onSignupSuccess === "function") {
        try {
          onSignupSuccess(
            data.user || {
              name: name.trim(),
              email: email.trim().toLowerCase(),
            }
          );
        } catch (err) {}
      }
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Signup error", error);
      setSubmitError("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={signupStyles.pageContainer}>
      <Link to="/login" className={signupStyles.backButton}>
        <ArrowLeft className={signupStyles.backButtonIcon} />
        <span className={signupStyles.backButtonText}>Back</span>
      </Link>
      <div className={signupStyles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={signupStyles.animatedBorder}>
            <div className={signupStyles.formContent}>
              <h2 className={signupStyles.heading}>
                <span className={signupStyles.headingIcon}>
                  <CheckCircle className={signupStyles.headingIconInner} />
                </span>
                <span className={signupStyles.headingText}>Create Account</span>
              </h2>
              <p className={signupStyles.subtitle}>
                Sign in to continue to Deccan Quiz. Light, Clean UI - smooth
                micro-animations and easy validation.
              </p>

              {/* Full Name */}
              <label className={signupStyles.label}>
                <span className={signupStyles.labelText}>Full Name</span>
                <div className={signupStyles.inputContainer}>
                  <span className={signupStyles.inputIcon}>
                    <User className={signupStyles.inputIconInner} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((s) => ({ ...s, name: undefined }));
                    }}
                    className={`${signupStyles.input} ${
                      errors.name ? signupStyles.inputError : signupStyles.inputNormal
                    }`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                {errors.name && <p className={signupStyles.errorText}>{errors.name}</p>}
              </label>

              {/* Email */}
              <label className={signupStyles.label}>
                <span className={signupStyles.labelText}>Email</span>
                <div className={signupStyles.inputContainer}>
                  <span className={signupStyles.inputIcon}>
                    <Mail className={signupStyles.inputIconInner} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((s) => ({ ...s, email: undefined }));
                    }}
                    className={`${signupStyles.input} ${
                      errors.email ? signupStyles.inputError : signupStyles.inputNormal
                    }`}
                    placeholder="your@example.com"
                    required
                  />
                </div>
                {errors.email && <p className={signupStyles.errorText}>{errors.email}</p>}
              </label>

              {/* Password */}
              <label className={signupStyles.label}>
                <span className={signupStyles.labelText}>Password</span>
                <div className={signupStyles.inputContainer}>
                  <span className={signupStyles.inputIcon}>
                    <Lock className={signupStyles.inputIconInner} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((s) => ({ ...s, password: undefined }));
                    }}
                    className={`${signupStyles.input} ${
                      errors.password ? signupStyles.inputError : signupStyles.inputNormal
                    }`}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword((s) => !s)}
                    className={signupStyles.passwordToggle}
                  >
                    {showPassword ? (
                      <EyeOff className={signupStyles.passwordToggleIcon} />
                    ) : (
                      <Eye className={signupStyles.passwordToggleIcon} />
                    )}
                  </button>
                </div>
                {errors.password && <p className={signupStyles.errorText}>{errors.password}</p>}
              </label>

              {/* Confirm Password */}
              <label className={signupStyles.label}>
                <span className={signupStyles.labelText}>Confirm Password</span>
                <div className={signupStyles.inputContainer}>
                  <span className={signupStyles.inputIcon}>
                    <Lock className={signupStyles.inputIconInner} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((s) => ({ ...s, confirmPassword: undefined }));
                    }}
                    className={`${signupStyles.input} ${
                      errors.confirmPassword ? signupStyles.inputError : signupStyles.inputNormal
                    }`}
                    placeholder="Confirm password"
                    required
                  />
                </div>
                {errors.confirmPassword && (
                  <p className={signupStyles.errorText}>{errors.confirmPassword}</p>
                )}
              </label>

              {/* Submit Error */}
              {submitError && <p className={signupStyles.errorText}>{submitError}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={signupStyles.submitButton}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </div>
        </form>

        <div className={signupStyles.loginPromptContainer} >
          <div className={signupStyles.loginPromptContent}>
            <span className={signupStyles.loginPromptText}>
                Already have an account?
            </span>
            <Link to='/login' className={signupStyles.loginPromptLink}>
            Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
