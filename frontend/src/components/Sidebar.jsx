import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "All Students", path: "/students" },
    { name: "Parents", path: "/parents" },
    { name: "Teachers", path: "/teachers" },
    { name: "Events", path: "/events" },
    { name: "Take Attendance", path: "/take_attendance" },
    { name: "View Attendance", path: "/view_attendance" },
    { name: "Enter Results", path: "/enter_results" },
    { name: "Update Results", path: "/update_results" },
    { name: "Subject Ranking", path: "/subject_ranking" },
    { name: "Class & Stream Ranking", path: "/class_ranking" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>School Dashboard</h2>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;