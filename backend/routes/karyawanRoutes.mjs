import express from 'express';
import {
    getSemuaKaryawan,
    getKaryawanById,
    tambahKaryawan,
    updateKaryawan,
    hapusKaryawan,
    loginKaryawan
} from '../controllers/karyawanController.mjs';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Autentikasi / Login (Public)
router.post('/login', loginKaryawan);

// Rute CRUD Karyawan (Memerlukan Token JWT)
router.get('/', verifyToken, getSemuaKaryawan);
router.get('/:id', verifyToken, getKaryawanById);
router.post('/', verifyToken, requireAdmin, tambahKaryawan);
router.put('/:id', verifyToken, updateKaryawan);
router.delete('/:id', verifyToken, requireAdmin, hapusKaryawan);

export default router;
