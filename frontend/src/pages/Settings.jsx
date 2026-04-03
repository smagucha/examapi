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

export default function Settings() {
  const cards = [
    { title: "subjects", icon: <FaUserGraduate />, path: "/subjectslist" },
    { title: "grades", icon: <FaUsers />, path: "/gradelist" },
    { title: "streams", icon: <FaChalkboardTeacher />, path: "/liststream" },
    { title: "terms", icon: <FaClipboardCheck />, path: "/listterm" },
    { title: "enroll student to subjects", icon: <FaEye />, path: "/view-attendance" },
    { title: "subjects enrolled by student", icon: <FaPenFancy />, path: "/enter-result" },
    { title: "classes", icon: <FaEdit />, path: "/listclass" },
    { title: "users", icon:<FaUsers/>, path:"/gradelist"},
  ];
  return (
    
    <div className="home-container">

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