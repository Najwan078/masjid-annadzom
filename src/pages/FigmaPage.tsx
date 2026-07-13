import React, { useState } from 'react';
import { Layout, ExternalLink, Info, Code, ShieldCheck } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const FigmaPage: React.FC = () => {
  // Default demo Figma embed link (proyek website UI/UX wireframe)
  // Pengguna bisa mengganti link ini dengan link Figma miliknya sendiri di kemudian hari
  const [figmaUrl, setFigmaUrl] = useState(
    'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Ffzaqqcedznufibbcyhyr%2FMasjid-An-Nadzom-Digital-UI-UX%3Fnode-id%3D0-1%26t%3D4xPlWqUeE7eK7n9t-1'
  );
  const [inputUrl, setInputUrl] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  const handleUpdateUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    let targetUrl = inputUrl.trim();
    // Jika user menginputkan link figma biasa, konversi ke format embed
    if (targetUrl.includes('figma.com') && !targetUrl.includes('embed?')) {
      targetUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(targetUrl)}`;
    }

    setFigmaUrl(targetUrl);
    setInputUrl('');
    setShowConfig(false);
  };

  return (
    <main className="min-h-screen section-pattern pt-24 pb-16">
      {/* Page Header */}
      <div className="gradient-green py-16 px-4 mb-10 text-white text-center">
        <ScrollReveal className="max-w-4xl mx-auto">
          <p className="font-arabic text-yellow-300 text-2xl mb-3">رَسْمُ التَّخْطِيط</p>
          <h1 className="text-3xl md:text-5xl font-black mb-3">Prototype Desain Figma</h1>
          <p className="text-green-200 text-sm md:text-base max-w-xl mx-auto">
            Rancangan desain antarmuka (UI/UX) Sistem Manajemen Masjid An-Nadzom
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Info & Config Bar */}
        <ScrollReveal>
          <div className="premium-card p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(192, 150, 51, 0.08)' }}>
                <Layout className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="font-bold text-sm" style={{ color: 'var(--color-text-main)' }}>Interactive Prototype</h2>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  Gunakan mouse untuk zoom-in, zoom-out, atau klik tombol navigasi figma untuk interaksi prototype.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs cursor-pointer transition-all hover:bg-green-700/5"
                style={{ borderColor: 'var(--color-border-card)', color: 'var(--color-primary-light)' }}
              >
                <Code className="w-4 h-4" />
                Ganti Link Figma
              </button>
              <a
                href="https://www.figma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 transition-all shadow-md"
              >
                Buka Figma <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Change Link Form Overlay */}
        {showConfig && (
          <ScrollReveal>
            <div className="premium-card p-6 border-2 border-yellow-500 animate-fade-in">
              <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--color-text-main)' }}>Masukkan Link Figma Proyek Anda</h3>
              <form onSubmit={handleUpdateUrl} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>URL File Figma</label>
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://www.figma.com/design/..."
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-green-600"
                    style={{ backgroundColor: 'var(--bg-app)', color: 'var(--color-text-main)', borderColor: 'var(--color-border-card)' }}
                    required
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowConfig(false)}
                    className="px-4 py-2 rounded-lg border text-xs font-bold cursor-pointer"
                    style={{ borderColor: 'var(--color-border-card)', color: 'var(--color-text-muted)' }}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white text-xs font-bold cursor-pointer"
                  >
                    Update Frame
                  </button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        )}

        {/* Figma Embed Iframe (Premium Styled Container) */}
        <ScrollReveal delay={100}>
          <div className="premium-card overflow-hidden shadow-2xl rounded-3xl border border-gray-200/50 dark:border-gray-800/50">
            {/* Header window mockup */}
            <div className="px-5 py-3 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--bg-summary-header)', borderColor: 'var(--color-border-card)' }}>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-[10px] font-bold tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                FIGMA_PROTOTYPE_FRAME.HTML
              </span>
              <ShieldCheck className="w-4 h-4 text-green-700" />
            </div>

            {/* Iframe */}
            <div className="relative w-full" style={{ height: 'calc(100vh - 240px)', minHeight: '500px' }}>
              <iframe
                title="Prototype Desain Figma"
                src={figmaUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Petunjuk Penggunaan */}
        <ScrollReveal delay={200}>
          <div className="premium-card p-5 rounded-2xl flex items-start gap-3">
            <Info className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
            <div className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              <p className="font-bold mb-1" style={{ color: 'var(--color-text-main)' }}>Cara memasang desain Figma Anda sendiri:</p>
              <ol className="list-decimal pl-4 space-y-1.5 font-medium">
                <li>Buka file proyek Anda di Figma browser atau aplikasi desktop.</li>
                <li>Klik tombol **Share** di pojok kanan atas Figma.</li>
                <li>Klik opsi **Get embed code**, lalu salin (copy) link yang ada di dalam tanda kutip `src="..."` (atau cukup salin link share biasa).</li>
                <li>Klik tombol **Ganti Link Figma** di atas halaman ini, masukkan link tersebut, lalu tekan **Update Frame**.</li>
              </ol>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
};

export default FigmaPage;
