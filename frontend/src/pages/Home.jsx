import "../css/Home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  FaUserGraduate,
  FaUsers,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClipboardCheck,
  FaEye,
  FaPenFancy,
  FaEdit,
  FaChartBar,
  FaFileAlt,
  FaTrophy,
  FaCog,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const cards = [
    { title: "Classes", icon: <FaUserGraduate />, path: "/Classes" },
    { title: "Parents", icon: <FaUsers />, path: "/parents" },
    { title: "Teachers", icon: <FaChalkboardTeacher />, path: "/teachers" },
    { title: "Events", icon: <FaCalendarAlt />, path: "/events" },
    { title: "Take Attendance", icon: <FaClipboardCheck />, path: "/take-attendance" },
    { title: "View Attendance", icon: <FaEye />, path: "/view-attendance" },
    { title: "Enter Result", icon: <FaPenFancy />, path: "/enter-result" },
    { title: "Update Results", icon: <FaEdit />, path: "/update-results" },
    { title: "Subject Ranking", icon: <FaChartBar />, path: "/subject-ranking" },
    { title: "Results Per Class", icon: <FaFileAlt />, path: "/results-per-class" },
    { title: "Setting", icon: <FaCog />, path: "/settings" },
  ];
  const { auth } = useContext(AuthContext);
  return (
    <div className="home-container">
      <Navbar 
        user={auth.user}
        onLogout={() => {
          localStorage.clear();
          window.location.href = "/login";
        }} 
      />
      <div className="card-grid">
        {cards.map((card, index) => (
          <Link to={card.path} className="card-link" key={index}>
            <div className="dashboard-card">
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}