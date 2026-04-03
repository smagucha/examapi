import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Parent from "./pages/Parent";
import TakeAttendance from "./pages/TakeAttendance";
import TakeAttendanceForStream from "./pages/TakeAttendanceForStream";
import ViewAttendance from "./pages/ViewAttendance";
import ViewAttendancePerClassStream from './pages/ViewAttendancePerClassStream';
import EventList from "./pages/EventList";
import AddEvent from "./pages/AddEvent";
import EventUpdateForm from "./pages/EventUpdateForm";
import EnterResultSelector from "./pages/EnterResultSelector";
import AddGrade from "./pages/AddGrade";
import GradeList from "./pages/GradeList";
import SubjectsList from "./pages/ListSubject";
import AddSubject from "./pages/AddSubject";
import UpdateSubject from "./pages/UpdateSubject";
import ListStream from "./pages/ListStream";
import AddStream from "./pages/AddStream";
import UpdateStream from "./pages/UpdateStream";
import UpdateGrade from "./pages/UpdateGrade";
import Settings from "./pages/Settings";
import ListTerm from "./pages/ListTerm";
import AddTerm from "./pages/AddTerm";
import UpdateTerm from "./pages/UpdateTerm";
import ListClass from "./pages/ListClasses"
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addterm" element={<AddTerm/>} />
        <Route path="/liststream" element ={<ListStream/>} />
        <Route path="/listclass" element={<ListClass />} />
        <Route path="/students" element={<h1>Students Page</h1>} />
        <Route path="/parents" element={<Parent/>} />
        <Route path="/teachers" element={<h1>Teachers Page</h1>} />
        <Route path="/events"  element={<EventList/>} />
        <Route path="/addstream" element={<AddStream />} />
        <Route path="/addevent" element ={<AddEvent/>}/>
        <Route path="/addgrade" element ={<AddGrade/>}/>
        <Route path="/listterm" element ={<ListTerm/>}/>
        <Route path='/updateterm/:pk' element={<UpdateTerm/>} />
        <Route path="/streamupdate/:pk" element={<UpdateStream/>}/>
        <Route path="/updategrade/:pk" element={<UpdateGrade/>}/>
        <Route path="/gradelist" element ={<GradeList/>}/>
        <Route path="/addsubject" element ={<AddSubject/>}/>
        <Route path="/subjectslist" element ={<SubjectsList/>}/>
        <Route path="/subject/edit/:pk" element={<UpdateSubject />} />
        <Route path="/events/edit/:pk" element={<EventUpdateForm />} />
        <Route path="/take-attendance" element={<TakeAttendance/>} />
        <Route path="/take_attendance/:name" element={<TakeAttendanceForStream />} />
        <Route path="/take_attendance_for_stream/:name/:stream" element={<TakeAttendanceForStream />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/viewattendanceperclass/:name" element={<ViewAttendancePerClassStream />}/>
        <Route path="/viewattendanceperclass/:name/:stream" element={<ViewAttendancePerClassStream/>}/>
        <Route path="/enter-result" element={<EnterResultSelector/>} />
        <Route path="/update-results" element={<h1>Update Results</h1>} />
        <Route path="/subject-ranking" element={<h1>Subject Ranking</h1>} />
        <Route path="/results-per-class" element={<h1>Results Per Class</h1>} />
        <Route path="/class-ranking" element={<h1>Class Ranking</h1>} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

