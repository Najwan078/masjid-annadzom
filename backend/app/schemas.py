from pydantic import BaseModel
from typing import Optional
from app.models import StatusJumat, JenisHariRaya, TempatTurun, UserRole


# ─────────────────────────────────────────────────────
# Auth Schemas
# ─────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_name: str
    user_role: str

class UserInfo(BaseModel):
    id: int
    username: str
    name: str
    role: UserRole

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────
# JadwalJumat Schemas
# ─────────────────────────────────────────────────────

class JadwalJumatBase(BaseModel):
    tanggal: str
    imam: str
    muadzin: str
    khotib: str
    status: StatusJumat = StatusJumat.upcoming

class JadwalJumatCreate(JadwalJumatBase):
    pass

class JadwalJumatUpdate(BaseModel):
    tanggal: Optional[str] = None
    imam: Optional[str] = None
    muadzin: Optional[str] = None
    khotib: Optional[str] = None
    status: Optional[StatusJumat] = None

class JadwalJumatResponse(JadwalJumatBase):
    id: int

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────
# JadwalHariRaya Schemas
# ─────────────────────────────────────────────────────

class JadwalHariRayaBase(BaseModel):
    tahun: int
    jenis_hari_raya: JenisHariRaya
    tanggal: str
    imam: str
    khotib: str
    lokasi: str

class JadwalHariRayaCreate(JadwalHariRayaBase):
    pass

class JadwalHariRayaUpdate(BaseModel):
    tahun: Optional[int] = None
    jenis_hari_raya: Optional[JenisHariRaya] = None
    tanggal: Optional[str] = None
    imam: Optional[str] = None
    khotib: Optional[str] = None
    lokasi: Optional[str] = None

class JadwalHariRayaResponse(JadwalHariRayaBase):
    id: int

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────
# WaktuSholat Schemas
# ─────────────────────────────────────────────────────

class WaktuSholatBase(BaseModel):
    nama: str
    nama_arab: str
    waktu: str
    is_active: bool
    icon: str

class WaktuSholatUpdate(BaseModel):
    waktu: Optional[str] = None
    is_active: Optional[bool] = None

class WaktuSholatResponse(WaktuSholatBase):
    id: int

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────
# Pengurus Schemas
# ─────────────────────────────────────────────────────

class PengurusBase(BaseModel):
    nama: str
    jabatan: str
    periode: str
    foto: Optional[str] = None

class PengurusCreate(PengurusBase):
    pass

class PengurusUpdate(BaseModel):
    nama: Optional[str] = None
    jabatan: Optional[str] = None
    periode: Optional[str] = None
    foto: Optional[str] = None

class PengurusResponse(PengurusBase):
    id: int

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────
# Al-Quran Schemas
# ─────────────────────────────────────────────────────

class SurahResponse(BaseModel):
    id: int
    nomor: int
    nama: str
    nama_latin: str
    jumlah_ayat: int
    tempat_turun: TempatTurun
    arti: str

    class Config:
        from_attributes = True

class AyatResponse(BaseModel):
    id: int
    surah_nomor: int
    nomor: int
    arab: str
    terjemahan: str

    class Config:
        from_attributes = True
