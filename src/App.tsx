import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import JadwalJumatPage from './pages/JadwalJumatPage';
import JadwalHariRayaPage from './pages/JadwalHariRayaPage';
import WaktuSholatPage from './pages/WaktuSholatPage';
import AlQuranPage from './pages/AlQuranPage';
import AboutPage from './pages/AboutPage';

// ────────────────────────────────────────────────
// Protected Route Guard
// ────────────────────────────────────────────────
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// ────────────────────────────────────────────────
// Main Layout Wrapper (Navbar + Content + Footer)
// ────────────────────────────────────────────────
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-1">
      {children}
    </div>
    <Footer />
  </div>
);

// ────────────────────────────────────────────────
// App Routes
// ────────────────────────────────────────────────
const AppRoutes: React.FC = () => (
  <Routes>
    {/* Public Route */}
    <Route path="/login" element={<LoginPage />} />

    {/* All Main Pages are Public Now */}
    <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
    <Route path="/jadwal-jumat" element={<AppLayout><JadwalJumatPage /></AppLayout>} />
    <Route path="/hari-raya" element={<AppLayout><JadwalHariRayaPage /></AppLayout>} />
    <Route path="/waktu-sholat" element={<AppLayout><WaktuSholatPage /></AppLayout>} />
    <Route path="/al-quran" element={<AppLayout><AlQuranPage /></AppLayout>} />
    <Route path="/about" element={<AppLayout><AboutPage /></AppLayout>} />

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

import { ThemeProvider } from './context/ThemeContext';

// ────────────────────────────────────────────────
// Root App Component
// ────────────────────────────────────────────────
const App: React.FC = () => (
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
