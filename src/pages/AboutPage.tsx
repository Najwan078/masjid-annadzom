import React from 'react';
import { usePengurus } from '../hooks/useApi';
import { PengurusAPI } from '../services/api';
import { MapPin, Phone, Mail, Clock, History, Users, Building, Loader2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const PengurusCard: React.FC<{ pengurus: PengurusAPI; index: number }> = ({ pengurus, index }) => {
  const colors = ['#115e3b', '#c09633', '#2b6cb0', '#6b46c1', '#d53f8c', '#dd6b20'];
  const color = colors[index % colors.length];
  const initials = pengurus.nama
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');

  return (
    <div
      className="premium-card p-5 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight" style={{ color: 'var(--color-text-main)' }}>{pengurus.nama}</p>
          <p className="text-[10px] font-bold mt-1.5 px-2.5 py-0.5 rounded-full inline-block uppercase tracking-wider"
            style={{ background: `${color}15`, color: color }}>
            {pengurus.jabatan}
          </p>
          <p className="text-xs mt-2 flex items-center gap-1.5 font-medium" style={{ color: 'var(--color-text-muted)' }}>
            <Clock className="w-3.5 h-3.5" /> {pengurus.periode}
          </p>
        </div>
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => {
  const { data: pengurusList, isLoading: pengurusLoading } = usePengurus();

  return (
    <main className="min-h-screen section-pattern pt-24 pb-16">
      {/* Header Banner */}
      <div className="gradient-green py-16 px-4 mb-12 text-white text-center">
        <ScrollReveal className="max-w-4xl mx-auto">
          <p className="font-arabic text-yellow-300 text-2xl mb-3">مَسْجِدُ النَّاظِم</p>
          <h1 className="text-3xl md:text-5xl font-black mb-3">Tentang Kami</h1>
          <p className="text-green-200 text-sm md:text-base max-w-xl mx-auto">
            Mengenal lebih dekat Masjid An-Nadzom, sejarah, dan susunan pengurus yang mengabdi
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Sejarah Masjid */}
        <ScrollReveal>
          <section className="premium-card overflow-hidden">
            <div className="gradient-green p-6 flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <History className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Sejarah Masjid An-Nadzom</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 leading-relaxed text-sm md:text-base" style={{ color: 'var(--color-text-muted)' }}>
                  <p>
                    Masjid An-Nadzom berdiri pada tahun <strong className="text-green-700 dark:text-green-400">1985</strong> atas prakarsa
                    tokoh masyarakat setempat yang dipimpin oleh Almarhum H. Nadzom Harun. Nama "An-Nadzom" yang
                    berarti "keteraturan" atau "tatanan" mencerminkan visi pendirinya untuk menjadikan masjid
                    ini sebagai pusat keteraturan kehidupan beragama dan sosial masyarakat.
                  </p>
                  <p>
                    Bangunan awal masjid ini berukuran sederhana dengan daya tampung sekitar 200 jamaah. Seiring
                    bertambahnya jumlah penduduk dan semangat wakaf dari masyarakat, masjid ini mengalami
                    <strong className="text-green-700 dark:text-green-400"> renovasi besar pertama pada tahun 1997</strong>, yang
                    memperluas kapasitasnya menjadi 800 jamaah.
                  </p>
                  <p>
                    Pada tahun <strong className="text-green-700 dark:text-green-400">2015</strong>, Masjid An-Nadzom kembali direnovasi
                    total dengan arsitektur modern bernuansa Islami, memadukan kubah besar di atas ruang utama
                    dengan menara kembar yang menjulang setinggi 35 meter. Kapasitasnya kini mencapai lebih dari
                    <strong className="text-green-700 dark:text-green-400"> 2.500 jamaah</strong>.
                  </p>
                  <p>
                    Saat ini, Masjid An-Nadzom tidak hanya menjadi tempat ibadah, tetapi juga pusat kegiatan
                    pendidikan, sosial, dan dakwah yang aktif melayani masyarakat sekitar.
                  </p>
                </div>

                {/* Timeline */}
                <div className="space-y-4 p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-summary-header)', borderColor: 'var(--color-border-card)' }}>
                  {[
                    { year: '1985', event: 'Pendirian masjid oleh H. Nadzom Harun', color: '#115e3b' },
                    { year: '1997', event: 'Renovasi pertama, kapasitas 800 jamaah', color: '#c09633' },
                    { year: '2005', event: 'Pembangunan perpustakaan & madrasah', color: '#2b6cb0' },
                    { year: '2015', event: 'Renovasi total, kapasitas 2.500 jamaah', color: '#6b46c1' },
                    { year: '2024', event: 'Launching Sistem Manajemen Digital', color: '#d53f8c' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: item.color }}>
                          {item.year.slice(2)}
                        </div>
                        {i < 4 && <div className="w-0.5 h-6 mt-1" style={{ background: `${item.color}30` }} />}
                      </div>
                      <div className="pt-1.5">
                        <p className="font-bold text-xs" style={{ color: item.color }}>{item.year}</p>
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-main)' }}>{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Kontak & Lokasi */}
        <ScrollReveal>
          <section className="premium-card overflow-hidden">
            <div className="p-6 flex items-center gap-3 text-white" style={{ background: 'linear-gradient(135deg, #c09633, #d6ad4c)' }}>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Informasi & Lokasi</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Info */}
              <div className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(17, 94, 59, 0.08)' }}>
                    <MapPin className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: 'var(--color-text-main)' }}>Alamat Lengkap</p>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--color-text-muted)' }}>
                      Jl. Masjid An-Nadzom No. 1, RT 01/RW 02<br />
                      Kelurahan Contoh, Kecamatan Contoh<br />
                      Kota Bandung, Jawa Barat 40000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(43, 108, 176, 0.08)' }}>
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: 'var(--color-text-main)' }}>Telepon & WhatsApp</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>(022) 1234-5678</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>+62 812-3456-7890 (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(213, 63, 140, 0.08)' }}>
                    <Mail className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: 'var(--color-text-main)' }}>Email Resmi</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>info@masjid-annadzom.id</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>takmir@masjid-annadzom.id</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(221, 107, 32, 0.08)' }}>
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: 'var(--color-text-main)' }}>Jam Operasional Sekretariat</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Senin – Jumat: 08.00 – 16.00 WIB</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Sabtu: 08.00 – 12.00 WIB</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative min-h-64 lg:min-h-0" style={{ backgroundColor: 'var(--bg-summary-header)' }}>
                <iframe
                  title="Lokasi Masjid An-Nadzom"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.47695649966!2d107.59854!3d-6.91474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e639a3d90f07%3A0x60b3c5b8dea7d87b!2sBandung%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '320px', filter: 'contrast(0.9) brightness(0.9)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Susunan Pengurus */}
        <section>
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: 'rgba(17, 94, 59, 0.08)', borderColor: 'rgba(17, 94, 59, 0.2)' }}>
                <Users className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h2 className="text-2xl font-black" style={{ color: 'var(--color-text-main)' }}>Susunan Pengurus</h2>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Periode Khidmat 2024 – 2028</p>
              </div>
            </div>
          </ScrollReveal>

          {pengurusLoading ? (
            <div className="premium-card text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-green-700 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Memuat susunan pengurus...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(pengurusList ?? []).map((pengurus, idx) => (
                <ScrollReveal key={pengurus.id} delay={idx * 50}>
                  <PengurusCard pengurus={pengurus} index={idx} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>

        {/* Vision Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Visi Masjid',
              icon: '🌟',
              content: 'Menjadikan Masjid An-Nadzom sebagai pusat peradaban Islam yang modern, inklusif, dan berdaya guna bagi masyarakat sekitar, serta menjadi percontohan bagi tata kelola masjid nasional yang profesional dan transparan.',
              headerStyle: { background: 'linear-gradient(135deg, #115e3b, #167a4d)' },
            },
            {
              title: 'Misi Masjid',
              icon: '🎯',
              content: '',
              misiList: [
                'Menyelenggarakan peribadahan jamaah secara tertib, nyaman, dan khusyuk.',
                'Mengembangkan pendidikan dakwah Islamiyah terpadu bagi anak-anak hingga dewasa.',
                'Memberdayakan sektor ekonomi mikro jamaah melalui koperasi dan kegiatan amil zakat.',
                'Mempertahankan kebersihan sanitasi dan keindahan eksterior-interior masjid.',
                'Pemanfaatan instrumen digitalisasi dan database demi transparansi kas takmir masjid.',
              ],
              headerStyle: { background: 'linear-gradient(135deg, #c09633, #d6ad4c)' },
            },
          ].map((item) => (
            <div key={item.title}>
              <ScrollReveal>
                <div className="premium-card overflow-hidden">
                  <div className="p-5 flex items-center gap-3 text-white" style={item.headerStyle}>
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </div>
                  <div className="p-6">
                    {item.content ? (
                      <p className="leading-relaxed text-sm md:text-base font-medium" style={{ color: 'var(--color-text-muted)' }}>{item.content}</p>
                    ) : (
                      <ul className="space-y-3.5">
                        {item.misiList?.map((m, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                            <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 bg-yellow-500" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
