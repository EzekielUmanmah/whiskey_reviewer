import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Components/LandingPage/Login';
import SignUp from './Components/LandingPage/SignUp';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
