import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import karyawanRoutes from './routes/karyawanRoutes.mjs';
import absensiRoutes from './routes/absensiRoutes.mjs';
import izinRoutes from './routes/izinRoutes.mjs';
import db from './config/db.mjs';

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware CORS untuk perizinan akses browser / frontend
app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());

// Menyajikan file statis dari folder 'public' jika ada
app.use(express.static(path.join(__dirname, 'public')));

// Rute Pemeriksaan Kesehatan Server (Health Check)
app.get('/api/health', async (req, res) => {
    try {
        await db.execute('SELECT 1');
        res.status(200).json({
            status: 'online',
            server: 'Graha Pratama HQ',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({
            status: 'degraded',
            server: 'Graha Pratama HQ',
            database: 'error',
            error: err.message
        });
    }
});

// Rute API HadirKu
app.use('/api/karyawan', karyawanRoutes);
app.use('/api/absensi', absensiRoutes);
app.use('/api/izin', izinRoutes);

// Rute dasar untuk memeriksa status server
app.get('/', (req, res) => {
    res.status(200).send(`
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background: #f8fafc; color: #1e293b; border-radius: 16px; max-width: 600px; margin: 50px auto; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <h1 style="color: #006e28; margin-bottom: 8px;">✨ HadirKu API Server Berjalan! ✨</h1>
            <p style="font-size: 16px; line-height: 1.6;">Sistem RESTful Backend untuk Portal Absensi & Presensi Mandiri Terhubung ke MySQL (<code>karyawan2_db</code>).</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>Daftar Endpoint:</strong></p>
            <ul>
                <li><code>/api/health</code> - Pemeriksaan Kesehatan Server & Database</li>
                <li><code>/api/karyawan</code> - Manajemen Data Karyawan</li>
                <li><code>/api/absensi</code> - Presensi, Clock In, Clock Out, Riwayat, Statistik</li>
                <li><code>/api/izin</code> - Pengajuan & Verifikasi Cuti/Izin</li>
            </ul>
        </div>
    `);
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server HadirKu berjalan di http://localhost:${PORT} 🚀`);
});
