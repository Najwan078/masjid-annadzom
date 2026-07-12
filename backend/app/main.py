from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import APP_TITLE, APP_DESCRIPTION, APP_VERSION
from app.database import engine, SessionLocal
from app import models
from app.seed import seed_database

# Routers
from app.routers import auth, jadwal_jumat, hari_raya, waktu_sholat, pengurus, al_quran

# ─────────────────────────────────────────────────────
# Buat tabel di database (jika belum ada)
# ─────────────────────────────────────────────────────
models.Base.metadata.create_all(bind=engine)

# ─────────────────────────────────────────────────────
# Inisialisasi FastAPI
# ─────────────────────────────────────────────────────
app = FastAPI(
    title=APP_TITLE,
    description=APP_DESCRIPTION,
    version=APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─────────────────────────────────────────────────────
# CORS Middleware
# ─────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:4173",   # Vite preview
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────────────
# Include Routers
# ─────────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(jadwal_jumat.router)
app.include_router(hari_raya.router)
app.include_router(waktu_sholat.router)
app.include_router(pengurus.router)
app.include_router(al_quran.router)


# ─────────────────────────────────────────────────────
# Seed database (dijalankan langsung di global scope demi serverless Vercel)
# ─────────────────────────────────────────────────────
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()


# ─────────────────────────────────────────────────────
# Health Check
# ─────────────────────────────────────────────────────
@app.get("/api/health", tags=["Health"])
async def health_check():
    return {
        "status": "ok",
        "app": APP_TITLE,
        "version": APP_VERSION,
    }


@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Selamat datang di API Masjid An-Nadzom!",
        "docs": "/docs",
        "version": APP_VERSION,
    }
