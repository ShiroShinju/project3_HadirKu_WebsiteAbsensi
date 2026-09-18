import express from 'express';
import {
    getSemuaIzin,
    getIzinByKaryawan,
    ajukanIzin,
    updateStatusIzin,
    hapusIzin
} from '../controllers/izinController.mjs';

const router = express.Router();

// Rute Pengajuan Izin
router.get('/', getSemuaIzin);
router.get('/karyawan/:karyawanId', getIzinByKaryawan);
router.post('/', ajukanIzin);
router.put('/:id/status', updateStatusIzin);
router.delete('/:id', hapusIzin);

export default router;
