import Absensi from '../models/absensiModel.mjs';

// Mengambil semua catatan absensi (untuk HR/Admin)
export const getSemuaAbsensi = async (req, res) => {
    try {
        const data = await Absensi.getAll();
        res.status(200).json({
            message: 'Berhasil mengambil seluruh data absensi! 📊',
            data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mengambil absensi hari ini (seluruh karyawan)
export const getAbsensiHariIni = async (req, res) => {
    try {
        const data = await Absensi.getToday();
        res.status(200).json({
            message: 'Berhasil mengambil absensi hari ini! 📅',
            data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mengambil status absensi hari ini untuk satu karyawan
export const getStatusHariIni = async (req, res) => {
    try {
        const { karyawanId } = req.params;
        const absensiHariIni = await Absensi.getTodayByKaryawan(karyawanId);

        res.status(200).json({
            message: 'Status kehadiran hari ini berhasil dimuat! ⏱️',
            data: absensiHariIni
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mengambil riwayat absensi karyawan (cth: 7-30 hari terakhir)
export const getRiwayatKaryawan = async (req, res) => {
    try {
        const { karyawanId } = req.params;
        const limit = req.query.limit || 14;
        const riwayat = await Absensi.getHistoryByKaryawan(karyawanId, limit);

        res.status(200).json({
            message: 'Riwayat absensi berhasil dimuat! 🗓️',
            data: riwayat
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Absen Masuk (Clock In)
export const absenMasuk = async (req, res) => {
    try {
        const { karyawan_id, lokasi_masuk, catatan } = req.body;

        if (!karyawan_id) {
            return res.status(400).json({ message: 'ID Karyawan wajib disertakan! ⚠️' });
        }

        // Periksa apakah sudah absen masuk hari ini
        const sudahAbsen = await Absensi.getTodayByKaryawan(karyawan_id);
        if (sudahAbsen) {
            return res.status(400).json({
                message: 'Anda sudah melakukan absen masuk hari ini! ⚠️',
                data: sudahAbsen
            });
        }

        // Tentukan status kehadiran (Toleransi jam 08:15)
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Target jam masuk 08:00 dengan toleransi 15 menit
        let status = 'Tepat Waktu';
        if (currentHour > 8 || (currentHour === 8 && currentMinute > 15)) {
            status = 'Terlambat';
        }

        const newId = await Absensi.clockIn({
            karyawan_id,
            status,
            lokasi_masuk: lokasi_masuk || 'Dalam Radius Kantor (Graha Pratama Lt. 8)',
            catatan: catatan || (status === 'Terlambat' ? 'Terlambat hadir' : 'Hadir tepat waktu')
        });

        const absensiBaru = await Absensi.getTodayByKaryawan(karyawan_id);

        res.status(201).json({
            message: `Absen masuk berhasil direkam! Status: ${status} ✅`,
            data: absensiBaru || { id: newId, karyawan_id, status }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Absen Pulang (Clock Out)
export const absenPulang = async (req, res) => {
    try {
        const { karyawan_id, lokasi_pulang, catatan } = req.body;

        if (!karyawan_id) {
            return res.status(400).json({ message: 'ID Karyawan wajib disertakan! ⚠️' });
        }

        const absensiHariIni = await Absensi.getTodayByKaryawan(karyawan_id);
        if (!absensiHariIni) {
            return res.status(400).json({ message: 'Anda belum melakukan absen masuk hari ini! ⚠️' });
        }

        if (absensiHariIni.jam_pulang) {
            return res.status(400).json({
                message: 'Anda sudah melakukan absen pulang sebelumnya untuk hari ini! ⚠️',
                data: absensiHariIni
            });
        }

        // Hitung durasi kerja dari jam_masuk ke waktu sekarang
        const jamMasukParts = absensiHariIni.jam_masuk.split(':');
        const now = new Date();
        const masukDate = new Date();
        masukDate.setHours(parseInt(jamMasukParts[0]), parseInt(jamMasukParts[1]), parseInt(jamMasukParts[2] || 0));

        let diffMs = now - masukDate;
        if (diffMs < 0) diffMs = 0;

        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const durasiFormatted = `${String(diffHours).padStart(2, '0')}j ${String(diffMinutes).padStart(2, '0')}m`;

        await Absensi.clockOut(absensiHariIni.id, {
            durasi_kerja: durasiFormatted,
            lokasi_pulang: lokasi_pulang || 'Dalam Radius Kantor (Graha Pratama Lt. 8)',
            catatan: catatan || 'Shift kerja selesai'
        });

        const updatedAbsensi = await Absensi.getTodayByKaryawan(karyawan_id);

        res.status(200).json({
            message: 'Absen pulang berhasil direkam! Selamat beristirahat. 🏠✨',
            data: updatedAbsensi
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Statistik Dasbor HR / Admin
export const getStatistikAdmin = async (req, res) => {
    try {
        const stats = await Absensi.getAdminStats();
        res.status(200).json({
            message: 'Statistik presensi HR berhasil dimuat! 📈',
            data: stats
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Menghapus rekaman absensi
export const hapusAbsensi = async (req, res) => {
    try {
        const { id } = req.params;
        const affected = await Absensi.delete(id);

        if (affected === 0) {
            return res.status(404).json({ message: 'Data absensi tidak ditemukan 😕' });
        }

        res.status(200).json({ message: 'Data absensi berhasil dihapus! 🗑️' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
