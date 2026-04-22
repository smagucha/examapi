import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://127.0.0.1:8000/useraccount/login/",
      formData
    );

    // ✅ Save tokens
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);

    // ✅ Update global state
    setAuth({
      access: res.data.access,
      refresh: res.data.refresh,
      user: res.data.username,
    });

    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" onChange={(e) =>
        setFormData({ ...formData, username: e.target.value })
      } />
      <input name="password" type="password" onChange={(e) =>
        setFormData({ ...formData, password: e.target.value })
      } />
      <button>Login</button>
    </form>
  );
}

export default Login;