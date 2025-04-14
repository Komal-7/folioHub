import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from './utils/AuthProvider';
import {PrivateRoutes, PublicRoutes} from './utils/PrivateRoutes';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signUp';
import './App.css'
import EditorPage from './pages/editorPage';
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        <Routes>
          <Route element={<PrivateRoutes />}>
            {" "}
            <Route path="/" element={<Home />} />
            <Route path="/editor/:templateId" element={<EditorPage />} />
          </Route>
          <Route element={<PublicRoutes />}>
            {" "}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};


export default App;
