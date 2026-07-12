import React from 'react';
import { MapPin, Phone, Mail, Heart, ExternalLink } from 'lucide-react';
import Mosque from './icons/Mosque';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white" style={{ background: 'linear-gradient(135deg, #051024 0%, #0a1628 50%, #051024 100%)' }}>
      {/* Decorative top border */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #1a5c38, #c8a84b, #1a5c38)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1a5c38, #c8a84b)' }}>
                <Mosque className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-lg text-white">Masjid An-Nadzom</p>
                <p className="text-xs text-gray-400">Sistem Manajemen Digital</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Masjid An-Nadzom hadir sebagai pusat spiritual dan sosial masyarakat, menghadirkan layanan digital untuk kemudahan jamaah.
            </p>
            <p className="font-arabic text-yellow-300 text-xl text-right">
              إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ
            </p>
            <p className="text-gray-500 text-xs text-right mt-1">
              (QS. At-Taubah: 18)
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: '#c8a84b' }} />
              Kontak & Alamat
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>Jl. Masjid An-Nadzom No. 1, Kelurahan Contoh, Kecamatan Contoh, Kota Contoh, 40000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>(022) 1234-5678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>info@masjid-annadzom.id</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full inline-block" style={{ background: '#c8a84b' }} />
              Tautan Cepat
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Beranda', path: '/' },
                { label: 'Jadwal Jumat', path: '/jadwal-jumat' },
                { label: 'Jadwal Hari Raya', path: '/hari-raya' },
                { label: 'Waktu Sholat', path: '/waktu-sholat' },
                { label: 'Baca Al-Qur\'an', path: '/al-quran' },
                { label: 'Tentang Kami', path: '/about' },
              ].map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-gray-400 text-sm hover:text-yellow-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © {currentYear} Masjid An-Nadzom. Hak Cipta Dilindungi.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-400 fill-current" /> untuk jamaah
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
