import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPane, Events } from './MyComponents';
import { AuthProvider, AuthContext } from './AuthContext';
import './App.css';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPane />} />
          <Route 
            path="/events" 
            element={<PrivateRoute><Events /></PrivateRoute>} 
          />
          <Route 
            path="/" 
            element={<Navigate to="/events" />} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;