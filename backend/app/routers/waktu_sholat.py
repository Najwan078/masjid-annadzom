from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app import models
from app.schemas import WaktuSholatResponse, WaktuSholatUpdate
from app.auth import get_current_user, require_admin
from app.database import get_db

router = APIRouter(prefix="/api/waktu-sholat", tags=["Waktu Sholat"])

# Urutan sholat yang benar
URUTAN_SHOLAT = ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"]


@router.get("", response_model=List[WaktuSholatResponse], summary="Daftar waktu sholat hari ini")
async def get_waktu_sholat(
    db: Session = Depends(get_db),
):
    all_sholat = db.query(models.WaktuSholat).all()
    # Urutkan sesuai urutan sholat
    sorted_sholat = sorted(
        all_sholat,
        key=lambda s: URUTAN_SHOLAT.index(s.nama) if s.nama in URUTAN_SHOLAT else 99
    )
    return sorted_sholat


@router.put("/{sholat_id}", response_model=WaktuSholatResponse, summary="Update waktu sholat (Admin)")
async def update_waktu_sholat(
    sholat_id: int,
    data: WaktuSholatUpdate,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    sholat = db.query(models.WaktuSholat).filter(models.WaktuSholat.id == sholat_id).first()
    if not sholat:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Waktu sholat tidak ditemukan")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(sholat, field, value)

    db.commit()
    db.refresh(sholat)
    return sholat
