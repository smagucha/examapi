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
import AllUser from "./pages/AllUser";
import AddClass from "./pages/AddClasses"
import PrivateRoute from "./components/PrivateRoute";
import Login from  "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import ChangePassword from "./components/ChangePassword";
import UpdateProfile from "./components/UpdateProfile";
import Register from "./components/Register";
import PasswordReset from "./components/ForgotPassword";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";
import VerifyEmail from "./components/VerifyEmail";
import ResendVerificationEmail from "./components/ResendVerificationEmail";
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<PasswordReset/>}/>
        <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordConfirm />}/>
        <Route path="/resend-verification" element={<ResendVerificationEmail />}/>
        <Route path="/verify-email/:uidb64/:token" element={<VerifyEmail />} />
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword/></PrivateRoute>}/>
        <Route path="/update-profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>}/>
        <Route path="/addclass" element={<PrivateRoute><AddClass/></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><AllUser/></PrivateRoute>}/>
        <Route path="/addteachersubject/" element={<PrivateRoute><AddTeacherSubject/></PrivateRoute>}/>
        <Route path="/teachersubject/" element={<PrivateRoute><ListTeacherSubjects/></PrivateRoute>}/>
        <Route path="/teacher/updateteachersubject/:id" element={<PrivateRoute><EditTeacherSubject/></PrivateRoute>}/>
        <Route path="/addteacher" element={<PrivateRoute><AddTeacher/></PrivateRoute>}/>
        <Route path="/teacher/updateteacher/:id/"element={<PrivateRoute><EditTeacher/></PrivateRoute>}/>
        <Route path="/teachers" element={<PrivateRoute><TeacherSections/></PrivateRoute>}/>
        <Route path="/teacherlist" element={<PrivateRoute><ListTeacher/></PrivateRoute>}/>
        <Route path="/resultperclassterm/:name/:term/" element={<PrivateRoute><ClassStreamResult/></PrivateRoute>}/>
        <Route path="/resultstreamterm/:name/:term/:stream/" element={<PrivateRoute><ClassStreamResult/></PrivateRoute>}/>
        <Route path="/results-per-class" element={<PrivateRoute><ResultStreamorTerm/></PrivateRoute>}/>
        <Route path="/subject-ranking" element={<PrivateRoute><ClassSubjectRanking/></PrivateRoute>}/>
        <Route path="/addesignation" element={<PrivateRoute><AddDesignation/></PrivateRoute>}/>
        <Route path="/designations/" element={<PrivateRoute><ListDesignation/></PrivateRoute>}/>
        <Route path="/update-results" element={<PrivateRoute><SelectClasstreamResultUpdate/></PrivateRoute>}/>
        <Route path="/updateresult/:pk" element ={<PrivateRoute><UpdateResult/></PrivateRoute>} />
        <Route path="/addterm" element={<PrivateRoute><AddTerm/></PrivateRoute>} />
        <Route path="/liststream" element ={<PrivateRoute><ListStream/></PrivateRoute>} />
        <Route path="/listclass" element={<PrivateRoute><ListClass /></PrivateRoute>} />
        <Route path="/Classes" element={<PrivateRoute><Klasses/></PrivateRoute>}/>
        <Route path="/Class/:name" element={<PrivateRoute><StudentPerClassTream/></PrivateRoute>}/>
        <Route path="/Class/:name/:stream" element={<StudentPerClassTream/>} />
        <Route path="/parents" element={<PrivateRoute><Parent/></PrivateRoute>} />
        <Route path="/subjectperrankstreamterm/:name/:stream/:term/:subject/" element={<PrivateRoute><SubjectPerRank/></PrivateRoute>}/>
        <Route path="/subjectperrankclass/:name/:term/:subject/" element={<PrivateRoute><SubjectPerRank/></PrivateRoute>}/>
        <Route path="teacher/designation_detail/:pk"element={<PrivateRoute><UpdateDesignation/></PrivateRoute>}/>
        <Route path="/teachers" element={<h1>Teachers Page</h1>} />
        <Route path="/SelectClassorStreamToEnrollSubject" element={<PrivateRoute><SelectClassorStreamToEnrollSubject/></PrivateRoute>}/>
        <Route path="/events"  element={<PrivateRoute><EventList/></PrivateRoute>} />
        <Route path="/result/studentenrolledsubjectsclass/:name/:subject/" element={<PrivateRoute><SubjectsEnrolledByStudent /></PrivateRoute>} />
        <Route
          path="/result/studentenrolledsubjects/:name/:stream/:subject/"
          element={<PrivateRoute><SubjectsEnrolledByStudent /></PrivateRoute>}
        />
        <Route path="/subject_results_class/:name/:stream/:term/:subject" element ={<PrivateRoute><ResultForClassTreamPerSubject/></PrivateRoute>}/>
        <Route path="/subject_results_class/:name/:term/:subject" element ={<PrivateRoute><ResultForClassTreamPerSubject/></PrivateRoute>}/>
        <Route path="/enterexamforclass/:name/:term/:subject/" element={<PrivateRoute><EnterResult/></PrivateRoute>} />
        <Route path="/enterexam/:name/:stream/:term/:subject/" element={<PrivateRoute><EnterResult/></PrivateRoute>}/>
        <Route path="/enrollstudentstosubject/:name/:stream" element={<PrivateRoute><EnrollStudent/></PrivateRoute>}/>
        <Route path="/enrollstudentstosubjectclass/:name" element={<PrivateRoute><EnrollStudent/></PrivateRoute>}/>
        <Route path="/addstream" element={<PrivateRoute><AddStream /></PrivateRoute>} />
        <Route path="/addevent" element ={<PrivateRoute><AddEvent/></PrivateRoute>}/>
        <Route path="/addgrade" element ={<PrivateRoute><AddGrade/></PrivateRoute>}/>
        <Route path="/listterm" element ={<PrivateRoute><ListTerm/></PrivateRoute>}/>
        <Route path='/updateterm/:pk' element={<PrivateRoute><UpdateTerm/></PrivateRoute>} />
        <Route path='/updateclass/:pk' element={<PrivateRoute><UpdateClass/></PrivateRoute>} />
         <Route path="/select-class-subject-enrolled" element={<PrivateRoute><SelectClassSubjectEnrolled /></PrivateRoute>}/>
        <Route path="/streamupdate/:pk" element={<PrivateRoute><UpdateStream/></PrivateRoute>}/>
        <Route path="/updategrade/:pk" element={<PrivateRoute><UpdateGrade/></PrivateRoute>}/>
        <Route path="/gradelist" element ={<PrivateRoute><GradeList/></PrivateRoute>}/>
        <Route path="/addsubject" element ={<PrivateRoute><AddSubject/></PrivateRoute>}/>
        <Route path="/subjectslist" element ={<PrivateRoute><SubjectsList/></PrivateRoute>}/>
        <Route path="/subject/edit/:pk" element={<PrivateRoute><UpdateSubject /></PrivateRoute>} />
        <Route path="/events/edit/:pk" element={<PrivateRoute><EventUpdateForm /></PrivateRoute>} />
        <Route path="/take-attendance" element={<PrivateRoute><TakeAttendance/></PrivateRoute>} />
        <Route path="/take_attendance/:name" element={<PrivateRoute><TakeAttendanceForStream /></PrivateRoute>}/>
        <Route path="/take_attendance_for_stream/:name/:stream" element={<PrivateRoute><TakeAttendanceForStream/></PrivateRoute>}/>
        <Route path="/view-attendance" element={<PrivateRoute><ViewAttendance /></PrivateRoute>} />
        <Route path="/viewattendanceperclass/:name" element={<PrivateRoute><ViewAttendancePerClassStream /></PrivateRoute>}/>
        <Route path="/viewattendanceperclass/:name/:stream" element={<PrivateRoute><ViewAttendancePerClassStream/></PrivateRoute>}/>
        <Route path="/enter-result" element={<PrivateRoute><EnterResultSelector/></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

