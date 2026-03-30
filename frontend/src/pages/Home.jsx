import "../css/Home.css";
import { Link } from "react-router-dom";
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

export default function Home() {
  const cards = [
    { title: "All Student", icon: <FaUserGraduate />, path: "/students" },
    { title: "Parents", icon: <FaUsers />, path: "/parents" },
    { title: "Teachers", icon: <FaChalkboardTeacher />, path: "/teachers" },
    { title: "Events", icon: <FaCalendarAlt />, path: "/events" },
    { title: "Take Attendance", icon: <FaClipboardCheck />, path: "/take-attendance" },
    { title: "View Attendance", icon: <FaEye />, path: "/view-attendance" },
    { title: "Enter Result", icon: <FaPenFancy />, path: "/enter-result" },
    { title: "Update Results", icon: <FaEdit />, path: "/update-results" },
    { title: "Subject Ranking", icon: <FaChartBar />, path: "/subject-ranking" },
    { title: "Results Per Class", icon: <FaFileAlt />, path: "/results-per-class" },
    { title: "Class Ranking", icon: <FaTrophy />, path: "/class-ranking" },
    { title: "Setting", icon: <FaCog />, path: "/setting" },
  ];

  return (
    
    <div className="home-container">
      <h1 className="home-title">Welcome to My Website</h1>

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