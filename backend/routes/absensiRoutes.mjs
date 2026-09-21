import express from 'express';
import {
    getSemuaAbsensi,
    getAbsensiHariIni,
    getStatusHariIni,
    getRiwayatKaryawan,
    absenMasuk,
    absenPulang,
    getStatistikAdmin,
    hapusAbsensi
} from '../controllers/absensiController.mjs';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Seluruh rute absensi mewajibkan token JWT yang valid
router.use(verifyToken);

// Rute Statistik Admin HR
router.get('/statistik', requireAdmin, getStatistikAdmin);

// Rute Presensi Hari Ini
router.get('/hari-ini', getAbsensiHariIni);
router.get('/status-hari-ini/:karyawanId', getStatusHariIni);

// Rute Riwayat Absensi per Karyawan
router.get('/riwayat/:karyawanId', getRiwayatKaryawan);

// Rute Aksi Absensi (Clock In & Clock Out)
router.post('/masuk', absenMasuk);
router.post('/pulang', absenPulang);

// Rute Semua Absensi & Hapus
router.get('/', getSemuaAbsensi);
router.delete('/:id', requireAdmin, hapusAbsensi);

export default router;
