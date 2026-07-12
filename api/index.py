import os
import sys

# Tambahkan direktori root proyek (/var/task) ke path Python
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(root_dir)

# Tambahkan direktori backend ke path Python agar import 'app.xxx' bisa ditemukan di Vercel
backend_dir = os.path.join(root_dir, "backend")
sys.path.append(backend_dir)

# Impor instance app FastAPI dari backend.app.main
from backend.app.main import app
