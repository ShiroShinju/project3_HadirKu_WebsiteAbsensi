import Karyawan from '../models/karyawanModel.mjs';

// Mengambil semua data karyawan
export const getSemuaKaryawan = async (req, res) => {
    try {
        const karyawan = await Karyawan.getAll();
        res.status(200).json({
            message: 'Berhasil mengambil seluruh data karyawan! 📋',
            data: karyawan
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mengambil karyawan berdasarkan ID
export const getKaryawanById = async (req, res) => {
    try {
        const { id } = req.params;
        const karyawan = await Karyawan.getById(id);

        if (!karyawan) {
            return res.status(404).json({ message: 'Karyawan tidak ditemukan 😕' });
        }

        res.status(200).json({
            message: 'Data karyawan ditemukan! ✨',
            data: karyawan
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Menambahkan karyawan baru
export const tambahKaryawan = async (req, res) => {
    try {
        const { nama, email, posisi, avatar, role } = req.body;

        if (!nama || !email || !posisi) {
            return res.status(400).json({ message: 'Nama, email, dan posisi wajib diisi! ⚠️' });
        }

        const existing = await Karyawan.getByEmail(email);
        if (existing) {
            return res.status(400).json({ message: 'Email sudah terdaftar untuk karyawan lain! ⚠️' });
        }

        const newId = await Karyawan.create({ nama, email, posisi, avatar, role });

        res.status(201).json({
            message: 'Karyawan baru berhasil ditambahkan! 🎉',
            data: { id: newId, nama, email, posisi, avatar, role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Memperbarui data karyawan
export const updateKaryawan = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, email, posisi, avatar, role } = req.body;

        const affected = await Karyawan.update(id, { nama, email, posisi, avatar, role });

        if (affected === 0) {
            return res.status(404).json({ message: 'Karyawan tidak ditemukan untuk diperbarui 😕' });
        }

        res.status(200).json({
            message: 'Data karyawan berhasil diperbarui! ✨',
            data: { id, nama, email, posisi, avatar, role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Menghapus data karyawan
export const hapusKaryawan = async (req, res) => {
    try {
        const { id } = req.params;
        const affected = await Karyawan.delete(id);

        if (affected === 0) {
            return res.status(404).json({ message: 'Karyawan tidak ditemukan untuk dihapus 😕' });
        }

        res.status(200).json({ message: 'Data karyawan berhasil dihapus! 🗑️' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login sederhana / verifikasi identitas karyawan atau admin
export const loginKaryawan = async (req, res) => {
    try {
        const { email, nip, role } = req.body;
        const targetIdentifier = (email || nip || '').trim().toLowerCase();

        const all = await Karyawan.getAll();
        // Cari berdasarkan email cocok atau id cocok
        let user = all.find(k => k.email.toLowerCase() === targetIdentifier);
        if (!user && !isNaN(targetIdentifier) && targetIdentifier !== '') {
            user = all.find(k => k.id === parseInt(targetIdentifier));
        }

        // Jika tidak ditemukan dan ada role admin/karyawan, gunakan user pertama yang cocok dengan role sebagai fallback nyaman
        if (!user && targetIdentifier === '') {
            user = all.find(k => role ? k.role === role : true);
        }

        if (!user) {
            return res.status(404).json({ message: 'Akun karyawan/admin tidak ditemukan! Silakan periksa email/NIP.' });
        }

        res.status(200).json({
            message: `Selamat datang, ${user.nama}! 👋`,
            data: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
