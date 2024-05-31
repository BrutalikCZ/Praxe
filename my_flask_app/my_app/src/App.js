import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPane, Events, EventDetails } from './MyComponents';
import { AuthProvider, useAuth } from './AuthContext'; // Přidání importu pro useAuth
import './App.css';

function PrivateRoute({ element }) {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPane />} />
        <Route path="/events" element={<PrivateRoute element={<Events />} />} />
        <Route path="/events/:eventId" element={<PrivateRoute element={<EventDetails />} />} /> {/* Route for event details */}
        <Route path="/" element={<Navigate to="/events" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;