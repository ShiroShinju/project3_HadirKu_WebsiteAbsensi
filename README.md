# HadirKu - Sistem Presensi & Absensi Mandiri (Full-Stack)

Aplikasi Web Absensi & Portal Karyawan Modern berbasis **Design Thinking**, mengacu pada modul panduan `mysql-exp - Copy.pdf` dan arsitektur referensi `nodejs_esm`.

---

## 🌟 Fitur Utama (Berdasarkan Design Thinking)

1. **One-Click Clock-In & Clock-Out**:
   - Jam digital besar real-time sinkron (format WIB) dengan detik berjalan.
   - Deteksi Geofencing GPS browser & status radius kantor ("Dalam Radius Kantor Graha Pratama").
   - Tombol **Absen Masuk** otomatis mendeteksi ketepatan waktu (Toleransi jam 08:15 WIB).
   - Dialog konfirmasi interaktif sebelum **Absen Pulang** (Feedback 3 Design Thinking).
2. **Kartu Metrik Kehadiran Hari Ini**:
   - **Jam Masuk**: Status badge *Tepat Waktu* / *Terlambat*.
   - **Jam Keluar**: Status kepulangan shift kerja.
   - **Durasi Kerja**: Dihitung otomatis secara dinamis & realtime.
3. **Riwayat Kehadiran & Kalender Pekan Ini**:
   - Kartu 7 hari terakhir dengan kode warna status (Hijau = Tepat Waktu, Oranye = Terlambat, Biru = Izin/Cuti).
   - Informasi sisa kuota cuti tahunan & total kehadiran.
4. **Form Pengajuan Izin / Cuti (Ide 5 Design Thinking)**:
   - Pengajuan cuti tahunan, sakit (surat dokter), izin keperluan mendesak, atau dinas luar kota.
   - Pelacakan status verifikasi permohonan (*Menunggu*, *Disetujui*, *Ditolak*).
5. **Dashboard Konsol HR & Admin Management**:
   - **4 Indikator KPI Utama**: Total Karyawan Aktif, Hadir Hari Ini, Terlambat, Pengajuan Cuti Menunggu.
   - **Live Monitoring Presensi**: Tabel log presensi real-time seluruh divisi.
   - **Kelola Data Karyawan (CRUD Lengkap)**: Tambah, Edit, dan Hapus Karyawan langsung ke MySQL.
   - **Persetujuan Cuti**: Aksi *Setujui* atau *Tolak* permohonan izin karyawan secara instan.
   - **Ekspor Rekap Bulanan**: Unduh data presensi ke format file CSV / Excel atau Cetak Dokumen Laporan (PDF).
6. **Portal Login & Switcher**:
   - Tab role *Karyawan (Portal Pribadi)* dan *Admin / HR (Manajemen Tim)*.
   - Pemilih akun demo instan untuk kemudahan demonstrasi & evaluasi.

---

## 🏗️ Struktur Arsitektur Proyek

Struktur folder mengikuti standar modul Express + MySQL (`nodejs_esm`):

```text
project3/
├── backend/
│   ├── config/
│   │   └── db.mjs                  # Koneksi mysql2/promise ke karyawan2_db
│   ├── controllers/
│   │   ├── absensiController.mjs   # Kontroler clock in/out, riwayat, statistik
│   │   ├── izinController.mjs      # Kontroler pengajuan & persetujuan cuti
│   │   └── karyawanController.mjs  # Kontroler CRUD karyawan & login
│   ├── models/
│   │   ├── absensiModel.mjs        # Query database absensi
│   │   ├── izinModel.mjs           # Query database izin/cuti
│   │   └── karyawanModel.mjs       # Query database karyawan
│   ├── routes/
│   │   ├── absensiRoutes.mjs       # Router /api/absensi
│   │   ├── izinRoutes.mjs          # Router /api/izin
│   │   └── karyawanRoutes.mjs      # Router /api/karyawan
│   ├── console.sql                 # DDL & Seed Data MySQL
│   ├── test_api.rest               # Pengujian REST Client API
│   ├── index.mjs                   # Entry point server Express 5 (Port 5000)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx          # Header navigasi, jam WIB, ID/EN toggle, avatar
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx  # Konsol HR/Admin (KPI, CRUD Karyawan, Ekspor)
│   │   │   ├── EmployeeDashboard.jsx # Dashboard presensi karyawan 1-klik & metrik
│   │   │   └── LoginPage.jsx       # Halaman login portal presensi
│   │   ├── services/
│   │   │   └── api.js              # Service wrapper fetch API backend
│   │   ├── App.jsx                 # Routing React Router DOM & state login
│   │   ├── index.css               # Styling Plus Jakarta Sans & scrollbar
│   │   └── main.jsx
│   ├── index.html                  # Tailwind CSS Luminous Presence design tokens
│   ├── vite.config.js              # Konfigurasi Vite & proxy
│   └── package.json
│
├── tampilan1/                      # Referensi desain asli & mockup HTML
├── design_thinking_text_based.txt  # Dokumen spesifikasi kebutuhan sistem
└── README.md
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Menjalankan Backend API

Buka terminal pada direktori `backend`:

```bash
cd C:/WorkspaceBBPVP/project3/backend
npm run dev
```

Server backend akan aktif di: **`http://localhost:5000`**

*Catatan: Pastikan database MySQL aktif dan database `karyawan2_db` telah tersedia (dapat di-load melalui file `backend/console.sql`).*

---

### 2. Menjalankan Frontend React

Buka terminal baru pada direktori `frontend`:

```bash
cd C:/WorkspaceBBPVP/project3/frontend
npm run dev
```

Aplikasi web dapat diakses melalui browser di: **`http://localhost:5173`**

---

## 🧪 Pengujian Endpoint API

File pengujian REST Client telah disediakan di [`backend/test_api.rest`](file:///C:/WorkspaceBBPVP/project3/backend/test_api.rest) yang dapat dijalankan langsung menggunakan ekstensi **REST Client** di WebStorm atau VS Code.
