"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSettingsPage() {
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<"profile" | "company" | "maintenance">("profile");

  // Profile fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Company fields
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [address, setAddress] = useState("");

  // UI state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          if (data.admin) {
            setUsername(data.admin.username || "");
            setEmail(data.admin.email || "");
            setName(data.admin.name || "");
          }
          if (data.settings) {
            setCompanyName(data.settings.companyName || "");
            setContactEmail(data.settings.contactEmail || "");
            setWhatsappNumber(data.settings.whatsappNumber || "");
            setAddress(data.settings.address || "");
          }
        }
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage("Konfirmasi password baru tidak cocok.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_profile",
          username,
          email,
          name,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Profil dan keamanan admin berhasil disimpan!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(data.message || "Gagal memperbarui profil.");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_settings",
          companyName,
          contactEmail,
          whatsappNumber,
          address,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Informasi kontak dan perusahaan berhasil disimpan!");
      } else {
        setErrorMessage(data.message || "Gagal menyimpan informasi.");
      }
    } catch {
      setErrorMessage("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefault = async () => {
    const confirmReset = window.confirm(
      "Apakah Anda yakin ingin me-reset database ke data awal bawaan (3 produk briket utama dan pesan demo)? Tindakan ini akan mengembalikan data ke posisi awal."
    );
    if (!confirmReset) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_default" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Database berhasil di-reset ke data default!");
        await fetchSettings();
      }
    } catch {
      showToast("Gagal me-reset database.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl bg-surface-container-highest border border-primary-container/40 shadow-2xl text-on-surface text-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-secondary text-[20px]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
        <div>
          <div className="inline-flex items-center gap-2 text-primary font-label-tech-sm text-label-tech-sm uppercase tracking-wider mb-1">
            Konfigurasi &amp; Keamanan Akun
          </div>
          <h1 className="font-headline-lg text-headline-lg text-2xl sm:text-3xl text-on-surface">
            Pengaturan Sistem
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Atur akun administrator, kredensial login, dan informasi kontak UMKM briket.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-error-container/20 text-error hover:bg-error-container/30 border border-error-container/30 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Keluar (Logout)</span>
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-1 overflow-x-auto">
        {[
          { id: "profile", label: "Akun & Keamanan", icon: "security" },
          { id: "company", label: "Kontak & Profil UMKM", icon: "business" },
          { id: "maintenance", label: "Pemeliharaan Data", icon: "build" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              setErrorMessage(null);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === tab.id
                ? "bg-primary-container/20 text-primary border border-primary-container/40"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-error-container/20 border border-error-container/40 text-error text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-outline bg-surface-container rounded-2xl border border-outline-variant/30">
          <span className="material-symbols-outlined text-[32px] animate-spin text-primary mb-2">
            progress_activity
          </span>
          <p className="text-sm">Memuat pengaturan...</p>
        </div>
      ) : (
        <div>
          {/* Tab 1: Profile & Security */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-7 rounded-2xl bg-surface-container border border-outline-variant/30 max-w-2xl space-y-6"
            >
              <div>
                <h2 className="font-headline-sm text-headline-sm text-base sm:text-lg text-on-surface">
                  Data Administrator
                </h2>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Informasi ini digunakan untuk login dan identifikasi pemilik toko briket.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                      Nama Pengelola *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                      Username Login *
                    </label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                    Email Administrator *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                {/* Password Change Box */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3 mt-6">
                  <div className="flex items-center gap-2 text-primary font-label-tech-sm text-xs uppercase">
                    <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                    <span>Ubah Kata Sandi (Opsional)</span>
                  </div>
                  <p className="text-[11px] text-outline">
                    Kosongkan kolom password di bawah jika Anda tidak ingin mengubah password saat ini.
                  </p>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                      Password Saat Ini
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Masukkan password saat ini jika ingin mengubah"
                      className="w-full bg-surface px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                        Password Baru
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        className="w-full bg-surface px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                        Konfirmasi Password Baru
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ulangi password baru"
                        className="w-full bg-surface px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-amber-600 text-on-surface font-headline-sm text-headline-sm text-xs sm:text-sm font-bold shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {saving ? "Menyimpan..." : "Simpan Profil & Keamanan"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Tab 2: Company Contact Info */}
          {activeTab === "company" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-7 rounded-2xl bg-surface-container border border-outline-variant/30 max-w-2xl space-y-6"
            >
              <div>
                <h2 className="font-headline-sm text-headline-sm text-base sm:text-lg text-on-surface">
                  Informasi Profil &amp; Kontak UMKM
                </h2>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Data kontak resmi perusahaan briket yang dapat dihubungi oleh calon pembeli.
                </p>
              </div>

              <form onSubmit={handleSaveCompany} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                    Nama Badan Usaha / Perusahaan *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                      Nomor WhatsApp Resmi *
                    </label>
                    <input
                      type="text"
                      required
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+62 811-234-EMBER"
                      className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                      Email Kontak Ekspor *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="sales@nusantaraember.com"
                      className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                    Alamat Kantor Pusat &amp; Pabrik / Kiln
                  </label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-amber-600 text-on-surface font-headline-sm text-headline-sm text-xs sm:text-sm font-bold shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {saving ? "Menyimpan..." : "Simpan Informasi Kontak"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Tab 3: Maintenance / Reset Default */}
          {activeTab === "maintenance" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-7 rounded-2xl bg-surface-container border border-outline-variant/30 max-w-2xl space-y-6"
            >
              <div>
                <h2 className="font-headline-sm text-headline-sm text-base sm:text-lg text-on-surface">
                  Pemeliharaan Data &amp; Reset Demo
                </h2>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Kelola basis data produk dan pesan untuk keperluan uji coba atau reset sistem.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                <div className="flex items-center gap-2 text-primary font-headline-sm text-sm">
                  <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                  <span>Reset ke Data Bawaan (Default Seed Data)</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Jika Anda ingin mengembalikan katalog ke 3 produk briket asli (Platinum Coconut Cube Grade A, Hexagonal Grade B, Granular Grade C) dan pesan demo awal, Anda dapat menekan tombol di bawah.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetDefault}
                    disabled={saving}
                    className="px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary border border-primary/40 font-headline-sm text-xs font-bold transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                    <span>Reset Data ke Posisi Awal</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2">
                <div className="flex items-center gap-2 text-secondary font-headline-sm text-sm">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                  <span>Status Sistem &amp; Database</span>
                </div>
                <div className="text-xs text-on-surface-variant space-y-1">
                  <div>Tipe Database: <span className="text-on-surface font-semibold">Atomic JSON Engine (Pure TS, Zero-Config)</span></div>
                  <div>Penyimpanan Foto: <span className="text-on-surface font-semibold">Local Storage (/public/uploads) &amp; Cloud CDN</span></div>
                  <div>Keamanan Password: <span className="text-on-surface font-semibold">Bcrypt Hashing (10 Salt Rounds)</span></div>
                  <div>Proteksi Sesi: <span className="text-on-surface font-semibold">HMAC SHA-256 Signed HTTP-Only Cookie</span></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
