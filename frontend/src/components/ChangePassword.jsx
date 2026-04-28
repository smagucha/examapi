import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      console.log(token)
      const res = await axios.post(
        "http://127.0.0.1:8000/useraccount/change-password/",
        {
          old_password: formData.old_password,
          new_password: formData.new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setMessage(res.data.message);
      setError("");

      // Optional: logout user
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Change Password</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="old_password"
          placeholder="Old Password"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="new_password"
          placeholder="New Password"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm New Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;