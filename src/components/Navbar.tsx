import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, LogIn, ChevronDown, Sun, Moon } from 'lucide-react';
import Mosque from './icons/Mosque';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Jadwal Jumat', path: '/jadwal-jumat' },
    { label: 'Hari Raya', path: '/hari-raya' },
    { label: 'Waktu Sholat', path: '/waktu-sholat' },
    { label: 'Baca Al-Qur\'an', path: '/al-quran' },
    { label: 'Tentang Kami', path: '/about' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        (isScrolled || !isHomePage) ? 'navbar-blur shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center animate-fade-in"
              style={{ background: 'linear-gradient(135deg, #115e3b, #c09633)' }}>
              <Mosque className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-white font-bold text-sm lg:text-base tracking-wide group-hover:text-yellow-300 transition-colors">
                Masjid An-Nadzom
              </p>
              <p className="text-gray-400 text-xs hidden sm:block">Sistem Manajemen Digital</p>
            </div>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-yellow-400 bg-white/10 active'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side - User Profile / Theme Switcher / Login */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-110"
              title={theme === 'light' ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 transition-transform duration-300" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-300 transition-transform duration-300 rotate-45" />
              )}
            </button>

            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #115e3b, #167a4d)' }}>
                    {user.name.charAt(0)}
                  </div>
                  <div className="leading-tight">
                    <p className="text-white text-xs font-medium">{user.name}</p>
                    <p className="text-gray-400 text-[10px] capitalize">{user.role}</p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
                <button
                  id="btn-logout"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 hover:border-red-500/50 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                id="btn-login-nav"
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 shadow-md cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Masuk
              </NavLink>
            )}
          </div>

          {/* Mobile Right Bar */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              {theme === 'light' ? <Moon className="w-5.5 h-5.5" /> : <Sun className="w-5.5 h-5.5 text-yellow-300" />}
            </button>
            
            {/* Mobile Hamburger */}
            <button
              id="btn-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(7, 14, 25, 0.97)' }}
      >
        <div className="px-4 py-4 space-y-1 border-t border-white/10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-yellow-400 bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-white/10">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg bg-white/5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #115e3b, #167a4d)' }}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-gray-400 text-xs capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-500 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Masuk
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
