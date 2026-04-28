import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#1e293b",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  userSection: {
    position: "relative",
  },
  userButton: {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "40px",
    background: "#fff",
    color: "#000",
    borderRadius: "6px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "200px",
    overflow: "hidden",
    zIndex: 1000,
  },
  item: {
    padding: "10px",
    cursor: "pointer",
  },
  itemDisabled: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontWeight: "bold",
  },
  itemLogout: {
    padding: "10px",
    cursor: "pointer",
    color: "red",
  },
};

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>MyApp</h2>

      <div style={styles.userSection} ref={dropdownRef}>
        <button style={styles.userButton} onClick={() => setOpen(!open)}>
          {user?.username || "User"} 
        </button>

        {open && (
          <div style={styles.dropdown}>
            <div style={styles.itemDisabled}>
              👤 {user?.username}
            </div>
            <div
              style={styles.item}
              onClick={() => navigate("/change-password")}
            >
              🔒 Change Password
            </div>

            <div
              style={styles.item}
              onClick={() => navigate("/update-profile")}
            >
              ✏️ Update Profile
            </div>

            <div
              style={styles.itemLogout}
              onClick={onLogout}
            >
              🚪 Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;