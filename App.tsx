
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Residents from './pages/Residents';
import Finance from './pages/Finance';
import Landing from './pages/Landing';
import Maintenance from './pages/Maintenance';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/landing" element={<Landing />} />

        {/* Admin Dashboard Wrapper */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="residents" element={<Residents />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="finance" element={<Finance />} />
          <Route path="reports" element={<Finance />} /> {/* Reusing for demo */}
          
          {/* Catch-all redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
