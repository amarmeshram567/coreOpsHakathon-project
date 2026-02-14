import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Inventory from './pages/Inventory';
import Staff from './pages/Staff';
import Forms from './pages/Forms';
import Inbox from './pages/Inbox';
import Settings from './pages/Settings';
import Integrations from './pages/Integrations';
import NotFound from './pages/NotFound';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected / Dashboard Routes */}
      <Route path="/" element={
        <DashboardLayout />
      }>
        <Route index element={<Dashboard />} /> {/* Default dashboard */}
        <Route path="bookings" element={
          <Bookings />
        } />
        <Route path="inventory" element={
          <Inventory />
        } />
        <Route path="staff" element={
          <Staff />
        } />
        <Route path="forms" element={
          <Forms />
        } />
        <Route path="inbox" element={
          <Inbox />
        } />
        <Route path="settings" element={
          <Settings />
        } />
        <Route path="integrations" element={
          <Integrations />
        } />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;


