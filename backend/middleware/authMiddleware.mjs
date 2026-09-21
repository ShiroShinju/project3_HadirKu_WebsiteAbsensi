import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'hadirku_super_secret_jwt_key_2024_@#$%!';

// Middleware untuk memverifikasi token JWT pada Authorization header
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Akses ditolak: Token autentikasi tidak disertakan atau tidak valid.'
        });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({
            message: 'Token otentikasi tidak valid atau telah kedaluwarsa. Silakan masuk kembali.'
        });
    }
};

// Middleware verifikasi role Admin
export const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Akses ditolak: Hanya administrator atau HR yang diizinkan.'
        });
    }
    next();
};
