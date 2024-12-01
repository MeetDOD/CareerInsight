import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { loggedInState } from '../store/auth';

const PrivateRoute = ({ children }) => {
  const loggedIn = useRecoilValueLoadable(loggedInState);

  if (loggedIn.state === 'loading') {
    return <div>Loading...</div>;
  }

  if (loggedIn.state === 'hasValue' && !loggedIn.contents) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
