import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from './utils/AuthProvider';
import PrivateRoutes from './utils/PrivateRoutes';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signUp';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        <Routes>
          <Route element={<PrivateRoutes />}>
            {" "}
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};


export default App;
