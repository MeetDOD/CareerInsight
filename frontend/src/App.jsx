import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import Dashboard from "./Dashboard/Dashboard";
import MyCourses from "./Dashboard/MyCourses";
import ResumeBuilder from "./Dashboard/ResumeBuilder";
import CompanyVisits from "./Dashboard/Companydetails";
import ResumeBody from "./AIResume/ResumeBody";
import OnlineTest from "./Dashboard/OnlineTest";
import DonwloadResume from "./AIResume/DonwloadResume";
import { Toaster } from "sonner";
import InterviewSession from "./AIInterview/InterviewSession";
import InterviewFeedback from "./AIInterview/InterviewFeedback";
import InterviewQuestion from "./AIInterview/InterviewQuestion";
import CreateCourse from "./AICourse/CreateCourse";
import CourseLayout from "./AICourse/CourseLayout";
import FinalCourse from "./AICourse/FinalCourse";
import PortfolioBuilder from "./Dashboard/PortfolioBuilder";
import UserLogin from "./auth/UserLogin";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import NonAuthenticatedRoute from "./routes/NonAuthenticatedRoute";
import ViewCourseLayout from "./AICourse/ViewCourseLayout";
import StartCourse from "./AICourse/StartCourse";
import CoursesPage from "./pages/CoursesPage";
import GoogleTranslate from "./services/GoogleTranslator";
import Loader from "./services/Loader";
import AboutUs from "./pages/AboutUs";
import ViewMyResume from "./AIResume/ViewMyResume";
import NotFound from "./pages/NotFound";
import CourseRecommendation from "./Dashboard/CourseRecommendation";
import AddDetailForm from "./home/AddDetailForm";
import IndustryInsights from "./Dashboard/IndustryInsights";
import JobsFinder from "./Dashboard/JobsFinder";
import KanbanBoard from "./Kanban/KanbanBoard";
import WorkSpace from "./Coding/WorkSpace";
import Questions from "./Riverflow/Questions";
import ViewQuestion from "./Riverflow/ViewQuestion";
import PricingPage from "./Pricing/PricingPage";
import PaymentSuccess from "./pages/success";
import PaymentFailure from "./pages/Failure";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <div className="mx-4 sm:mx-[10%]">
          <Navbar />
          <AddDetailForm />
          <GoogleTranslate />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/failed" element={<PaymentFailure />} />

            <Route
              path="/viewcourse/:id/careerinsight/:coursename"
              element={<ViewCourseLayout />}
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/riverflow" element={<Questions />} />
            <Route path="/pricing" element={<PricingPage />} />

            <Route
              path="/login"
              element={
                <NonAuthenticatedRoute>
                  <UserLogin />
                </NonAuthenticatedRoute>
              }
            />

            <Route
              path="/companyvisits"
              element={
                <AuthenticatedRoute>
                  <CompanyVisits />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/insights"
              element={
                <AuthenticatedRoute>
                  <IndustryInsights />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/mycourses"
              element={
                <AuthenticatedRoute>
                  <MyCourses />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/courserecommendation"
              element={
                <AuthenticatedRoute>
                  <CourseRecommendation />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/jobfinder"
              element={
                <AuthenticatedRoute>
                  <JobsFinder />
                </AuthenticatedRoute>
              }
            />

            {/* Resume Builder Starts*/}
            <Route
              path="/resumebuilder"
              element={
                <AuthenticatedRoute>
                  <ResumeBuilder />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/resumebody"
              element={
                <AuthenticatedRoute>
                  <ResumeBody />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/downloadresume"
              element={
                <AuthenticatedRoute>
                  <DonwloadResume />
                </AuthenticatedRoute>
              }
            />
            <Route
              path={`/viewmyresume/:resumeId/careerinsight/:userId/:username`}
              element={<ViewMyResume />}
            />
            {/* Resume Builder Ends*/}

            {/* Mock Interview Starts*/}
            <Route
              path="/mockinterview"
              element={
                <AuthenticatedRoute>
                  <OnlineTest />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/interviewsession"
              element={
                <AuthenticatedRoute>
                  <InterviewSession />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/interviewstarts"
              element={
                <AuthenticatedRoute>
                  <InterviewQuestion />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/interviewfeedback"
              element={
                <AuthenticatedRoute>
                  <InterviewFeedback />
                </AuthenticatedRoute>
              }
            />
            {/* Mock Interview Ends*/}

            {/* AI Course Starts*/}
            <Route
              path="/createcourse"
              element={
                <AuthenticatedRoute>
                  <CreateCourse />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/courselayout"
              element={
                <AuthenticatedRoute>
                  <CourseLayout />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/finalcourse"
              element={
                <AuthenticatedRoute>
                  <FinalCourse />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/startcourse/:id"
              element={
                <AuthenticatedRoute>
                  <StartCourse />
                </AuthenticatedRoute>
              }
            />
            {/* AI Course Ends*/}

            {/* AI Portfolio Builder Starts*/}
            <Route
              path="/createportfolio"
              element={
                <AuthenticatedRoute>
                  <PortfolioBuilder />
                </AuthenticatedRoute>
              }
            />
            {/* AI Portfolio Builder Ends*/}

            {/* Kanban Board Start*/}
            <Route
              path="/kanbanboard"
              element={
                <AuthenticatedRoute>
                  <KanbanBoard />
                </AuthenticatedRoute>
              }
            />
            {/* Kanban Board Ends*/}

            {/* Coding Start*/}
            <Route
              path="/coding"
              element={
                <AuthenticatedRoute>
                  <WorkSpace />
                </AuthenticatedRoute>
              }
            />
            {/* Coding Ends*/}

            {/* Riverflow Start*/}
            <Route
              path="/question/:id"
              element={
                <AuthenticatedRoute>
                  <ViewQuestion />
                </AuthenticatedRoute>
              }
            />
            {/* Riverflow End*/}
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Toaster richColors />
        </div>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
