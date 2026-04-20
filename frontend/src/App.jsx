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
import ListClass from "./pages/ListClasses";
import UpdateClass from "./pages/UpdateClass";
import SelectClassSubjectEnrolled from "./pages/SelectClassSubjectEnrolled";
import SubjectsEnrolledByStudent from "./pages/SubjectsEnrolledByStudent";
import SelectClassorStreamToEnrollSubject from "./pages/SelectClassorStreamToEnrollSubject";
import EnrollStudent from "./pages/EnrollStudent";
import SelectClasstreamResultUpdate from "./pages/SelectClasstreamResultUpdate";
import ResultForClassTreamPerSubject from "./pages/ResultForClassTreamPerSubject";
import UpdateResult from "./pages/UpdateResult";
import EnterResult from "./pages/EnterResult";
import TeacherSections from "./pages/TeacherSections";
import ListTeacher from "./pages/ListTeacher";
import ListDesignation from "./pages/ListDesignation";
import AddDesignation from "./pages/AddDesignation";
import UpdateDesignation from "./pages/UpdateDesignation";
import ClassSubjectRanking from "./pages/ClassSubjectRanking";
import SubjectPerRank from "./pages/SubjectPerRank"; 
import ResultStreamorTerm from "./pages/ResultStreamorTerm";
import ClassStreamResult from "./pages/ClassStreamResult";
import AddTeacher from "./pages/AddTeacher";
import UpdateTeacher from "./pages/UpdateTeacher";
import ListTeacherSubjects from "./pages/ListTeacherSubjects";
import AddTeacherSubject from "./pages/AddTeacherSubject";
import EditTeacherSubject from "./pages/EditTeacherSubject";
import EditTeacher from "./pages/EditTeacher";
import Klasses from "./pages/Klasses";
import StudentPerClassTream from "./pages/StudentPerClassTream";
import AllUser from "./pages/AllUser"
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<AllUser/>}/>
        <Route path="/addteachersubject/" element={<AddTeacherSubject/>}/>
        <Route path="/teachersubject/" element={<ListTeacherSubjects/>}/>
        <Route path="/teacher/updateteachersubject/:id" element={<EditTeacherSubject/>}/>
        <Route path="/addteacher" element={<AddTeacher/>}/>
        <Route path="/teacher/updateteacher/:id/"element={<EditTeacher/>}/>
        <Route path="/teachers" element={<TeacherSections/>}/>
        <Route path="/teacherlist" element={<ListTeacher/>}/>
        <Route path="/resultperclassterm/:name/:term/" element={<ClassStreamResult/>}/>
        <Route path="/resultstreamterm/:name/:term/:stream/" element={<ClassStreamResult/>}/>>
        <Route path="/results-per-class" element={<ResultStreamorTerm/>}/>
        <Route path="/subject-ranking" element={<ClassSubjectRanking/>}/>
        <Route path="/addesignation" element={<AddDesignation/>}/>
        <Route path="/designations/" element={<ListDesignation/>}/>
        <Route path="/update-results" element={<SelectClasstreamResultUpdate/>}/>
        <Route path="/updateresult/:pk" element ={<UpdateResult/>} />
        <Route path="/addterm" element={<AddTerm/>} />
        <Route path="/liststream" element ={<ListStream/>} />
        <Route path="/listclass" element={<ListClass />} />
        <Route path="/Classes" element={<Klasses/>} />
        <Route path="/Class/:name" element={<StudentPerClassTream/>} />
        <Route path="/Class/:name/:stream" element={<StudentPerClassTream/>} />
        <Route path="/parents" element={<Parent/>} />
        <Route path="/subjectperrankstreamterm/:name/:stream/:term/:subject/" element={<SubjectPerRank/>}/>
        <Route path="/subjectperrankclass/:name/:term/:subject/" element={<SubjectPerRank/>}/>
        <Route path="teacher/designation_detail/:pk"element={<UpdateDesignation/>}/>
        <Route path="/teachers" element={<h1>Teachers Page</h1>} />
        <Route path="/SelectClassorStreamToEnrollSubject" element={<SelectClassorStreamToEnrollSubject/>}/>
        <Route path="/events"  element={<EventList/>} />
        <Route path="/result/studentenrolledsubjectsclass/:name/:subject/" element={<SubjectsEnrolledByStudent />} />
        <Route
          path="/result/studentenrolledsubjects/:name/:stream/:subject/"
          element={<SubjectsEnrolledByStudent />}
        />
        <Route path="/subject_results_class/:name/:stream/:term/:subject" element ={<ResultForClassTreamPerSubject/>}/>
        <Route path="/subject_results_class/:name/:term/:subject" element ={<ResultForClassTreamPerSubject/>}/>
        <Route path="/enterexamforclass/:name/:term/:subject/" element={<EnterResult/>} />
        <Route path="/enterexam/:name/:stream/:term/:subject/" element={<EnterResult/>}/>
        <Route path="/enrollstudentstosubject/:name/:stream" element={<EnrollStudent/>}/>
        <Route path="/enrollstudentstosubjectclass/:name" element={<EnrollStudent/>}/>
        <Route path="/addstream" element={<AddStream />} />
        <Route path="/addevent" element ={<AddEvent/>}/>
        <Route path="/addgrade" element ={<AddGrade/>}/>
        <Route path="/listterm" element ={<ListTerm/>}/>
        <Route path='/updateterm/:pk' element={<UpdateTerm/>} />
        <Route path='/updateclass/:pk' element={<UpdateClass/>} />
         <Route path="/select-class-subject-enrolled" element={<SelectClassSubjectEnrolled />}/>
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

