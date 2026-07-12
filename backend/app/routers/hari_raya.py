from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import models
from app.schemas import JadwalHariRayaCreate, JadwalHariRayaUpdate, JadwalHariRayaResponse
from app.auth import get_current_user, require_admin
from app.database import get_db

router = APIRouter(prefix="/api/hari-raya", tags=["Jadwal Hari Raya"])


@router.get("", response_model=List[JadwalHariRayaResponse], summary="Daftar semua jadwal Hari Raya")
async def get_hari_raya(
    db: Session = Depends(get_db),
):
    return db.query(models.JadwalHariRaya).order_by(
        models.JadwalHariRaya.tahun.desc(),
        models.JadwalHariRaya.tanggal.desc()
    ).all()


@router.get("/{item_id}", response_model=JadwalHariRayaResponse, summary="Detail jadwal Hari Raya")
async def get_hari_raya_by_id(
    item_id: int,
    db: Session = Depends(get_db),
):
    item = db.query(models.JadwalHariRaya).filter(models.JadwalHariRaya.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Jadwal hari raya tidak ditemukan")
    return item


@router.post("", response_model=JadwalHariRayaResponse, status_code=status.HTTP_201_CREATED, summary="Tambah jadwal Hari Raya (Admin)")
async def create_hari_raya(
    data: JadwalHariRayaCreate,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    item = models.JadwalHariRaya(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=JadwalHariRayaResponse, summary="Update jadwal Hari Raya (Admin)")
async def update_hari_raya(
    item_id: int,
    data: JadwalHariRayaUpdate,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    item = db.query(models.JadwalHariRaya).filter(models.JadwalHariRaya.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Jadwal hari raya tidak ditemukan")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Hapus jadwal Hari Raya (Admin)")
async def delete_hari_raya(
    item_id: int,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    item = db.query(models.JadwalHariRaya).filter(models.JadwalHariRaya.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Jadwal hari raya tidak ditemukan")
    db.delete(item)
    db.commit()
