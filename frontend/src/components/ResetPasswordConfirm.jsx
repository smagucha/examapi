import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPasswordConfirm() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [new_password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (new_password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/useraccount/password/reset/confirm/`,
        {
          uidb64,
          token,
          new_password,
        }
      );
      
      setMessage(res.data.message);

      // Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Something went wrong");
      } else {
        setError("Network error");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Set New Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={new_password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Reset Password
        </button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ResetPasswordConfirm;