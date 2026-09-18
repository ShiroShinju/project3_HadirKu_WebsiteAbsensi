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

const router = express.Router();

// Rute Statistik Admin HR
router.get('/statistik', getStatistikAdmin);

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
router.delete('/:id', hapusAbsensi);

export default router;
