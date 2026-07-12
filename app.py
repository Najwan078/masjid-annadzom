import os
import subprocess
import sys

# Tambahkan folder backend ke PYTHONPATH agar Python bisa mengimpor modul app.*
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "backend")))

if __name__ == "__main__":
    print("[HF Space] Memulai server FastAPI di port 7860...")
    
    # Jalankan server uvicorn untuk FastAPI
    # Port default Hugging Face Spaces adalah 7860
    subprocess.run([
        "uvicorn", 
        "app.main:app", 
        "--host", 
        "0.0.0.0", 
        "--port", 
        "7860"
    ])
