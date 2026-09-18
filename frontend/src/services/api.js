const BASE_URL = 'http://localhost:5000/api';

// Helper fetch wrapper
async function request(endpoint, options = {}) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || data.error || 'Terjadi kesalahan pada server');
        }
        return data;
    } catch (err) {
        console.error(`API Error [${endpoint}]:`, err);
        throw err;
    }
}

export const api = {
    // Health Check Status Server
    checkHealth: async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);
            const res = await fetch(`${BASE_URL}/health`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return res.ok;
        } catch {
            return false;
        }
    },

    // Karyawan
    getKaryawan: () => request('/karyawan'),
    getKaryawanById: (id) => request(`/karyawan/${id}`),
    createKaryawan: (payload) => request('/karyawan', {
        method: 'POST',
        body: JSON.stringify(payload)
    }),
    updateKaryawan: (id, payload) => request(`/karyawan/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    }),
    deleteKaryawan: (id) => request(`/karyawan/${id}`, {
        method: 'DELETE'
    }),
    login: (payload) => request('/karyawan/login', {
        method: 'POST',
        body: JSON.stringify(payload)
    }),

    // Absensi
    getAbsensiHariIni: () => request('/absensi/hari-ini'),
    getStatusHariIni: (karyawanId) => request(`/absensi/status-hari-ini/${karyawanId}`),
    getRiwayatKaryawan: (karyawanId, limit = 14) => request(`/absensi/riwayat/${karyawanId}?limit=${limit}`),
    clockIn: (payload) => request('/absensi/masuk', {
        method: 'POST',
        body: JSON.stringify(payload)
    }),
    clockOut: (payload) => request('/absensi/pulang', {
        method: 'POST',
        body: JSON.stringify(payload)
    }),
    getAdminStats: () => request('/absensi/statistik'),
    getAllAbsensi: () => request('/absensi'),
    deleteAbsensi: (id) => request(`/absensi/${id}`, {
        method: 'DELETE'
    }),

    // Izin & Cuti
    getAllIzin: () => request('/izin'),
    getIzinByKaryawan: (karyawanId) => request(`/izin/karyawan/${karyawanId}`),
    ajukanIzin: (payload) => request('/izin', {
        method: 'POST',
        body: JSON.stringify(payload)
    }),
    updateStatusIzin: (id, status) => request(`/izin/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    }),
    deleteIzin: (id) => request(`/izin/${id}`, {
        method: 'DELETE'
    })
};

export default api;
