from sqlalchemy.orm import Session
from app import models
from app.auth import get_password_hash

# ─────────────────────────────────────────────────────
# Seeder — mengisi data awal ke database
# ─────────────────────────────────────────────────────

def seed_database(db: Session) -> None:
    """Isi database dengan data awal jika masih kosong."""

    # ── Users ────────────────────────────────────────
    if db.query(models.User).count() == 0:
        users = [
            models.User(username="admin",    hashed_password=get_password_hash("admin123"),    name="Administrator",         role=models.UserRole.admin),
            models.User(username="pengurus", hashed_password=get_password_hash("pengurus123"), name="Bpk. Hendra Kusuma",    role=models.UserRole.pengurus),
            models.User(username="jamaah",   hashed_password=get_password_hash("jamaah123"),   name="Jamaah",                role=models.UserRole.jamaah),
        ]
        db.add_all(users)

    # ── Jadwal Jumat ──────────────────────────────────
    if db.query(models.JadwalJumat).count() == 0:
        jadwal_jumat = [
            models.JadwalJumat(tanggal="2026-07-03", imam="Ustadz Ahmad Fauzi, S.Ag",   muadzin="Bpk. Hasan Basri",    khotib="Dr. Muhammad Ridwan, M.Pd",    status=models.StatusJumat.completed),
            models.JadwalJumat(tanggal="2026-07-10", imam="Ustadz Syarifuddin, M.Ag",   muadzin="Bpk. Karim Sulaiman", khotib="KH. Abdullah Syafi'i",         status=models.StatusJumat.completed),
            models.JadwalJumat(tanggal="2026-07-17", imam="Ustadz Ahmad Fauzi, S.Ag",   muadzin="Bpk. Wahyu Santoso",  khotib="Ustadz Dr. Zainuddin, Lc",    status=models.StatusJumat.today),
            models.JadwalJumat(tanggal="2026-07-24", imam="Ustadz Ibrahim Khalil, M.Si",muadzin="Bpk. Hasan Basri",    khotib="Dr. Muhammad Ridwan, M.Pd",    status=models.StatusJumat.upcoming),
            models.JadwalJumat(tanggal="2026-07-31", imam="Ustadz Syarifuddin, M.Ag",   muadzin="Bpk. Karim Sulaiman", khotib="KH. Abdullah Syafi'i",         status=models.StatusJumat.upcoming),
            models.JadwalJumat(tanggal="2026-08-07", imam="Ustadz Ahmad Fauzi, S.Ag",   muadzin="Bpk. Wahyu Santoso",  khotib="Ustadz Dr. Zainuddin, Lc",    status=models.StatusJumat.upcoming),
            models.JadwalJumat(tanggal="2026-08-14", imam="Ustadz Ibrahim Khalil, M.Si",muadzin="Bpk. Hasan Basri",    khotib="Dr. Muhammad Ridwan, M.Pd",    status=models.StatusJumat.upcoming),
            models.JadwalJumat(tanggal="2026-08-21", imam="Ustadz Syarifuddin, M.Ag",   muadzin="Bpk. Karim Sulaiman", khotib="KH. Abdullah Syafi'i",         status=models.StatusJumat.upcoming),
        ]
        db.add_all(jadwal_jumat)

    # ── Jadwal Hari Raya ──────────────────────────────
    if db.query(models.JadwalHariRaya).count() == 0:
        hari_raya = [
            models.JadwalHariRaya(tahun=2025, jenis_hari_raya=models.JenisHariRaya.idul_fitri, tanggal="2025-03-30", imam="KH. Abdullah Syafi'i",     khotib="Dr. Muhammad Ridwan, M.Pd",    lokasi="Masjid An-Nadzom & Halaman Parkir"),
            models.JadwalHariRaya(tahun=2025, jenis_hari_raya=models.JenisHariRaya.idul_adha,  tanggal="2025-06-07", imam="Ustadz Ahmad Fauzi, S.Ag",  khotib="Ustadz Dr. Zainuddin, Lc",    lokasi="Masjid An-Nadzom & Halaman Parkir"),
            models.JadwalHariRaya(tahun=2026, jenis_hari_raya=models.JenisHariRaya.idul_fitri, tanggal="2026-03-20", imam="KH. Abdullah Syafi'i",     khotib="Dr. Muhammad Ridwan, M.Pd",    lokasi="Masjid An-Nadzom & Halaman Parkir"),
            models.JadwalHariRaya(tahun=2026, jenis_hari_raya=models.JenisHariRaya.idul_adha,  tanggal="2026-05-27", imam="Ustadz Syarifuddin, M.Ag",  khotib="KH. Abdullah Syafi'i",         lokasi="Masjid An-Nadzom & Halaman Parkir"),
        ]
        db.add_all(hari_raya)

    # ── Waktu Sholat ──────────────────────────────────
    if db.query(models.WaktuSholat).count() == 0:
        waktu_sholat = [
            models.WaktuSholat(nama="Subuh",   nama_arab="الفجر",   waktu="04:42", is_active=False, icon="🌙"),
            models.WaktuSholat(nama="Dzuhur",  nama_arab="الظهر",   waktu="12:01", is_active=False, icon="☀️"),
            models.WaktuSholat(nama="Ashar",   nama_arab="العصر",   waktu="15:22", is_active=False, icon="🌤️"),
            models.WaktuSholat(nama="Maghrib", nama_arab="المغرب",  waktu="18:04", is_active=True,  icon="🌅"),
            models.WaktuSholat(nama="Isya",    nama_arab="العشاء",  waktu="19:16", is_active=False, icon="🌃"),
        ]
        db.add_all(waktu_sholat)

    # ── Pengurus ──────────────────────────────────────
    if db.query(models.Pengurus).count() == 0:
        pengurus = [
            models.Pengurus(nama="H. Sutrisno Wahyudi, S.H",   jabatan="Ketua Takmir",        periode="2024 - 2028"),
            models.Pengurus(nama="Ir. Bambang Prasetyo, M.T",   jabatan="Wakil Ketua",          periode="2024 - 2028"),
            models.Pengurus(nama="Dra. Siti Rahmawati",         jabatan="Sekretaris",           periode="2024 - 2028"),
            models.Pengurus(nama="Ahmad Fauzan, S.E., M.M",     jabatan="Bendahara",            periode="2024 - 2028"),
            models.Pengurus(nama="Ustadz Ahmad Fauzi, S.Ag",    jabatan="Bidang Keagamaan",     periode="2024 - 2028"),
            models.Pengurus(nama="Bpk. Hendra Kusuma",          jabatan="Bidang Pemeliharaan",  periode="2024 - 2028"),
            models.Pengurus(nama="Ibu Nur Hasanah, S.Pd",       jabatan="Bidang Pendidikan",    periode="2024 - 2028"),
            models.Pengurus(nama="Bpk. Rizal Hakim",            jabatan="Bidang Sosial",        periode="2024 - 2028"),
            models.Pengurus(nama="Bpk. Wahyu Santoso",          jabatan="Bidang Keamanan",      periode="2024 - 2028"),
            models.Pengurus(nama="Ibu Dewi Puspitasari",        jabatan="Bidang Kebersihan",    periode="2024 - 2028"),
            models.Pengurus(nama="Bpk. Karim Sulaiman",         jabatan="Muadzin Tetap",        periode="2024 - 2028"),
            models.Pengurus(nama="Bpk. Hasan Basri",            jabatan="Muadzin Tetap",        periode="2024 - 2028"),
        ]
        db.add_all(pengurus)

    # ── Surah ─────────────────────────────────────────
    if db.query(models.Surah).count() == 0:
        surah_list = [
            models.Surah(nomor=1,   nama="الفاتحة",  nama_latin="Al-Fatihah",    jumlah_ayat=7,   tempat_turun=models.TempatTurun.makkiyah,  arti="Pembukaan"),
            models.Surah(nomor=2,   nama="البقرة",    nama_latin="Al-Baqarah",    jumlah_ayat=286, tempat_turun=models.TempatTurun.madaniyah, arti="Sapi Betina"),
            models.Surah(nomor=3,   nama="آل عمران",  nama_latin="Ali Imran",     jumlah_ayat=200, tempat_turun=models.TempatTurun.madaniyah, arti="Keluarga Imran"),
            models.Surah(nomor=4,   nama="النساء",    nama_latin="An-Nisa",       jumlah_ayat=176, tempat_turun=models.TempatTurun.madaniyah, arti="Wanita"),
            models.Surah(nomor=5,   nama="المائدة",   nama_latin="Al-Maidah",     jumlah_ayat=120, tempat_turun=models.TempatTurun.madaniyah, arti="Hidangan"),
            models.Surah(nomor=6,   nama="الأنعام",   nama_latin="Al-Anam",       jumlah_ayat=165, tempat_turun=models.TempatTurun.makkiyah,  arti="Binatang Ternak"),
            models.Surah(nomor=7,   nama="الأعراف",   nama_latin="Al-A'raf",      jumlah_ayat=206, tempat_turun=models.TempatTurun.makkiyah,  arti="Tempat Tertinggi"),
            models.Surah(nomor=36,  nama="يس",        nama_latin="Yasin",         jumlah_ayat=83,  tempat_turun=models.TempatTurun.makkiyah,  arti="Yasin"),
            models.Surah(nomor=55,  nama="الرحمن",    nama_latin="Ar-Rahman",     jumlah_ayat=78,  tempat_turun=models.TempatTurun.madaniyah, arti="Yang Maha Pemurah"),
            models.Surah(nomor=56,  nama="الواقعة",   nama_latin="Al-Waqi'ah",    jumlah_ayat=96,  tempat_turun=models.TempatTurun.makkiyah,  arti="Hari Kiamat"),
            models.Surah(nomor=67,  nama="الملك",     nama_latin="Al-Mulk",       jumlah_ayat=30,  tempat_turun=models.TempatTurun.makkiyah,  arti="Kerajaan"),
            models.Surah(nomor=112, nama="الإخلاص",   nama_latin="Al-Ikhlas",     jumlah_ayat=4,   tempat_turun=models.TempatTurun.makkiyah,  arti="Ikhlas"),
            models.Surah(nomor=113, nama="الفلق",     nama_latin="Al-Falaq",      jumlah_ayat=5,   tempat_turun=models.TempatTurun.makkiyah,  arti="Waktu Subuh"),
            models.Surah(nomor=114, nama="الناس",     nama_latin="An-Nas",        jumlah_ayat=6,   tempat_turun=models.TempatTurun.makkiyah,  arti="Manusia"),
        ]
        db.add_all(surah_list)

    # ── Ayat Al-Fatihah ───────────────────────────────
    if db.query(models.Ayat).filter(models.Ayat.surah_nomor == 1).count() == 0:
        ayat_fatihah = [
            models.Ayat(surah_nomor=1, nomor=1, arab="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",                                                                                              terjemahan="Dengan nama Allah Yang Maha Pengasih, Maha Penyayang."),
            models.Ayat(surah_nomor=1, nomor=2, arab="الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",                                                                                                terjemahan="Segala puji bagi Allah, Tuhan seluruh alam,"),
            models.Ayat(surah_nomor=1, nomor=3, arab="الرَّحْمَٰنِ الرَّحِيمِ",                                                                                                               terjemahan="Yang Maha Pengasih, Maha Penyayang,"),
            models.Ayat(surah_nomor=1, nomor=4, arab="مَالِكِ يَوْمِ الدِّينِ",                                                                                                               terjemahan="Pemilik hari pembalasan."),
            models.Ayat(surah_nomor=1, nomor=5, arab="إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",                                                                                             terjemahan="Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan."),
            models.Ayat(surah_nomor=1, nomor=6, arab="اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",                                                                                                   terjemahan="Tunjukilah kami jalan yang lurus,"),
            models.Ayat(surah_nomor=1, nomor=7, arab="صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",                                          terjemahan="(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat."),
        ]
        db.add_all(ayat_fatihah)

    # ── Ayat Yasin ────────────────────────────────────
    if db.query(models.Ayat).filter(models.Ayat.surah_nomor == 36).count() == 0:
        ayat_yasin = [
            models.Ayat(surah_nomor=36, nomor=1, arab="يس",                                           terjemahan="Yāsīn."),
            models.Ayat(surah_nomor=36, nomor=2, arab="وَالْقُرْآنِ الْحَكِيمِ",                       terjemahan="Demi Al-Qur'an yang penuh hikmah,"),
            models.Ayat(surah_nomor=36, nomor=3, arab="إِنَّكَ لَمِنَ الْمُرْسَلِينَ",                  terjemahan="sungguh, engkau (Muhammad) adalah salah seorang dari rasul-rasul,"),
            models.Ayat(surah_nomor=36, nomor=4, arab="عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",                   terjemahan="(yang berada) di atas jalan yang lurus,"),
            models.Ayat(surah_nomor=36, nomor=5, arab="تَنزِيلَ الْعَزِيزِ الرَّحِيمِ",                 terjemahan="(sebagai wahyu) yang diturunkan oleh Yang Mahaperkasa, Maha Penyayang,"),
        ]
        db.add_all(ayat_yasin)

    db.commit()
    print("[OK] Database berhasil di-seed!")
