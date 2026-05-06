import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import DashboardUsuari from './pages/DashboardUsuari'
import DashboardAdmin from './pages/DashboardAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
          <Route 
            path="dashboard/usuari" 
            element={
              <ProtectedRoute>
                <DashboardUsuari />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="dashboard/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <DashboardAdmin />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)