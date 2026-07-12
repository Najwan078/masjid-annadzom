# Panduan Deployment Sistem Manajemen Masjid An-Nadzom (100% GRATIS)

Panduan ini menjelaskan langkah demi langkah untuk mengonlinekan (hosting) aplikasi Sistem Manajemen Masjid An-Nadzom ke internet secara gratis menggunakan kombinasi **GitHub**, **Render.com** (untuk Backend FastAPI), dan **Vercel** (untuk Frontend React).

---

## 📋 Prasyarat
Sebelum memulai, pastikan Anda telah memiliki akun gratis di platform berikut:
1. [GitHub](https://github.com/)
2. [Render](https://render.com/)
3. [Vercel](https://vercel.com/)

---

## 🛠️ Langkah 1: Unggah Kode ke GitHub

Layanan Vercel dan Render akan otomatis membaca kode Anda dari GitHub untuk proses deployment.

1. Buka folder proyek Anda (`C:\Users\ACER\.gemini\antigravity\scratch\masjid-annadzom`) di terminal atau VS Code.
2. Inisialisasi Git dan lakukan commit pertama:
   ```bash
   git init
   git add .
   git commit -m "First commit: Masjid An-Nadzom Digital"
   ```
3. Buka akun GitHub Anda, lalu buat **Repository Baru** (misalnya bernama `masjid-annadzom`). Pilih opsi **Public** atau **Private** (bebas).
4. Hubungkan repository lokal Anda dengan GitHub, lalu unggah kodenya:
   ```bash
   git remote add origin https://github.com/USERNAME_ANDA/masjid-annadzom.git
   git branch -M main
   git push -u origin main
   ```
   *(Ganti `USERNAME_ANDA` dengan username GitHub asli Anda).*

---

## 🚀 Langkah 2: Deploy Backend ke Render.com

Render akan menjalankan server Python FastAPI Anda secara online.

1. Masuk ke dashboard [Render.com](https://dashboard.render.com/).
2. Klik tombol **New +** di pojok kanan atas, lalu pilih **Web Service**.
3. Hubungkan akun GitHub Anda, lalu pilih repositori `masjid-annadzom` yang baru saja diunggah.
4. Isi konfigurasi Web Service sebagai berikut:
   * **Name**: `masjid-annadzom-backend` (bebas)
   * **Language**: `Python`
   * **Root Directory**: `backend` *(Penting! Karena folder backend terpisah)*
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
   * **Instance Type**: Pilih **Free** (Gratis).
5. Klik **Advanced** di bagian bawah, lalu tambahkan **Environment Variable** jika diperlukan (untuk database SQLite bawaan, Render akan otomatis menggunakan konfigurasi default `masjid.db` di folder lokal).
6. Klik **Create Web Service**.
7. Tunggu proses build sekitar 2-5 menit hingga muncul status **Live**.
8. **Catat URL Backend Anda** yang diberikan oleh Render di bagian kiri atas dashboard, misalnya:
   `https://masjid-annadzom-backend.onrender.com`

---

## 💻 Langkah 3: Deploy Frontend ke Vercel

Vercel akan menyajikan tampilan antarmuka (UI) React Anda secara online secara super cepat.

1. Masuk ke dashboard [Vercel.com](https://vercel.com/dashboard).
2. Klik tombol **Add New...** di pojok kanan atas, lalu pilih **Project**.
3. Cari repositori `masjid-annadzom` dari GitHub Anda, lalu klik **Import**.
4. Isi konfigurasi Project sebagai berikut:
   * **Framework Preset**: Pilih `Vite` (otomatis terdeteksi).
   * **Root Directory**: Biarkan kosong `./` (karena package.json frontend ada di folder utama).
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
5. Buka bagian **Environment Variables** (Sangat Penting!):
   * **Key**: `VITE_API_URL`
   * **Value**: Masukkan URL Backend Render Anda yang dicatat di Langkah 2 (tanpa garis miring di akhir). 
     *Contoh:* `https://masjid-annadzom-backend.onrender.com`
6. Klik tombol **Deploy**.
7. Tunggu proses build selama 1-2 menit hingga selesai.
8. **Selamat!** Web Anda sekarang sudah online dan Anda akan diberikan link URL Vercel (seperti `masjid-annadzom.vercel.app`) yang bisa diakses oleh siapa saja di seluruh dunia.

---

## ⚡ Catatan Penting Penggunaan Layanan Gratis
* Karena backend di Render menggunakan server gratis, server akan otomatis masuk ke mode tidur jika tidak diakses dalam 15 menit. 
* Saat pertama kali jamaah membuka website setelah masa tidur tersebut, browser akan loading sekitar 20-30 detik untuk membangunkan server backend. Setelah terbangun, website akan berjalan dengan sangat lancar dan cepat.
