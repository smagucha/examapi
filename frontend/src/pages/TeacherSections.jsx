import "../css/Home.css";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaUsers,
  FaChalkboardTeacher,

} from "react-icons/fa";

export default function TeacherSections() {
  const cards = [
    { title: "all teacher", icon: <FaUsers />, path: "/teacherlist" },
    { title: "teacher subjects", icon: <FaChalkboardTeacher />, path: "/teachersubject/" },
    { title: "teacher designation", icon: <FaUserGraduate />, path: "/designations/" },
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