from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from app import models
from app.schemas import LoginRequest, TokenResponse
from app.auth import verify_password, create_access_token, get_current_user
from app.database import get_db
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/api/auth", tags=["Autentikasi"])


@router.post("/login", response_model=TokenResponse, summary="Login pengguna")
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    Login dengan username dan password.
    Mengembalikan JWT access token jika berhasil.
    """
    user = db.query(models.User).filter(
        models.User.username == request.username,
        models.User.is_active == True
    ).first()

    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Username atau password salah",
        )

    access_token = create_access_token(
        data={"sub": user.username, "role": user.role, "name": user.name},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_name=user.name,
        user_role=user.role,
    )


@router.get("/me", summary="Info user yang sedang login")
async def me(current_user: models.User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "name": current_user.name,
        "role": current_user.role,
    }
