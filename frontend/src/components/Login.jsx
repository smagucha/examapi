import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await login(formData);

      navigate(from, { replace: true });

    } catch (err) {
      setError("Invalid username or password");
      console.error("Login failed");
    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>Login</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* Username */}
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {/* Extra Buttons */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/register">
          <button
            style={{
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </Link>

        <Link to="/forgot-password">
          <button
            style={{
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Forgot Password
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;