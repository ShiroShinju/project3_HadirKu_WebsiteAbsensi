import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage({ onLoginSuccess, lang }) {
    const [roleTab, setRoleTab] = useState('karyawan'); // 'karyawan' | 'admin'
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [serverStatus, setServerStatus] = useState('checking'); // 'checking' | 'online' | 'offline'
    const navigate = useNavigate();

    // Fungsi untuk memverifikasi kesehatan koneksi server backend
    const verifyServerHealth = useCallback(async () => {
        try {
            const isOnline = await api.checkHealth();
            if (isOnline) {
                setServerStatus('online');
            } else {
                setServerStatus('offline');
            }
        } catch {
            setServerStatus('offline');
        }
    }, []);

    useEffect(() => {
        // Bersihkan sesi lama dan token ketika membuka halaman login
        sessionStorage.removeItem('hadirku_user');
        sessionStorage.removeItem('hadirku_token');
        localStorage.removeItem('hadirku_user');
        localStorage.removeItem('hadirku_token');

        // Pemeriksaan status server backend pertama kali
        verifyServerHealth();

        // Polling status server setiap 4 detik secara real-time
        const healthInterval = setInterval(verifyServerHealth, 4000);
        return () => clearInterval(healthInterval);
    }, [verifyServerHealth]);

    // Fungsi Pengisian Cepat Akun Demo (Quick-Fill)
    const handleQuickFill = (role) => {
        setErrorMsg('');
        if (role === 'karyawan') {
            setRoleTab('karyawan');
            setIdentifier('alexjajang@gmail.com');
            setPassword('123456');
        } else {
            setRoleTab('admin');
            setIdentifier('ahmad.fauzi@hadirku.id');
            setPassword('123456');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        if (serverStatus === 'offline') {
            setErrorMsg('Server backend sedang offline atau terputus! Harap jalankan server backend terlebih dahulu.');
            setLoading(false);
            return;
        }

        if (!identifier.trim()) {
            setErrorMsg('Silakan masukkan email atau NIP Anda.');
            setLoading(false);
            return;
        }

        if (!password.trim()) {
            setErrorMsg('Silakan masukkan kata sandi akun Anda.');
            setLoading(false);
            return;
        }

        try {
            const res = await api.login({
                email: identifier.trim(),
                password: password.trim(),
                role: roleTab
            });

            if (res.data && res.token) {
                onLoginSuccess(res.data, res.token);
                if (res.data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setErrorMsg('Respon dari server tidak valid.');
            }
        } catch (err) {
            setErrorMsg(err.message || 'Gagal masuk. Periksa email atau kata sandi Anda.');
            // Bila gagal koneksi fetch, periksa kembali status server
            verifyServerHealth();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4 relative">
            {/* Ambient Background Gradient Glows */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(216,226,255,0.7),transparent),radial-gradient(ellipse_60%_50%_at_90%_90%,rgba(255,220,191,0.55),transparent),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(114,254,136,0.35),transparent)]"></div>

            <div className="relative w-full max-w-[480px] mx-auto">
                {/* Ambient Liquid Glow Orbs */}
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#72fe88]/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#d8e2ff]/60 rounded-full blur-3xl pointer-events-none -z-10"></div>

                {/* Centered Frosted Liquid Glass Card */}
                <div className="relative bg-white/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-white/80 transition-all duration-300">
                    
                    {/* Top Brand Logo & System Pill */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4 group">
                            <div className="w-16 h-16 rounded-full p-1 bg-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105 border border-emerald-100">
                                <span className="material-symbols-outlined text-[#006e28] text-[36px]">fingerprint</span>
                            </div>
                            <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ring-2 ring-white flex items-center justify-center transition-colors ${
                                serverStatus === 'online' ? 'bg-[#34c759]' : serverStatus === 'offline' ? 'bg-red-500' : 'bg-amber-400'
                            }`}>
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                            </span>
                        </div>

                        {/* Live Status Capsule: Dinamis Berdasarkan Status Koneksi Backend */}
                        {serverStatus === 'online' && (
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50/90 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200/80 shadow-sm transition-all duration-300">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34c759] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34c759]"></span>
                                </span>
                                <span>Sistem Presensi Normal • Server Graha Pratama Terhubung</span>
                            </div>
                        )}

                        {serverStatus === 'offline' && (
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold mb-3 border border-red-200 shadow-sm transition-all duration-300">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                </span>
                                <span>Server Offline • Menghubungkan ke Server Graha Pratama...</span>
                                <button
                                    type="button"
                                    onClick={verifyServerHealth}
                                    title="Coba hubungkan kembali sekarang"
                                    className="ml-0.5 px-2 py-0.5 rounded-full bg-red-100 hover:bg-red-200 text-red-800 text-[10px] font-bold inline-flex items-center gap-0.5 transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[12px]">refresh</span>
                                    <span>Coba</span>
                                </button>
                            </div>
                        )}

                        {serverStatus === 'checking' && (
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mb-3 border border-gray-200 shadow-sm transition-all">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                                <span>Memeriksa Koneksi Server Graha Pratama...</span>
                            </div>
                        )}

                        {/* Welcome Headings */}
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            {lang === 'ID' ? 'Selamat Datang di HadirKu' : 'Welcome to HadirKu'}
                        </h1>
                        <p className="text-sm text-gray-600 mt-1 max-w-sm">
                            {lang === 'ID'
                                ? 'Silakan masuk dengan kredensial akun Anda untuk mengakses portal presensi.'
                                : 'Please sign in with your credentials to access the attendance portal.'}
                        </p>
                    </div>

                    {/* Role Selector Tabs */}
                    <div className="mt-6 space-y-2">
                        <div className="p-1 bg-gray-100/90 rounded-full flex items-center border border-gray-200/50">
                            <button
                                type="button"
                                onClick={() => {
                                    setRoleTab('karyawan');
                                    setErrorMsg('');
                                }}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold transition-all ${
                                    roleTab === 'karyawan'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px] text-[#006e28]">person</span>
                                <span>Karyawan</span>
                                <span className="hidden sm:inline text-gray-400 text-[10px] font-normal">(Portal Pribadi)</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setRoleTab('admin');
                                    setErrorMsg('');
                                }}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold transition-all ${
                                    roleTab === 'admin'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px] text-[#0058bc]">admin_panel_settings</span>
                                <span>Admin / HR</span>
                                <span className="hidden sm:inline text-gray-400 text-[10px] font-normal">(Manajemen Tim)</span>
                            </button>
                        </div>
                    </div>

                    {/* Quick Demo Fill Pills */}
                    <div className="mt-3.5 p-2.5 rounded-2xl bg-gray-50/90 border border-gray-200/70 text-center">
                        <span className="text-[11px] font-bold text-gray-500 block mb-1.5">
                            ⚡ Klik Cepat Akun Demo (Pengujian):
                        </span>
                        <div className="flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => handleQuickFill('karyawan')}
                                className="px-2.5 py-1 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-gray-200 shadow-xs transition-all active:scale-95"
                            >
                                👤 Alexsander (Karyawan)
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickFill('admin')}
                                className="px-2.5 py-1 rounded-xl bg-white hover:bg-blue-50 text-blue-800 text-[11px] font-semibold border border-gray-200 shadow-xs transition-all active:scale-95"
                            >
                                🛡️ Ahmad Fauzi (Admin HR)
                            </button>
                        </div>
                    </div>

                    {/* Error Alert */}
                    {errorMsg && (
                        <div className="mt-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">error</span>
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {/* Form Fields */}
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-gray-700 ml-1" htmlFor="nip-input">
                                {lang === 'ID' ? 'NIP atau Email Perusahaan' : 'NIP or Work Email'}
                            </label>
                            <div className="relative flex items-center">
                                <span className="material-symbols-outlined absolute left-3.5 text-gray-400 text-[20px] pointer-events-none">
                                    badge
                                </span>
                                <input
                                    id="nip-input"
                                    type="text"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    placeholder={roleTab === 'admin' ? 'ahmad.fauzi@hadirku.id' : 'alexjajang@gmail.com'}
                                    required
                                    autoComplete="username"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50/70 hover:bg-gray-100/70 focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm rounded-2xl border border-gray-200 focus:border-[#34c759] focus:ring-2 focus:ring-[#34c759]/20 transition-all outline-none shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-xs font-bold text-gray-700" htmlFor="password-input">
                                    {lang === 'ID' ? 'Kata Sandi' : 'Password'}
                                </label>
                            </div>
                            <div className="relative flex items-center">
                                <span className="material-symbols-outlined absolute left-3.5 text-gray-400 text-[20px] pointer-events-none">
                                    lock
                                </span>
                                <input
                                    id="password-input"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan kata sandi akun"
                                    required
                                    autoComplete="current-password"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50/70 hover:bg-gray-100/70 focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm rounded-2xl border border-gray-200 focus:border-[#34c759] focus:ring-2 focus:ring-[#34c759]/20 transition-all outline-none shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 px-1 text-xs text-gray-600">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <input type="checkbox" className="rounded text-[#006e28] focus:ring-[#006e28]" />
                                <span>Ingat saya di perangkat ini</span>
                            </label>
                            <span className="text-emerald-700 font-semibold cursor-pointer hover:underline">Butuh bantuan?</span>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || serverStatus === 'offline'}
                            className={`w-full mt-3 py-3.5 px-6 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(52,199,89,0.4)] hover:shadow-lg transition-all active:scale-[0.98] ${
                                serverStatus === 'offline'
                                    ? 'bg-gray-400 cursor-not-allowed opacity-75'
                                    : 'bg-[#34c759] hover:bg-[#006e28] cursor-pointer'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                                    <span>Memverifikasi Token & Kredensial...</span>
                                </>
                            ) : serverStatus === 'offline' ? (
                                <>
                                    <span className="material-symbols-outlined text-[18px]">cloud_off</span>
                                    <span>Server Sedang Offline</span>
                                </>
                            ) : (
                                <>
                                    <span>Masuk ke Portal Presensi</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Bottom Security Note */}
                    <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                        <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-[#006e28]">verified_user</span>
                            <span>Terenkripsi Token JWT & SSL 256-bit • Otentikasi Terproteksi</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
