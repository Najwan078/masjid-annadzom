import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Lock, User } from 'lucide-react';
import Mosque from '../components/icons/Mosque';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(username, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message ?? 'Username atau password salah. Silakan coba lagi.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a3a2a 50%, #0a1628 100%)' }}
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #1a5c38, transparent)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c8a84b, transparent)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #1a5c38, transparent)' }}
        />
      </div>

      {/* Geometric pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(200, 168, 75, 0.3) 20px,
            rgba(200, 168, 75, 0.3) 21px
          )`,
        }}
      />

      <div className="relative w-full max-w-md px-4">
        <div className="glass-card p-8 animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 pulse-glow"
              style={{ background: 'linear-gradient(135deg, #1a5c38, #c8a84b)' }}
            >
              <Mosque className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Selamat Datang</h1>
            <p className="text-yellow-400 font-arabic text-lg">مَرْحَبًا بِكُمْ</p>
            <p className="text-gray-400 text-sm mt-2">
              Sistem Manajemen Masjid An-Nadzom
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/15 border border-red-500/30 mb-6 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="input-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm outline-none transition-all focus:ring-2 focus:ring-green-500/50"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.borderColor = 'rgba(200, 168, 75, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.07)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-white placeholder-gray-500 text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.1)';
                    e.target.style.borderColor = 'rgba(200, 168, 75, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.07)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="btn-login"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              style={{ background: 'linear-gradient(135deg, #1a5c38, #22764a)' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Memverifikasi...
                </span>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-xl border border-yellow-500/20" style={{ background: 'rgba(200, 168, 75, 0.08)' }}>
            <p className="text-yellow-400 text-xs font-semibold mb-2">Demo Akun:</p>
            <div className="space-y-1">
              {[
                { label: 'Admin', u: 'admin', p: 'admin123' },
                { label: 'Pengurus', u: 'pengurus', p: 'pengurus123' },
                { label: 'Jamaah', u: 'jamaah', p: 'jamaah123' },
              ].map((cred) => (
                <button
                  key={cred.u}
                  type="button"
                  onClick={() => { setUsername(cred.u); setPassword(cred.p); }}
                  className="w-full text-left text-gray-400 text-xs hover:text-gray-200 transition-colors px-2 py-0.5 rounded"
                >
                  <span className="text-yellow-400">{cred.label}:</span> {cred.u} / {cred.p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} Masjid An-Nadzom · Sistem Manajemen Digital
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
