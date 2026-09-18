import express from 'express';
import {
    getSemuaKaryawan,
    getKaryawanById,
    tambahKaryawan,
    updateKaryawan,
    hapusKaryawan,
    loginKaryawan
} from '../controllers/karyawanController.mjs';

const router = express.Router();

// Autentikasi / Login Cepat
router.post('/login', loginKaryawan);

// Rute CRUD Karyawan
router.get('/', getSemuaKaryawan);
router.get('/:id', getKaryawanById);
router.post('/', tambahKaryawan);
router.put('/:id', updateKaryawan);
router.delete('/:id', hapusKaryawan);

export default router;
