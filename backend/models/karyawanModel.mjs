import db from '../config/db.mjs';

const Karyawan = {
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM karyawan ORDER BY id ASC');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM karyawan WHERE id = ?', [id]);
        return rows[0] || null;
    },

    getByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM karyawan WHERE email = ?', [email]);
        return rows[0] || null;
    },

    create: async (data) => {
        const { nama, email, posisi, avatar = '', role = 'karyawan' } = data;
        const [result] = await db.execute(
            'INSERT INTO karyawan (nama, email, posisi, avatar, role) VALUES (?, ?, ?, ?, ?)',
            [nama, email, posisi, avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', role || 'karyawan']
        );
        return result.insertId;
    },

    update: async (id, data) => {
        const { nama, email, posisi, avatar = '', role = 'karyawan' } = data;
        const [result] = await db.execute(
            'UPDATE karyawan SET nama = ?, email = ?, posisi = ?, avatar = ?, role = ? WHERE id = ?',
            [nama, email, posisi, avatar, role, id]
        );
        return result.affectedRows;
    },

    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM karyawan WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

export default Karyawan;
