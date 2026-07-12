from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app import models
from app.schemas import PengurusCreate, PengurusUpdate, PengurusResponse
from app.auth import get_current_user, require_admin
from app.database import get_db

router = APIRouter(prefix="/api/pengurus", tags=["Pengurus"])


@router.get("", response_model=List[PengurusResponse], summary="Daftar susunan pengurus")
async def get_pengurus(
    db: Session = Depends(get_db),
):
    return db.query(models.Pengurus).order_by(models.Pengurus.id).all()


@router.get("/{pengurus_id}", response_model=PengurusResponse, summary="Detail pengurus")
async def get_pengurus_by_id(
    pengurus_id: int,
    db: Session = Depends(get_db),
):
    pengurus = db.query(models.Pengurus).filter(models.Pengurus.id == pengurus_id).first()
    if not pengurus:
        raise HTTPException(status_code=404, detail="Pengurus tidak ditemukan")
    return pengurus


@router.post("", response_model=PengurusResponse, status_code=status.HTTP_201_CREATED, summary="Tambah pengurus (Admin)")
async def create_pengurus(
    data: PengurusCreate,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    pengurus = models.Pengurus(**data.model_dump())
    db.add(pengurus)
    db.commit()
    db.refresh(pengurus)
    return pengurus


@router.put("/{pengurus_id}", response_model=PengurusResponse, summary="Update data pengurus (Admin)")
async def update_pengurus(
    pengurus_id: int,
    data: PengurusUpdate,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    pengurus = db.query(models.Pengurus).filter(models.Pengurus.id == pengurus_id).first()
    if not pengurus:
        raise HTTPException(status_code=404, detail="Pengurus tidak ditemukan")

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(pengurus, field, value)

    db.commit()
    db.refresh(pengurus)
    return pengurus


@router.delete("/{pengurus_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Hapus pengurus (Admin)")
async def delete_pengurus(
    pengurus_id: int,
    db: Session = Depends(get_db),
    _: models.User = Depends(require_admin),
):
    pengurus = db.query(models.Pengurus).filter(models.Pengurus.id == pengurus_id).first()
    if not pengurus:
        raise HTTPException(status_code=404, detail="Pengurus tidak ditemukan")
    db.delete(pengurus)
    db.commit()
