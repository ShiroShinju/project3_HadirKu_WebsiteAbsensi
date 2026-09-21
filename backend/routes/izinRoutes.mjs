import express from 'express';
import {
    getSemuaIzin,
    getIzinByKaryawan,
    ajukanIzin,
    updateStatusIzin,
    hapusIzin
} from '../controllers/izinController.mjs';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Seluruh rute izin mewajibkan token JWT yang valid
router.use(verifyToken);

// Rute Pengajuan Izin
router.get('/', requireAdmin, getSemuaIzin);
router.get('/karyawan/:karyawanId', getIzinByKaryawan);
router.post('/', ajukanIzin);
router.put('/:id/status', requireAdmin, updateStatusIzin);
router.delete('/:id', requireAdmin, hapusIzin);

export default router;
