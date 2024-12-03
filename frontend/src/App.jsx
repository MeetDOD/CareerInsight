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

const App = () => {
  return (
    <BrowserRouter>
      <div className="mx-4 sm:mx-[10%]">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />

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
