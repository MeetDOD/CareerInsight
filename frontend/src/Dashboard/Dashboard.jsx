import Sidebar from '@/Dashboard/Sidebar';
import React from 'react';
import Profile from './Profile';

const Dashboard = () => {
    return (
        <div className="flex flex-col sm:flex-row">
            <Sidebar />
            <div className="flex-grow p-0 sm:pl-0 md:pl-2 lg:pl-4">
                <Profile />
            </div>
        </div>
    );
};

export default Dashboard;
