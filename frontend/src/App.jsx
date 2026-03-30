import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Parent from "./pages/Parent";
import TakeAttendance from "./pages/TakeAttendance";
import TakeAttendanceForStream from "./pages/TakeAttendanceForStream";
import ViewAttendance from "./pages/ViewAttendance"
import ViewAttendancePerClassStream from './pages/ViewAttendancePerClassStream'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<h1>Students Page</h1>} />
        <Route path="/parents" element={<Parent/>} />
        <Route path="/teachers" element={<h1>Teachers Page</h1>} />
        <Route path="/events" element={<h1>Events Page</h1>} />
        <Route path="/take-attendance" element={<TakeAttendance/>} />
        <Route path="/take_attendance/:name" element={<TakeAttendanceForStream />} />
        <Route path="/take_attendance_for_stream/:name/:stream" element={<TakeAttendanceForStream />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/viewattendanceperclass/:name" element={<ViewAttendancePerClassStream />}/>
        <Route path="/viewattendanceperclass/:name/:stream" element={<ViewAttendancePerClassStream/>}/>
        <Route path="/enter-result" element={<h1>Enter Results</h1>} />
        <Route path="/update-results" element={<h1>Update Results</h1>} />
        <Route path="/subject-ranking" element={<h1>Subject Ranking</h1>} />
        <Route path="/results-per-class" element={<h1>Results Per Class</h1>} />
        <Route path="/class-ranking" element={<h1>Class Ranking</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;