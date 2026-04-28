import React, { useEffect, useState } from "react";
import api from "./api" 

function UpdateProfile() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔹 Fetch current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("http://127.0.0.1:8000/useraccount/update-user/");
        setFormData(res.data);
      } catch (err) {
        setError("Failed to load user data");
      }
    };

    fetchUser();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.patch(
        "/useraccount/update-user/",
        formData
      );

      setMessage("Profile updated successfully");
      setError("");
      setFormData(res.data);
    } catch (err) {
      setError("Update failed");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />

        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateProfile;