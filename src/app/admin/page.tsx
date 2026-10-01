"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product, Message } from "@/lib/db";

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  totalMessages: number;
  unreadMessages: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setRecentProducts(data.recentProducts || []);
          setRecentMessages(data.recentMessages || []);
        }
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleProduct = async (id: string) => {
    try {
      setToggleLoading(id);
      const res = await fetch(`/api/products/${id}/toggle`, { method: "PATCH" });
      if (res.ok) {
        // Refetch to ensure sync
        await fetchDashboardData();
      }
    } catch (err) {
      console.error("Toggle error:", err);
    } finally {
      setToggleLoading(null);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
        <div>
          <div className="inline-flex items-center gap-2 text-primary font-label-tech-sm text-label-tech-sm uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            SISTEM MANAJEMEN UMKM PRO
          </div>
          <h1 className="font-headline-lg text-headline-lg text-2xl sm:text-3xl text-on-surface">
            Dashboard Utama
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Pantau ketersediaan katalog briket ekspor dan inquiry pembeli internasional secara real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-container to-amber-600 text-on-surface font-headline-sm text-headline-sm text-xs sm:text-sm font-bold shadow-md shadow-primary-container/20 hover:shadow-primary-container/40 flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tambah Produk</span>
          </Link>
          <Link
            href="/admin/messages"
            className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-tech-sm text-xs border border-outline-variant/30 flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
            <span>Pesan Masuk</span>
            {stats.unreadMessages > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-primary-container text-on-surface text-[10px] font-bold">
                {stats.unreadMessages}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Produk */}
        <motion.div
          className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 relative overflow-hidden"
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-label-tech-sm text-label-tech-sm text-on-surface-variant uppercase tracking-wider">
              Total Produk
            </span>
            <div className="w-10 h-10 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center border border-primary-container/30">
              <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg text-3xl font-extrabold text-on-surface">
            {loading ? "..." : stats.totalProducts}
          </div>
          <div className="text-xs text-on-surface-variant mt-2 flex items-center gap-1">
            <span>Katalog terdaftar dalam sistem</span>
          </div>
        </motion.div>

        {/* Produk Aktif */}
        <motion.div
          className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 relative overflow-hidden"
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-label-tech-sm text-label-tech-sm text-secondary uppercase tracking-wider">
              Produk Aktif
            </span>
            <div className="w-10 h-10 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center border border-secondary/30">
              <span className="material-symbols-outlined text-[22px]">check_circle</span>
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg text-3xl font-extrabold text-secondary">
            {loading ? "..." : stats.activeProducts}
          </div>
          <div className="text-xs text-on-surface-variant mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span>Tampil live di website utama</span>
          </div>
        </motion.div>

        {/* Produk Nonaktif */}
        <motion.div
          className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 relative overflow-hidden"
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-label-tech-sm text-label-tech-sm text-outline uppercase tracking-wider">
              Produk Nonaktif
            </span>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-outline flex items-center justify-center border border-outline-variant/30">
              <span className="material-symbols-outlined text-[22px]">visibility_off</span>
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg text-3xl font-extrabold text-on-surface-variant">
            {loading ? "..." : stats.inactiveProducts}
          </div>
          <div className="text-xs text-on-surface-variant mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-outline" />
            <span>Disembunyikan dari pengunjung</span>
          </div>
        </motion.div>

        {/* Total Pesan / Inquiry */}
        <motion.div
          className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 relative overflow-hidden"
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-label-tech-sm text-label-tech-sm text-tertiary uppercase tracking-wider">
              Pesan / Inquiry
            </span>
            <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center border border-tertiary/30">
              <span className="material-symbols-outlined text-[22px]">forum</span>
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg text-3xl font-extrabold text-on-surface flex items-baseline gap-2">
            <span>{loading ? "..." : stats.totalMessages}</span>
            {stats.unreadMessages > 0 && (
              <span className="text-xs font-semibold text-primary px-2 py-0.5 rounded-full bg-primary-container/20 border border-primary-container/30">
                {stats.unreadMessages} baru
              </span>
            )}
          </div>
          <div className="text-xs text-on-surface-variant mt-2">
            <span>Permintaan penawaran ekspor</span>
          </div>
        </motion.div>
      </div>

      {/* Grid: Recent Products & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Products with quick toggle */}
        <div className="lg:col-span-7 bg-surface-container rounded-2xl border border-outline-variant/30 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  inventory_2
                </span>
                <h2 className="font-headline-sm text-headline-sm text-base sm:text-lg text-on-surface">
                  Daftar Produk Briket
                </h2>
              </div>
              <Link
                href="/admin/products"
                className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
              >
                <span>Kelola Semua</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-sm text-outline">Memuat produk...</div>
            ) : recentProducts.length === 0 ? (
              <div className="py-12 text-center text-sm text-outline">
                Belum ada produk. Silakan tambahkan produk baru.
              </div>
            ) : (
              <div className="space-y-3">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 sm:p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between gap-3 hover:border-outline-variant/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface-container-high shrink-0 border border-outline-variant/20">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-headline-sm text-headline-sm text-sm text-on-surface truncate">
                            {product.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-label-tech-sm uppercase font-bold bg-surface-container text-primary border border-primary/30">
                            {product.category}
                          </span>
                        </div>
                        <div className="text-xs text-on-surface-variant truncate mt-0.5">
                          {product.price || "Sesuai Penawaran / RFQ"} • {product.moq || "1x20ft FCL"}
                        </div>
                      </div>
                    </div>

                    {/* Quick Toggle Switch */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleProduct(product.id)}
                        disabled={toggleLoading === product.id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          product.isActive
                            ? "bg-secondary-container/20 text-secondary border border-secondary/30 hover:bg-secondary-container/30"
                            : "bg-surface-container text-outline border border-outline-variant/30 hover:text-on-surface"
                        }`}
                        title={product.isActive ? "Klik untuk Nonaktifkan" : "Klik untuk Aktifkan"}
                      >
                        {toggleLoading === product.id ? (
                          <span className="material-symbols-outlined text-[16px] animate-spin">
                            progress_activity
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-[16px]">
                            {product.isActive ? "toggle_on" : "toggle_off"}
                          </span>
                        )}
                        <span className="hidden sm:inline">
                          {product.isActive ? "Aktif" : "Nonaktif"}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Perubahan status langsung berpengaruh pada halaman publik.</span>
            <Link href="/admin/products" className="text-primary hover:underline font-semibold">
              + Tambah Baru
            </Link>
          </div>
        </div>

        {/* Right Column: Recent Messages */}
        <div className="lg:col-span-5 bg-surface-container rounded-2xl border border-outline-variant/30 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  chat
                </span>
                <h2 className="font-headline-sm text-headline-sm text-base sm:text-lg text-on-surface">
                  Inquiry Pembeli Terbaru
                </h2>
              </div>
              <Link
                href="/admin/messages"
                className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            {loading ? (
              <div className="py-12 text-center text-sm text-outline">Memuat pesan...</div>
            ) : recentMessages.length === 0 ? (
              <div className="py-12 text-center text-sm text-outline">
                Belum ada pesan inquiry masuk.
              </div>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      msg.isRead
                        ? "bg-surface-container-low border-outline-variant/20"
                        : "bg-surface-container-high/90 border-primary-container/40 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 truncate">
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-primary-container shrink-0" />
                        )}
                        <span className="font-headline-sm text-headline-sm text-sm text-on-surface font-semibold truncate">
                          {msg.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-outline shrink-0 font-label-tech-sm">
                        {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>

                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-2.5">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-outline-variant/15 text-xs">
                      <span className="text-[11px] text-outline truncate">
                        {msg.destination || msg.email}
                      </span>
                      <a
                        href={`https://wa.me/${msg.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary/15 hover:bg-secondary/25 text-secondary text-[11px] font-semibold transition-colors shrink-0"
                      >
                        <span className="material-symbols-outlined text-[14px]">call</span>
                        <span>Balas WA</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Diterima langsung dari formulir inquiry website.</span>
            <Link href="/admin/messages" className="text-primary hover:underline font-semibold">
              Buka Kotak Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
