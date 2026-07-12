from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.config import DATABASE_URL

# ─────────────────────────────────────────────────────
# SQLAlchemy Engine & Session
# ─────────────────────────────────────────────────────

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},  # diperlukan untuk SQLite
    )
else:
    # Untuk PostgreSQL (Supabase) menggunakan pg8000 murni Python driver demi stabilitas Vercel
    pg_url = DATABASE_URL
    if pg_url.startswith("postgres://"):
        pg_url = pg_url.replace("postgres://", "postgresql+pg8000://", 1)
    elif pg_url.startswith("postgresql://"):
        pg_url = pg_url.replace("postgresql://", "postgresql+pg8000://", 1)
    engine = create_engine(pg_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """Base class untuk semua model SQLAlchemy."""
    pass


def get_db():
    """Dependency injector untuk mendapatkan database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
