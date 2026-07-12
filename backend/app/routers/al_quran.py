from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import models
from app.schemas import SurahResponse, AyatResponse
from app.auth import get_current_user
from app.database import get_db

router = APIRouter(prefix="/api/al-quran", tags=["Al-Qur'an"])


@router.get("/surah", response_model=List[SurahResponse], summary="Daftar surah Al-Qur'an")
async def get_surah_list(
    db: Session = Depends(get_db),
):
    return db.query(models.Surah).order_by(models.Surah.nomor).all()


@router.get("/surah/{nomor}", response_model=SurahResponse, summary="Detail surah")
async def get_surah(
    nomor: int,
    db: Session = Depends(get_db),
):
    surah = db.query(models.Surah).filter(models.Surah.nomor == nomor).first()
    if not surah:
        raise HTTPException(status_code=404, detail=f"Surah nomor {nomor} tidak ditemukan")
    return surah


@router.get("/surah/{nomor}/ayat", response_model=List[AyatResponse], summary="Daftar ayat dalam surah")
async def get_ayat_by_surah(
    nomor: int,
    db: Session = Depends(get_db),
):
    # Cek apakah surah ada
    surah = db.query(models.Surah).filter(models.Surah.nomor == nomor).first()
    if not surah:
        raise HTTPException(status_code=404, detail=f"Surah nomor {nomor} tidak ditemukan")

    ayat = db.query(models.Ayat).filter(
        models.Ayat.surah_nomor == nomor
    ).order_by(models.Ayat.nomor).all()

    return ayat
