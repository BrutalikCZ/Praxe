import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPane, Events, EventDetails } from './MyComponents'; // Assuming EventDetails is exported from MyComponents
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';

function PrivateRoute({ element }) {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPane />} />
          <Route path="/events" element={<PrivateRoute element={<Events />} />} />
          <Route path="/events/:eventId" element={<PrivateRoute element={<EventDetails />} />} /> {/* Route for event details */}
          <Route path="/" element={<Navigate to="/events" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;