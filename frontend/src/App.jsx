import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './home/Navbar';
import Footer from './home/Footer';
import Dashboard from './Dashboard/Dashboard';
import MyCourses from './Dashboard/MyCourses';
import ResumeBuilder from './Dashboard/ResumeBuilder';
import ResumeBody from './AIResume/ResumeBody';
import OnlineTest from './Dashboard/OnlineTest';
import DonwloadResume from './AIResume/DonwloadResume';
import { Toaster } from 'sonner';
import InterviewSession from './AIInterview/InterviewSession'
import InterviewFeedback from './AIInterview/InterviewFeedback'
import InterviewQuestion from './AIInterview/InterviewQuestion'
import CreateCourse from './AICourse/CreateCourse';
import CourseLayout from './AICourse/CourseLayout';
import FinalCourse from './AICourse/FinalCourse';
import PortfolioBuilder from './Dashboard/PortfolioBuilder';
import UserLogin from './auth/UserLogin';
import AuthenticatedRoute from './routes/AuthenticatedRoute';
import NonAuthenticatedRoute from './routes/NonAuthenticatedRoute';
import { Vortex } from 'react-loader-spinner';
import CoursesPage from './AICourse/CoursesPage';
import ViewCourseLayout from './AICourse/ViewCourseLayout';
import StartCourse from './AICourse/StartCourse';

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex min-h-[80vh] items-center justify-center">
          <Vortex
            visible={true}
            height="100"
            width="100"
            ariaLabel="vortex-loading"
            wrapperClass="vortex-wrapper"
            colors={['#7c3aed', '#a78bfa', '#7c3aed', '#c4b5fd', '#7c3aed', '#ddd6fe']}
          />
        </div>
      }>
        <div className="mx-4 sm:mx-[10%]">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<CoursesPage />} />

            <Route path='/login' element={
              <NonAuthenticatedRoute>
                <UserLogin />
              </NonAuthenticatedRoute>
            } />

            <Route path='/dashboard' element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            } />
            <Route path='/mycourses' element={
              <AuthenticatedRoute>
                <MyCourses />
              </AuthenticatedRoute>
            } />

            {/* Resume Builder Starts*/}
            <Route path='/resumebuilder' element={
              <AuthenticatedRoute>
                <ResumeBuilder />
              </AuthenticatedRoute>
            } />
            <Route path='/resumebody' element={
              <AuthenticatedRoute>
                <ResumeBody />
              </AuthenticatedRoute>
            } />
            <Route path='/downloadresume' element={
              <AuthenticatedRoute>
                <DonwloadResume />
              </AuthenticatedRoute>
            } />
            {/* Resume Builder Ends*/}

            {/* Mock Interview Starts*/}
            <Route path='/mockinterview' element={
              <AuthenticatedRoute>
                <OnlineTest />
              </AuthenticatedRoute>
            } />
            <Route path='/interviewsession' element={
              <AuthenticatedRoute>
                <InterviewSession />
              </AuthenticatedRoute>
            } />
            <Route path='/interviewstarts' element={
              <AuthenticatedRoute>
                <InterviewQuestion />
              </AuthenticatedRoute>
            } />
            <Route path='/interviewfeedback' element={
              <AuthenticatedRoute>
                <InterviewFeedback />
              </AuthenticatedRoute>
            } />
            {/* Mock Interview Ends*/}

            {/* AI Course Starts*/}
            <Route path='/createcourse' element={
              <AuthenticatedRoute>
                <CreateCourse />
              </AuthenticatedRoute>
            } />
            <Route path='/courselayout' element={
              <AuthenticatedRoute>
                <CourseLayout />
              </AuthenticatedRoute>
            } />
            <Route path='/finalcourse' element={
              <AuthenticatedRoute>
                <FinalCourse />
              </AuthenticatedRoute>
            } />

            <Route path='/viewcourse/:id' element={
              <AuthenticatedRoute>
                <ViewCourseLayout />
              </AuthenticatedRoute>
            } />

            <Route path='/startcourse/:id' element={
              <AuthenticatedRoute>
                <StartCourse />
              </AuthenticatedRoute>
            } />
            {/* AI Course Ends*/}

            {/* AI Portfolio Builder Starts*/}
            <Route path='/createportfolio' element={
              <AuthenticatedRoute>
                <PortfolioBuilder />
              </AuthenticatedRoute>
            } />
            {/* AI Portfolio Builder Ends*/}
          </Routes>
          <Toaster richColors />
        </div>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
