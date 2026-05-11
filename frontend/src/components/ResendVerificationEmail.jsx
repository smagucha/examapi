import React, { useState } from "react";
import api from "../components/api";

function ResendVerificationEmail() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post(
        "/useraccount/resend-email-verification/",
        { email }
      );

      setMessage(response.data.message);
      setError("");

    } catch (err) {

      setMessage("");

      if (err.response) {
        setError(
          err.response.data.error ||
          "Request failed"
        );
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <div>
      <h2>Resend Verification Email</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          Send Verification Email
        </button>

      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

    </div>
  );
}

export default ResendVerificationEmail;