from sqlalchemy import Column, Integer, String, Boolean, Enum as SAEnum
from app.database import Base
import enum

# ─────────────────────────────────────────────────────
# Enum Types
# ─────────────────────────────────────────────────────

class StatusJumat(str, enum.Enum):
    upcoming = "upcoming"
    completed = "completed"
    today = "today"

class JenisHariRaya(str, enum.Enum):
    idul_fitri = "Idul Fitri"
    idul_adha = "Idul Adha"

class TempatTurun(str, enum.Enum):
    makkiyah = "Makkiyah"
    madaniyah = "Madaniyah"

class UserRole(str, enum.Enum):
    admin = "admin"
    pengurus = "pengurus"
    jamaah = "jamaah"


# ─────────────────────────────────────────────────────
# Model: User (autentikasi)
# ─────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    role = Column(SAEnum(UserRole), default=UserRole.jamaah, nullable=False)
    is_active = Column(Boolean, default=True)


# ─────────────────────────────────────────────────────
# Model: JadwalJumat
# ─────────────────────────────────────────────────────

class JadwalJumat(Base):
    __tablename__ = "jadwal_jumat"

    id = Column(Integer, primary_key=True, index=True)
    tanggal = Column(String(10), nullable=False)          # format: YYYY-MM-DD
    imam = Column(String(100), nullable=False)
    muadzin = Column(String(100), nullable=False)
    khotib = Column(String(100), nullable=False)
    status = Column(SAEnum(StatusJumat), default=StatusJumat.upcoming)


# ─────────────────────────────────────────────────────
# Model: JadwalHariRaya
# ─────────────────────────────────────────────────────

class JadwalHariRaya(Base):
    __tablename__ = "jadwal_hari_raya"

    id = Column(Integer, primary_key=True, index=True)
    tahun = Column(Integer, nullable=False)
    jenis_hari_raya = Column(SAEnum(JenisHariRaya), nullable=False)
    tanggal = Column(String(10), nullable=False)
    imam = Column(String(100), nullable=False)
    khotib = Column(String(100), nullable=False)
    lokasi = Column(String(200), nullable=False)


# ─────────────────────────────────────────────────────
# Model: WaktuSholat
# ─────────────────────────────────────────────────────

class WaktuSholat(Base):
    __tablename__ = "waktu_sholat"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String(20), nullable=False)
    nama_arab = Column(String(50), nullable=False)
    waktu = Column(String(5), nullable=False)             # format: HH:MM
    is_active = Column(Boolean, default=False)
    icon = Column(String(10), nullable=False)


# ─────────────────────────────────────────────────────
# Model: Pengurus
# ─────────────────────────────────────────────────────

class Pengurus(Base):
    __tablename__ = "pengurus"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String(100), nullable=False)
    jabatan = Column(String(100), nullable=False)
    periode = Column(String(20), nullable=False)
    foto = Column(String(255), nullable=True)


# ─────────────────────────────────────────────────────
# Model: Surah
# ─────────────────────────────────────────────────────

class Surah(Base):
    __tablename__ = "surah"

    id = Column(Integer, primary_key=True, index=True)
    nomor = Column(Integer, unique=True, nullable=False)
    nama = Column(String(100), nullable=False)
    nama_latin = Column(String(100), nullable=False)
    jumlah_ayat = Column(Integer, nullable=False)
    tempat_turun = Column(SAEnum(TempatTurun), nullable=False)
    arti = Column(String(100), nullable=False)


# ─────────────────────────────────────────────────────
# Model: Ayat
# ─────────────────────────────────────────────────────

class Ayat(Base):
    __tablename__ = "ayat"

    id = Column(Integer, primary_key=True, index=True)
    surah_nomor = Column(Integer, nullable=False, index=True)
    nomor = Column(Integer, nullable=False)
    arab = Column(String(1000), nullable=False)
    terjemahan = Column(String(2000), nullable=False)
