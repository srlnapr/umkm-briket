"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/lib/db";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Detail Modal
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Delete Confirmation Modal
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
        }
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      // Optimistic update
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isRead: !currentRead } : m))
      );

      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentRead }),
      });

      if (!res.ok) {
        await fetchMessages();
      } else {
        showToast(!currentRead ? "Ditandai sudah dibaca." : "Ditandai belum dibaca.");
      }
    } catch {
      await fetchMessages();
    }
  };

  const handleDeleteMessage = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      const res = await fetch(`/api/messages/${deleteId}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok && data.success) {
        showToast("Pesan inquiry berhasil dihapus.");
        setDeleteId(null);
        if (selectedMessage?.id === deleteId) {
          setSelectedMessage(null);
        }
        await fetchMessages();
      } else {
        showToast(data.message || "Gagal menghapus pesan.");
      }
    } catch {
      showToast("Terjadi kesalahan saat menghapus pesan.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleOpenDetail = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      handleToggleRead(msg.id, false);
    }
  };

  // Filter messages
  const filteredMessages = messages.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.whatsapp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.destination && m.destination.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "unread" && !m.isRead) ||
      (filterStatus === "read" && m.isRead);

    return matchSearch && matchStatus;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

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
            Kotak Masuk Inquiry Ekspor
          </div>
          <h1 className="font-headline-lg text-headline-lg text-2xl sm:text-3xl text-on-surface">
            Pesan &amp; Inquiry Pembeli
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Semua formulir RFQ dan pesan dari pengunjung website langsung tersimpan di sini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs font-semibold text-on-surface flex items-center gap-2">
            <span>Total: {messages.length}</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-surface text-[11px] font-bold">
                {unreadCount} Baru
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined text-outline absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Cari nama pembeli, email, WhatsApp, pelabuhan, atau pesan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low pl-10 pr-4 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl border border-outline-variant/30 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === "all"
                ? "bg-primary-container text-on-surface shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Semua ({messages.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("unread")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === "unread"
                ? "bg-primary-container text-on-surface shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Belum Dibaca ({unreadCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("read")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === "read"
                ? "bg-primary-container text-on-surface shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Sudah Dibaca ({messages.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="p-12 text-center text-outline bg-surface-container rounded-2xl border border-outline-variant/30">
          <span className="material-symbols-outlined text-[32px] animate-spin text-primary mb-2">
            progress_activity
          </span>
          <p className="text-sm">Memuat pesan...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-12 text-center text-on-surface-variant bg-surface-container rounded-2xl border border-outline-variant/30 flex flex-col items-center">
          <span className="material-symbols-outlined text-[48px] text-outline mb-2">
            mark_email_read
          </span>
          <h3 className="font-headline-sm text-headline-sm text-base text-on-surface">
            Tidak ada pesan ditemukan
          </h3>
          <p className="text-xs text-outline mt-1 max-w-sm">
            {searchQuery
              ? "Coba ubah kata kunci pencarian Anda."
              : "Belum ada pesan masuk dari pengunjung website."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => {
            const cleanPhone = msg.whatsapp.replace(/[^0-9]/g, "");
            const dateStr = new Date(msg.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  msg.isRead
                    ? "bg-surface-container border-outline-variant/25 opacity-90"
                    : "bg-surface-container border-primary-container/50 shadow-md shadow-primary-container/10"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Details */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {!msg.isRead ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-label-tech-sm font-bold bg-primary-container text-on-surface uppercase flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Baru
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-label-tech-sm font-bold bg-surface-container-high text-outline uppercase">
                          Sudah Dibaca
                        </span>
                      )}

                      <h3 className="font-headline-sm text-headline-sm text-base text-on-surface font-semibold">
                        {msg.name}
                      </h3>

                      <span className="text-[11px] text-outline font-label-tech-sm">
                        • {dateStr}
                      </span>
                    </div>

                    {/* Metadata chips */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-on-surface-variant">
                      <a
                        href={`mailto:${msg.email}`}
                        className="hover:text-primary transition-colors flex items-center gap-1 text-outline"
                      >
                        <span className="material-symbols-outlined text-[15px]">mail</span>
                        <span>{msg.email}</span>
                      </a>

                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-secondary transition-colors flex items-center gap-1 text-secondary font-medium"
                      >
                        <span className="material-symbols-outlined text-[15px]">call</span>
                        <span>{msg.whatsapp}</span>
                      </a>

                      {msg.destination && (
                        <span className="flex items-center gap-1 text-outline">
                          <span className="material-symbols-outlined text-[15px]">anchor</span>
                          <span>Port: {msg.destination}</span>
                        </span>
                      )}

                      {msg.volume && (
                        <span className="flex items-center gap-1 text-outline">
                          <span className="material-symbols-outlined text-[15px]">inventory_2</span>
                          <span>Vol: {msg.volume}</span>
                        </span>
                      )}
                    </div>

                    {/* Message Preview */}
                    <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20">
                      {msg.message}
                    </p>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-outline-variant/20 shrink-0 flex-wrap">
                    {/* Direct WhatsApp Response */}
                    <a
                      href={`https://wa.me/${cleanPhone}?text=Halo%20${encodeURIComponent(
                        msg.name
                      )},%20terima%20kasih%20telah%20menghubungi%20PT%20Nusantara%20Ember%20Indonesia.%20Terkait%20permintaan%20penawaran%20briket%20Anda:`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-secondary/15 hover:bg-secondary/25 text-secondary text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      title="Hubungi langsung via WhatsApp"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>Chat WhatsApp</span>
                    </a>

                    {/* Detail Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(msg)}
                      className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold border border-outline-variant/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary">
                        visibility
                      </span>
                      <span>Detail</span>
                    </button>

                    {/* Toggle Read */}
                    <button
                      type="button"
                      onClick={() => handleToggleRead(msg.id, msg.isRead)}
                      className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-outline hover:text-on-surface border border-outline-variant/30 transition-colors cursor-pointer"
                      title={msg.isRead ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {msg.isRead ? "mark_email_unread" : "mark_email_read"}
                      </span>
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => setDeleteId(msg.id)}
                      className="p-2 rounded-xl bg-error-container/15 hover:bg-error-container/30 text-error border border-error-container/30 transition-colors cursor-pointer"
                      title="Hapus Pesan"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Message Full Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-surface-container rounded-2xl border border-outline-variant/40 shadow-2xl p-5 sm:p-7 relative my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center border border-primary-container/40">
                    <span className="material-symbols-outlined text-[22px]">mail</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-lg text-on-surface">
                      Detail Inquiry Ekspor
                    </h2>
                    <span className="text-xs text-outline font-label-tech-sm">
                      Diterima:{" "}
                      {new Date(selectedMessage.createdAt).toLocaleString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Sender Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-outline uppercase text-[10px] font-label-tech-sm block mb-1">
                    Nama Calon Pembeli
                  </span>
                  <span className="font-semibold text-sm text-on-surface">
                    {selectedMessage.name}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-outline uppercase text-[10px] font-label-tech-sm block mb-1">
                    Nomor WhatsApp / Telepon
                  </span>
                  <a
                    href={`https://wa.me/${selectedMessage.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm text-secondary hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>{selectedMessage.whatsapp}</span>
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-outline uppercase text-[10px] font-label-tech-sm block mb-1">
                    Alamat Email Perusahaan
                  </span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="font-semibold text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    <span>{selectedMessage.email}</span>
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <span className="text-outline uppercase text-[10px] font-label-tech-sm block mb-1">
                    Pelabuhan / Kota Tujuan
                  </span>
                  <span className="font-semibold text-sm text-on-surface">
                    {selectedMessage.destination || "Tidak disebutkan"}
                  </span>
                </div>
              </div>

              {/* Technical Order Spec (if from calculator) */}
              {(selectedMessage.productGrade ||
                selectedMessage.volume ||
                selectedMessage.packaging ||
                selectedMessage.incoterm) && (
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 mb-4 text-xs space-y-2">
                  <span className="font-label-tech-sm text-primary uppercase text-[11px] block">
                    Spesifikasi Pesanan RFQ:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {selectedMessage.productGrade && (
                      <div>
                        <span className="text-outline block text-[10px]">Grade:</span>
                        <span className="font-semibold text-on-surface">
                          {selectedMessage.productGrade}
                        </span>
                      </div>
                    )}
                    {selectedMessage.volume && (
                      <div>
                        <span className="text-outline block text-[10px]">Target Volume:</span>
                        <span className="font-semibold text-on-surface">
                          {selectedMessage.volume}
                        </span>
                      </div>
                    )}
                    {selectedMessage.packaging && (
                      <div>
                        <span className="text-outline block text-[10px]">Kemasan:</span>
                        <span className="font-semibold text-on-surface">
                          {selectedMessage.packaging}
                        </span>
                      </div>
                    )}
                    {selectedMessage.incoterm && (
                      <div>
                        <span className="text-outline block text-[10px]">Incoterm:</span>
                        <span className="font-semibold text-on-surface">
                          {selectedMessage.incoterm}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Message Content */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/25 mb-5">
                <span className="text-outline uppercase text-[10px] font-label-tech-sm block mb-2">
                  Isi Pesan / Kebutuhan Khusus:
                </span>
                <p className="text-sm text-on-surface leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setDeleteId(selectedMessage.id)}
                  className="px-3 py-2 rounded-xl bg-error-container/15 hover:bg-error-container/30 text-error text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>Hapus Pesan Ini</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs font-semibold border border-outline-variant/30 transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                  <a
                    href={`https://wa.me/${selectedMessage.whatsapp.replace(
                      /[^0-9]/g,
                      ""
                    )}?text=Halo%20${encodeURIComponent(
                      selectedMessage.name
                    )},%20kami%20telah%20menerima%20inquiry%20briket%20Anda.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-secondary text-on-secondary font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-secondary/90 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Balas via WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-surface-container rounded-2xl border border-error-container/40 shadow-2xl p-6 text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-error-container/20 text-error mx-auto flex items-center justify-center border border-error-container/40">
                <span className="material-symbols-outlined text-[28px]">delete</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-base text-on-surface">
                  Hapus Pesan Inquiry?
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Data pesan ini akan dihapus secara permanen dari database.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold border border-outline-variant/30 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleDeleteMessage}
                  disabled={deleteLoading}
                  className="px-4 py-2 rounded-xl bg-error text-on-error text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {deleteLoading ? "Menghapus..." : "Ya, Hapus"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
