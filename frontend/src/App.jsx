import React from 'react';
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

const App = () => {
  return (
    <BrowserRouter>
      <div className="mx-4 sm:mx-[10%]">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<UserLogin />} />

          <Route path='/dashboard' element={
            <Dashboard />
          } />
          <Route path='/mycourses' element={
            <MyCourses />
          } />

          {/* Resume Builder Starts*/}
          <Route path='/resumebuilder' element={
            <ResumeBuilder />
          } />
          <Route path='/resumebody' element={
            <ResumeBody />
          } />
          <Route path='/downloadresume' element={
            <DonwloadResume />
          } />
          {/* Resume Builder Ends*/}

          {/* Mock Interview Starts*/}
          <Route path='/mockinterview' element={
            <OnlineTest />
          } />
          <Route path='/interviewsession' element={
            <InterviewSession />
          } />
          <Route path='/interviewstarts' element={
            <InterviewQuestion />
          } />
          <Route path='/interviewfeedback' element={
            <InterviewFeedback />
          } />
          {/* Mock Interview Ends*/}

          {/* AI Course Starts*/}
          <Route path='/createcourse' element={<CreateCourse />} />
          <Route path='/courselayout' element={<CourseLayout />} />
          <Route path='/finalcourse' element={<FinalCourse />} />
          {/* AI Course Ends*/}

          {/* AI Portfolio Builder Starts*/}
          <Route path='/createportfolio' element={<PortfolioBuilder />} />
          {/* AI Portfolio Builder Ends*/}
        </Routes>
        <Toaster richColors />
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
