from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import models
from app.schemas import JadwalJumatCreate, JadwalJumatUpdate, JadwalJumatResponse
from app.auth import get_current_user, require_admin
from app.database import get_db

router = APIRouter(prefix="/api/jadwal-jumat", tags=["Jadwal Jumat"])


@router.get("", response_model=List[JadwalJumatResponse], summary="Daftar semua jadwal Jumat")
async def get_jadwal_jumat(
    db: Session = Depends(get_db),
):
    return db.query(models.JadwalJumat).order_by(models.JadwalJumat.tanggal).all()


@router.get("/{jadwal_id}", response_model=JadwalJumatResponse, summary="Detail jadwal Jumat")
async def get_jadwal_jumat_by_id(
    jadwal_id: int,
    db: Session = Depends(get_db),
):
    jadwal = db.query(models.JadwalJumat).filter(models.JadwalJumat.id == jadwal_id).first()
    if not jadwal:
        raise HTTPException(status_code=404, detail="Jadwal tidak ditemukan")
    return jadwal


@router.post("", response_model=JadwalJumatResponse, status_code=status.HTTP_201_CREATED, summary="Tambah jadwal Jumat (Admin)")
async def create_jadwal_jumat(
    data: JadwalJumatCreate,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    jadwal = models.JadwalJumat(**data.model_dump())
    db.add(jadwal)
    db.commit()
    db.refresh(jadwal)
    return jadwal


@router.put("/{jadwal_id}", response_model=JadwalJumatResponse, summary="Update jadwal Jumat (Admin)")
async def update_jadwal_jumat(
    jadwal_id: int,
    data: JadwalJumatUpdate,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    jadwal = db.query(models.JadwalJumat).filter(models.JadwalJumat.id == jadwal_id).first()
    if not jadwal:
        raise HTTPException(status_code=404, detail="Jadwal tidak ditemukan")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(jadwal, field, value)

    db.commit()
    db.refresh(jadwal)
    return jadwal


@router.delete("/{jadwal_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Hapus jadwal Jumat (Admin)")
async def delete_jadwal_jumat(
    jadwal_id: int,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    jadwal = db.query(models.JadwalJumat).filter(models.JadwalJumat.id == jadwal_id).first()
    if not jadwal:
        raise HTTPException(status_code=404, detail="Jadwal tidak ditemukan")
    db.delete(jadwal)
    db.commit()
