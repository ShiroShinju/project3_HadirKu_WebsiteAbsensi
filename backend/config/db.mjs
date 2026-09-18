import mysql from 'mysql2/promise';

console.log('Menghubungkan ke database... 🤔');

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'anjay123456',
    database: 'karyawan2_db'
});

console.log('Terhubung ke database! :D');

export default db;