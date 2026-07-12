import os

# ─────────────────────────────────────────────────────
# Konfigurasi aplikasi FastAPI Masjid An-Nadzom
# ─────────────────────────────────────────────────────

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./masjid.db")

# JWT
SECRET_KEY = os.getenv("SECRET_KEY", "masjid-annadzom-secret-key-2024-super-secure")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8  # 8 jam

# App info
APP_TITLE = "Masjid An-Nadzom API"
APP_DESCRIPTION = "REST API untuk Sistem Manajemen Digital Masjid An-Nadzom"
APP_VERSION = "1.0.0"
