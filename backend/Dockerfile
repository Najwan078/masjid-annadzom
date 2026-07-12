FROM python:3.11-slim

WORKDIR /app

# Install system dependencies (build-essential for bcrypt compilation if needed)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose port FastAPI
EXPOSE 8000

# Jalankan server
CMD ["python", "run.py"]
