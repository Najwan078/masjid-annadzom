# Gunakan base image Python resmi yang ringan
FROM python:3.10-slim

# Set working directory di dalam container
WORKDIR /code

# Salin file requirements.txt ke dalam container
COPY ./backend/requirements.txt /code/requirements.txt

# Install dependencies Python
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Salin seluruh kode backend ke dalam folder /code/app
COPY ./backend/app /code/app

# Buat folder data untuk database SQLite
RUN mkdir -p /code/data

# Set port default untuk Hugging Face Spaces (Port 7860)
ENV PORT=7860

# Jalankan server uvicorn saat container dimulai
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT}"]
