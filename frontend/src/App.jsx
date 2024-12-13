import React, { Suspense, useState } from 'react';
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
import ViewCourseLayout from './AICourse/ViewCourseLayout';
import StartCourse from './AICourse/StartCourse';
import CoursesPage from './pages/CoursesPage';
import Lottie from "lottie-react";
import loader from "./assets/loader.json";
import GoogleTranslate from './services/GoogleTranslator';

const App = () => {

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-[80vh] items-center justify-center">
            <Lottie
              className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-[340px]"
              animationData={loader}
              loop={true}
            />
          </div>
        }
      >
        <div className="mx-4 sm:mx-[10%]">
          <Navbar />
          <GoogleTranslate />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<CoursesPage />} />
            <Route path='/viewcourse/:id' element={<ViewCourseLayout />} />

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
