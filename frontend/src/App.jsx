import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './home/Navbar';
import Footer from './home/Footer';
import Dashboard from './Dashboard/Dashboard';
import MyCourses from './Dashboard/MyCourses';
import ResumeBuilder from './Dashboard/ResumeBuilder';
import ResumeBody from './Resume/ResumeBody';
import OnlineTest from './Dashboard/OnlineTest';
import { GoogleOAuthWrapper } from './Auth/GoogleOAuthWrapper';
import DonwloadResume from './Resume/DonwloadResume';
import PrivateRoute from './Auth/PrivateRoute';
import { Toaster } from 'sonner';
import InterviewSession from './AIInterview/InterviewSession'
import InterviewFeedback from './AIInterview/InterviewFeedback'
import InterviewQuestion from './AIInterview/InterviewQuestion'
import CreateCourse from './AICourse/CreateCourse';
import CourseLayout from './AICourse/CourseLayout';
import Register from './Auth/Register';

const App = () => {
  return (
    <BrowserRouter>
      <div className="mx-4 sm:mx-[10%]">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<GoogleOAuthWrapper />} />
          <Route path='/register' element={<Register />} />

          <Route path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path='/mycourses' element={
            <PrivateRoute>
              <MyCourses />
            </PrivateRoute>
          } />

          {/* Resume Builder Starts*/}
          <Route path='/resumebuilder' element={
            <PrivateRoute>
              <ResumeBuilder />
            </PrivateRoute>
          } />
          <Route path='/resumebody' element={
            <PrivateRoute>
              <ResumeBody />
            </PrivateRoute>
          } />
          <Route path='/downloadresume' element={
            <PrivateRoute>
              <DonwloadResume />
            </PrivateRoute>
          } />
          {/* Resume Builder Ends*/}

          {/* Mock Interview Starts*/}
          <Route path='/mockinterview' element={
            <PrivateRoute>
              <OnlineTest />
            </PrivateRoute>
          } />
          <Route path='/interviewsession' element={
            <PrivateRoute>
              <InterviewSession />
            </PrivateRoute>
          } />
          <Route path='/interviewstarts' element={
            <PrivateRoute>
              <InterviewQuestion />
            </PrivateRoute>
          } />
          <Route path='/interviewfeedback' element={
            <PrivateRoute>
              <InterviewFeedback />
            </PrivateRoute>
          } />
          {/* Mock Interview Ends*/}

          {/* AI Course Starts*/}
          <Route path='/createcourse' element={<CreateCourse />} />
          <Route path='/courselayput' element={<CourseLayout />} />
          {/* AI Course Ends*/}
        </Routes>
        <Toaster richColors />
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
