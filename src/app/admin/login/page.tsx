"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFillDemo = () => {
    setUsername("admin");
    setPassword("admin123");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Gagal masuk. Periksa kembali akun Anda.");
        setLoading(false);
        return;
      }

      setSuccessMessage(data.message || "Login berhasil!");
      setTimeout(() => {
        router.push(redirectPath);
        router.refresh();
      }, 700);
    } catch {
      setErrorMessage("Terjadi kesalahan koneksi ke server.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md bg-surface-container rounded-2xl border border-outline-variant/40 shadow-2xl p-6 sm:p-8 relative z-10"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header Branding */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative h-12 w-12 flex items-center justify-center bg-primary-container/20 rounded-2xl p-2 border border-primary-container/40 shadow-lg shadow-primary-container/20 mb-3">
          <Image
            alt="Nusantara Ember Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMj1vrtiVSG-4_2YC6FBxXmbZpx5DIhingFzNAoMz5DM1oGvNxQmpLSjT81rF75dJm7az4fQJwkHBUJZMCHbG7qI1uZwf0gurt5MS5cKCE70Hlqtfl7D_DIcC3oAASBwoESC1J_KfeTNoAn1ECxG59T2LdBYKymR2G5ClqSAkxN8G185cM93b9k8lixJ7V4glU24bVe2HS2ugTJFIHYp1RtRTqmEwpVCtcPGAtemSfFUTJjhK37ar"
            width={48}
            height={48}
            unoptimized
          />
        </div>
        <span className="font-label-tech-sm text-label-tech-sm text-primary uppercase tracking-wider mb-1">
          PORTAL ADMINISTRASI PRO
        </span>
        <h1 className="font-headline-md text-headline-md text-on-surface">
          Nusantara Ember Admin
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Masuk untuk mengelola produk briket dan melihat inquiry pembeli.
        </p>
      </div>

      {/* Demo Credentials Quick-Fill Banner */}
      <div className="mb-6 p-3.5 rounded-xl bg-surface-container-high/80 border border-outline-variant/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
            key
          </span>
          <div className="text-left text-xs leading-tight">
            <div className="text-on-surface font-semibold">Akun Demo Siap Pakai</div>
            <div className="text-on-surface-variant text-[11px]">
              User: <span className="text-primary font-mono font-bold">admin</span> | Pass:{" "}
              <span className="text-primary font-mono font-bold">admin123</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="px-2.5 py-1.5 rounded-lg bg-primary-container hover:bg-amber-600 text-on-surface font-label-tech-sm text-[11px] font-bold transition-all shrink-0 cursor-pointer shadow-sm"
        >
          Isi Otomatis
        </button>
      </div>

      {/* Alerts */}
      {errorMessage && (
        <motion.div
          className="mb-4 p-3 rounded-lg bg-error-container/20 border border-error-container/50 text-error flex items-start gap-2 text-xs"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {successMessage && (
        <motion.div
          className="mb-4 p-3 rounded-lg bg-secondary-container/20 border border-secondary-container/50 text-secondary flex items-start gap-2 text-xs"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="material-symbols-outlined text-[18px] shrink-0">check_circle</span>
          <span>{successMessage}</span>
        </motion.div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">person</span>
            <span>Username atau Email</span>
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Contoh: admin atau admin@nusantaraember.com"
            className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40 transition-all placeholder:text-outline/60"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              className="w-full bg-surface-container-low px-3.5 py-2.5 pr-10 rounded-xl text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/40 transition-all placeholder:text-outline/60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors cursor-pointer"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-container to-amber-600 text-on-surface font-headline-sm text-headline-sm text-sm font-bold shadow-lg shadow-primary-container/25 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
              <span>Memverifikasi...</span>
            </>
          ) : (
            <>
              <span>Masuk ke Dashboard</span>
              <span className="material-symbols-outlined text-[18px]">login</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Footer info & Link back */}
      <div className="mt-6 pt-5 border-t border-outline-variant/25 flex flex-col items-center gap-2 text-center text-xs text-on-surface-variant">
        <Link
          href="/"
          className="hover:text-primary transition-colors inline-flex items-center gap-1 font-medium"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Kembali ke Website Utama</span>
        </Link>
        <span className="text-[11px] text-outline/80">
          Sistem Keamanan Terenkripsi PT Nusantara Ember Indonesia
        </span>
      </div>
    </motion.div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen w-full bg-surface flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary-container/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none" />

      <Suspense
        fallback={
          <div className="w-full max-w-md p-8 bg-surface-container rounded-2xl border border-outline-variant/40 text-center text-sm text-outline">
            Memuat halaman login...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
