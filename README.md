# HadirKu - Sistem Presensi & Absensi Mandiri (Full-Stack)

Aplikasi Web Absensi & Portal Karyawan Modern berbasis **Design Thinking**, mengacu pada modul panduan `mysql-exp - Copy.pdf` dan arsitektur referensi `nodejs_esm`. Dilengkapi dengan autentikasi aman berbasis **Bcrypt & JWT (JSON Web Token)** serta integrasi database **MySQL**.

---

## 🌟 Fitur Utama (Berdasarkan Design Thinking)

1. **One-Click Clock-In & Clock-Out**:
   - Jam digital besar real-time sinkron (format WIB) dengan detik berjalan.
   - Deteksi Geofencing GPS browser & status radius kantor (*"Dalam Radius Kantor Graha Pratama"*).
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
   - **Kelola Data Karyawan (CRUD Lengkap)**: Tambah, Edit, dan Hapus Karyawan langsung ke MySQL dengan otomatisasi enkripsi password.
   - **Persetujuan Cuti**: Aksi *Setujui* atau *Tolak* permohonan izin karyawan secara instan.
   - **Ekspor Rekap Bulanan**: Unduh data presensi ke format file CSV / Excel atau Cetak Dokumen Laporan (PDF).
6. **Autentikasi & Portal Keamanan (Bcrypt + JWT)**:
   - Verifikasi login email/NIP dan kata sandi menggunakan hash **Bcrypt**.
   - Pengamanan sesi menggunakan token **JWT (JSON Web Token)** dengan masa aktif 24 jam.
   - Tab switcher role *Karyawan (Portal Pribadi)* dan *Admin / HR (Manajemen Tim)* dengan validasi role otomatis.
   - Tombol pengisian cepat (*quick-fill*) akun demo untuk memudahkan demonstrasi dan pengujian.

---

## 👥 Akun Demo & Kredensial Pengujian

Tabel `karyawan` pada file [`backend/console.sql`](file:///C:/WorkspaceBBPVP/project3/backend/console.sql) telah menyediakan data seed awal dengan password default **`123456`**:

| Role | Nama | Email / Identifier | Password Default | Akses Halaman |
| :--- | :--- | :--- | :--- | :--- |
| **Karyawan** | Alexsander Jajang | `alexjajang@gmail.com` | `123456` | Portal Presensi Karyawan |
| **Karyawan** | Siti Nurhaliza | `siti.nurhaliza@hadirku.id` | `123456` | Portal Presensi Karyawan |
| **Admin / HR** | Ahmad Fauzi | `ahmad.fauzi@hadirku.id` | `123456` | Konsol Manajemen HR / Admin |
| **Karyawan** | Dewi Lestari | `dewi.lestari@hadirku.id` | `123456` | Portal Presensi Karyawan |

---

## 🏗️ Struktur Arsitektur Proyek

Struktur folder mengikuti standar Express ESM + MySQL (`nodejs_esm`):

```text
project3/
├── backend/
│   ├── config/
│   │   └── db.mjs                  # Koneksi pool mysql2/promise ke karyawan2_db
│   ├── controllers/
│   │   ├── absensiController.mjs   # Kontroler clock in/out, riwayat, statistik
│   │   ├── izinController.mjs      # Kontroler pengajuan & persetujuan cuti
│   │   └── karyawanController.mjs  # Kontroler CRUD karyawan & login auth
│   ├── middleware/
│   │   └── authMiddleware.mjs      # Middleware verifikasi JWT & otorisasi role
│   ├── models/
│   │   ├── absensiModel.mjs        # Query database absensi
│   │   ├── izinModel.mjs           # Query database izin/cuti
│   │   └── karyawanModel.mjs       # Query database karyawan
│   ├── routes/
│   │   ├── absensiRoutes.mjs       # Router /api/absensi
│   │   ├── izinRoutes.mjs          # Router /api/izin
│   │   └── karyawanRoutes.mjs      # Router /api/karyawan & /login
│   ├── console.sql                 # DDL, struktur tabel & Seed Data MySQL
│   ├── test_api.rest               # Pengujian REST Client API
│   ├── index.mjs                   # Entry point server Express 5 (Port 5000)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx          # Header navigasi, jam WIB, ID/EN toggle, avatar, logout
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx  # Konsol HR/Admin (KPI, CRUD Karyawan, Ekspor)
│   │   │   ├── EmployeeDashboard.jsx # Dashboard presensi karyawan 1-klik & metrik
│   │   │   └── LoginPage.jsx       # Halaman login portal presensi (Bcrypt & JWT)
│   │   ├── services/
│   │   │   └── api.js              # Service wrapper fetch API backend & token auth
│   │   ├── App.jsx                 # Routing React Router DOM & state sesi login
│   │   ├── index.css               # Styling Plus Jakarta Sans & utilitas
│   │   └── main.jsx
│   ├── index.html                  # Tailwind CSS & Luminous Presence design tokens
│   ├── vite.config.js              # Konfigurasi Vite & reverse proxy
│   └── package.json
│
├── tampilan1/                      # Referensi desain asli & mockup HTML
├── design_thinking_text_based.txt  # Dokumen spesifikasi kebutuhan sistem
└── README.md
```

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Inisialisasi Database MySQL

Pastikan service MySQL Anda sudah berjalan (misalnya melalui XAMPP, Laragon, MySQL Workbench, atau WebStorm Database Tool).

Jalankan script query yang terdapat di file [`backend/console.sql`](file:///C:/WorkspaceBBPVP/project3/backend/console.sql) untuk:
- Membuat database `karyawan2_db`
- Membuat tabel `karyawan`, `absensi`, dan `izin`
- Memasukkan data awal (seed data) beserta password bcrypt

Contoh melalui terminal MySQL:
```bash
mysql -u root -p < backend/console.sql
```

---

### 2. Menjalankan Backend API

Buka terminal pada direktori `backend`:

```bash
cd backend
npm install
npm run dev
```

Server backend akan aktif di: **`http://localhost:5000`**

---

### 3. Menjalankan Frontend React

Buka terminal baru pada direktori `frontend`:

```bash
cd frontend
npm install
npm run dev
```

Aplikasi web dapat diakses melalui browser di: **`http://localhost:5173`**

---

## 🧪 Pengujian Endpoint API

File pengujian REST Client telah disediakan di [`backend/test_api.rest`](file:///C:/WorkspaceBBPVP/project3/backend/test_api.rest) yang dapat dijalankan langsung menggunakan ekstensi **REST Client** di WebStorm atau VS Code.

### Ringkasan Endpoint Utama:

| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| `POST` | `/api/karyawan/login` | Login karyawan/admin (verifikasi bcrypt, menghasilkan token JWT) |
| `GET` | `/api/karyawan` | Mengambil seluruh daftar karyawan |
| `POST` | `/api/karyawan` | Menambah karyawan baru (password di-hash otomatis) |
| `PUT` | `/api/karyawan/:id` | Memperbarui profil karyawan |
| `DELETE`| `/api/karyawan/:id` | Menghapus data karyawan |
| `GET` | `/api/absensi/statistik` | Mengambil data indikator metrik untuk Dashboard Admin |
| `GET` | `/api/absensi/status-hari-ini/:id` | Mengecek status presensi karyawan hari ini |
| `POST` | `/api/absensi/masuk` | Melakukan Clock-In (Absen Masuk) |
| `POST` | `/api/absensi/pulang` | Melakukan Clock-Out (Absen Pulang) |
| `GET` | `/api/izin` | Mengambil seluruh daftar pengajuan izin/cuti |
| `POST` | `/api/izin` | Mengajukan izin / cuti baru |
| `PUT` | `/api/izin/:id/status` | Konfirmasi status izin (*Disetujui* / *Ditolak*) |
