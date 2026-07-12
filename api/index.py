import os
import sys

# Tambahkan direktori root proyek ke path Python
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Impor instance app FastAPI dari backend.app.main
from backend.app.main import app
