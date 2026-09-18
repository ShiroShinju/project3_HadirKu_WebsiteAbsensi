import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    // Pengguna harus melakukan login terlebih dahulu (tidak ada auto-login otomatis)
    const [currentUser, setCurrentUser] = useState(() => {
        // Gunakan sessionStorage agar sesi terbatas hanya pada tab aktif saat ini
        const saved = sessionStorage.getItem('hadirku_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [lang, setLang] = useState('ID');

    const handleLoginSuccess = (user) => {
        setCurrentUser(user);
        sessionStorage.setItem('hadirku_user', JSON.stringify(user));
        // Bersihkan localStorage lama jika ada
        localStorage.removeItem('hadirku_user');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('hadirku_user');
        localStorage.removeItem('hadirku_user');
    };

    return (
        <Router>
            <div className="min-h-screen flex flex-col selection:bg-[#34c759] selection:text-white">
                <Navbar
                    currentUser={currentUser}
                    onLogout={handleLogout}
                    lang={lang}
                    setLang={setLang}
                />

                <main className="flex-1">
                    <Routes>
                        {/* Halaman utama (/) selalu menampilkan halaman login jika belum login */}
                        <Route
                            path="/"
                            element={
                                currentUser ? (
                                    currentUser.role === 'admin' ? (
                                        <Navigate to="/admin" replace />
                                    ) : (
                                        <Navigate to="/dashboard" replace />
                                    )
                                ) : (
                                    <LoginPage onLoginSuccess={handleLoginSuccess} lang={lang} />
                                )
                            }
                        />

                        <Route
                            path="/login"
                            element={<LoginPage onLoginSuccess={handleLoginSuccess} lang={lang} />}
                        />

                        <Route
                            path="/dashboard"
                            element={
                                currentUser ? (
                                    <EmployeeDashboard currentUser={currentUser} lang={lang} />
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            }
                        />

                        <Route
                            path="/admin"
                            element={
                                currentUser ? (
                                    currentUser.role === 'admin' ? (
                                        <AdminDashboard currentUser={currentUser} lang={lang} />
                                    ) : (
                                        <Navigate to="/dashboard" replace />
                                    )
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            }
                        />

                        {/* Fallback jika route tidak ditemukan */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
