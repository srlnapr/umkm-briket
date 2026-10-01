"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product, ProductSpecItem } from "@/lib/db";

const DEFAULT_PRESET_IMAGES = [
  {
    label: "Glowing Coconut Charcoal Cubes (Shisha)",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa59vk1qxWreQIBGr8AbG0Jy4vBF_DySc-jHacz4qBKFcdWa3hcNm5lkDbhg7KaRIDYonrPeL8xnOeU7Ms54dAQ9v0QUYx86-6fnmPT5gDevfUx6RTbTQJ3H6wFfjL_wD7WgOUTq9m6YpG2OctH1dcWin1wPGJBSBIzDDNLJ2QANvURy1UzNphJFq9nfBQ4gO8YlLr922ZmAyq5WW9iJiTY0sb-UOQUfdxT43OTGXHhBXGPJqxNhsI",
  },
  {
    label: "BBQ Hexagonal Sawdust Charcoal Briquette",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "Crushed Granular Industrial Charcoal",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "Natural Hardwood Charcoal Lump",
    url: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("GRADE A - SHISHA");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [moq, setMoq] = useState("1x20ft FCL");
  const [specs, setSpecs] = useState<ProductSpecItem[]>([
    { label: "Ash Content", value: "< 2.0% (Clean White)" },
    { label: "Calorific Energy", value: "7,600 kcal/kg" },
    { label: "Burning Duration", value: "150+ minutes" },
  ]);

  // Upload state
  const [uploading, setUploading] = useState(false);

  // Delete Confirmation Modal State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products?all=true");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName("");
    setCategory("GRADE A - SHISHA");
    setDescription("");
    setPrice("");
    setImage(DEFAULT_PRESET_IMAGES[0].url);
    setIsActive(true);
    setMoq("1x20ft FCL");
    setSpecs([
      { label: "Ash Content", value: "< 2.0% (Clean White)" },
      { label: "Calorific Energy", value: "7,600 kcal/kg" },
      { label: "Burning Duration", value: "150+ minutes" },
    ]);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setCategory(prod.category);
    setDescription(prod.description);
    setPrice(prod.price || "");
    setImage(prod.image);
    setIsActive(prod.isActive);
    setMoq(prod.moq || "1x20ft FCL");
    setSpecs(
      prod.specs && prod.specs.length > 0
        ? [...prod.specs]
        : [{ label: "Ash Content", value: "< 2.5%" }]
    );
    setFormError("");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setImage(data.url);
        showToast("Foto produk berhasil diunggah!");
      } else {
        setFormError(data.message || "Gagal mengunggah foto.");
      }
    } catch {
      setFormError("Terjadi kesalahan saat upload gambar.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Nama produk wajib diisi.");
      return;
    }
    if (!category.trim()) {
      setFormError("Kategori wajib dipilih/diisi.");
      return;
    }
    if (!description.trim()) {
      setFormError("Deskripsi produk wajib diisi.");
      return;
    }

    setFormLoading(true);

    try {
      const payload = {
        name,
        category,
        description,
        price: price.trim() || undefined,
        image: image.trim() || DEFAULT_PRESET_IMAGES[0].url,
        isActive,
        moq: moq.trim() || "1x20ft FCL",
        specs: specs.filter((s) => s.label.trim() && s.value.trim()),
      };

      if (editingProduct) {
        // Update product
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setFormError(data.message || "Gagal memperbarui produk.");
          setFormLoading(false);
          return;
        }
        showToast("Produk berhasil diperbarui!");
      } else {
        // Create product
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setFormError(data.message || "Gagal menambahkan produk.");
          setFormLoading(false);
          return;
        }
        showToast("Produk baru berhasil ditambahkan!");
      }

      setIsModalOpen(false);
      await fetchProducts();
    } catch {
      setFormError("Terjadi kesalahan koneksi server.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, current: boolean) => {
    try {
      // Optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive: !current } : p))
      );

      const res = await fetch(`/api/products/${id}/toggle`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        // Revert on failure
        await fetchProducts();
        showToast("Gagal mengubah status produk.");
      } else {
        showToast(
          `Status produk diubah menjadi ${!current ? "Aktif (Tampil)" : "Nonaktif (Sembunyi)"}`
        );
      }
    } catch {
      await fetchProducts();
      showToast("Gagal menghubungi server.");
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      const res = await fetch(`/api/products/${deleteId}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok && data.success) {
        showToast("Produk berhasil dihapus!");
        setDeleteId(null);
        await fetchProducts();
      } else {
        showToast(data.message || "Gagal menghapus produk.");
      }
    } catch {
      showToast("Terjadi kesalahan saat menghapus produk.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Spec helper
  const handleAddSpecRow = () => {
    setSpecs([...specs, { label: "", value: "" }]);
  };

  const handleUpdateSpecRow = (
    index: number,
    field: "label" | "value",
    val: string
  ) => {
    const next = [...specs];
    next[index][field] = val;
    setSpecs(next);
  };

  const handleRemoveSpecRow = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory =
      categoryFilter === "all" ||
      p.category.toUpperCase().includes(categoryFilter.toUpperCase());

    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && p.isActive) ||
      (statusFilter === "inactive" && !p.isActive);

    return matchSearch && matchCategory && matchStatus;
  });

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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/20">
        <div>
          <div className="inline-flex items-center gap-2 text-primary font-label-tech-sm text-label-tech-sm uppercase tracking-wider mb-1">
            Katalog Briket &amp; Spesifikasi
          </div>
          <h1 className="font-headline-lg text-headline-lg text-2xl sm:text-3xl text-on-surface">
            Manajemen Produk
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Kelola produk briket, foto, harga, dan atur ketersediaan pada website publik.
          </p>
        </div>

        <motion.button
          type="button"
          onClick={openCreateModal}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-amber-600 text-on-surface font-headline-sm text-headline-sm text-sm font-bold shadow-lg shadow-primary-container/25 flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Tambah Produk Baru</span>
        </motion.button>
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
            placeholder="Cari nama produk, kategori, atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low pl-10 pr-4 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/30 focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-outline font-label-tech-sm uppercase">Kategori:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-surface-container-low px-3 py-2 rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Kategori</option>
              <option value="SHISHA">Grade A (Shisha)</option>
              <option value="BBQ">Grade B (BBQ &amp; Grill)</option>
              <option value="INDUSTRIAL">Grade C (Industrial)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-outline font-label-tech-sm uppercase">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface-container-low px-3 py-2 rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif Saja (Live)</option>
              <option value="inactive">Nonaktif Saja (Tersembunyi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List Cards / Table */}
      {loading ? (
        <div className="p-12 text-center text-outline bg-surface-container rounded-2xl border border-outline-variant/30">
          <span className="material-symbols-outlined text-[32px] animate-spin text-primary mb-2">
            progress_activity
          </span>
          <p className="text-sm">Memuat daftar produk...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="p-12 text-center text-on-surface-variant bg-surface-container rounded-2xl border border-outline-variant/30 flex flex-col items-center">
          <span className="material-symbols-outlined text-[48px] text-outline mb-2">
            inventory_2
          </span>
          <h3 className="font-headline-sm text-headline-sm text-base text-on-surface">
            Tidak ada produk ditemukan
          </h3>
          <p className="text-xs text-outline mt-1 max-w-sm">
            {searchQuery
              ? "Coba ubah kata kunci pencarian atau reset filter kategori."
              : "Belum ada produk dalam katalog. Klik tombol di bawah untuk menambah produk baru."}
          </p>
          {!searchQuery && (
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-4 px-4 py-2 rounded-xl bg-primary-container text-on-surface text-xs font-bold"
            >
              + Tambah Produk Pertama
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                product.isActive
                  ? "bg-surface-container border-outline-variant/30 shadow-md hover:border-primary-container/40"
                  : "bg-surface-container/60 border-outline-variant/20 opacity-80"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-surface-container-high shrink-0 border border-outline-variant/30 shadow-inner">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {!product.isActive && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline text-[20px]">
                          visibility_off
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-label-tech-sm font-bold uppercase bg-primary-container/15 text-primary border border-primary-container/30">
                        {product.category}
                      </span>
                      {product.isActive ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-label-tech-sm font-bold bg-secondary-container/20 text-secondary border border-secondary/30 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          Live di Website
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-label-tech-sm font-bold bg-surface-container-high text-outline border border-outline-variant/30 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                          Nonaktif (Disembunyikan)
                        </span>
                      )}
                      <span className="text-[11px] text-outline font-label-tech-sm">
                        MOQ: {product.moq || "1x20ft FCL"}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-headline-sm text-base sm:text-lg text-on-surface">
                      {product.name}
                    </h3>

                    <p className="text-xs text-on-surface-variant line-clamp-2 max-w-2xl">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-xs text-on-surface font-semibold flex-wrap">
                      <span className="text-primary font-bold">
                        {product.price || "Harga sesuai Permintaan / RFQ"}
                      </span>
                      {product.specs && product.specs.length > 0 && (
                        <span className="text-outline text-[11px] font-normal">
                          • {product.specs.map((s) => `${s.label}: ${s.value}`).join(" | ")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-outline-variant/20 shrink-0">
                  {/* Status Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(product.id, product.isActive)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      product.isActive
                        ? "bg-secondary-container/20 text-secondary border border-secondary/40 hover:bg-secondary-container/30"
                        : "bg-surface-container text-outline border border-outline-variant/30 hover:text-on-surface"
                    }`}
                    title={
                      product.isActive
                        ? "Klik untuk menonaktifkan produk"
                        : "Klik untuk mengaktifkan produk"
                    }
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {product.isActive ? "toggle_on" : "toggle_off"}
                    </span>
                    <span>{product.isActive ? "Aktif" : "Nonaktif"}</span>
                  </button>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => openEditModal(product)}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium border border-outline-variant/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Edit Data Produk"
                  >
                    <span className="material-symbols-outlined text-[18px] text-tertiary">
                      edit
                    </span>
                    <span className="hidden sm:inline">Edit</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => setDeleteId(product.id)}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-error-container/15 hover:bg-error-container/30 text-error text-xs font-medium border border-error-container/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Hapus Produk"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    <span className="hidden sm:inline">Hapus</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-3xl bg-surface-container rounded-2xl border border-outline-variant/40 shadow-2xl p-5 sm:p-7 relative my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center border border-primary-container/40">
                    <span className="material-symbols-outlined text-[20px]">
                      {editingProduct ? "edit_note" : "add_box"}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-lg text-on-surface">
                      {editingProduct ? "Edit Informasi Produk" : "Tambah Produk Briket Baru"}
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      Produk aktif akan otomatis tampil pada halaman spesifikasi website publik.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Form Error Alert */}
              {formError && (
                <div className="mb-4 p-3 rounded-xl bg-error-container/20 border border-error-container/40 text-error text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{formError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSaveProduct} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nama Produk */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                      Nama Produk *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Platinum Coconut Cube 25mm"
                      className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>

                  {/* Kategori */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                      Kategori Produk *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary-container cursor-pointer"
                    >
                      <option value="GRADE A - SHISHA">GRADE A - SHISHA &amp; HOOKAH</option>
                      <option value="GRADE B - BBQ &amp; GRILL">GRADE B - BBQ &amp; GRILL</option>
                      <option value="GRADE C - INDUSTRIAL">GRADE C - INDUSTRIAL CARBON</option>
                      <option value="SPECIALTY HARDWOOD">SPECIALTY HARDWOOD LUMP</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Harga (opsional) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant flex items-center justify-between">
                      <span>Harga (Opsional)</span>
                      <span className="text-outline text-[11px]">Boleh kosong / By Quotation</span>
                    </label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Contoh: $1,350 - $1,450 / MT atau Rp 18.000 / kg"
                      className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>

                  {/* MOQ */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                      Minimum Order Quantity (MOQ)
                    </label>
                    <input
                      type="text"
                      value={moq}
                      onChange={(e) => setMoq(e.target.value)}
                      placeholder="Contoh: 1x20ft FCL (~19.5 MT)"
                      className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary-container"
                    />
                  </div>
                </div>

                {/* Deskripsi */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant">
                    Deskripsi Lengkap *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan keunggulan produk briket ini (kandungan abu putih, tanpa asap, durasi pembakaran, dll)..."
                    className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-on-surface text-sm border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary-container"
                  />
                </div>

                {/* Foto Produk Section */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                  <label className="font-label-tech-sm text-label-tech-sm text-on-surface-variant block">
                    Foto Produk Briket
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Thumbnail Preview */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-surface-container-high shrink-0 border border-outline-variant/40">
                      <Image
                        src={image || DEFAULT_PRESET_IMAGES[0].url}
                        alt="Preview Foto Produk"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Masukkan URL Gambar..."
                        className="w-full bg-surface px-3 py-2 rounded-lg text-xs text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary-container"
                      />

                      <div className="flex items-center gap-2 flex-wrap">
                        <label className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface border border-outline-variant/30 cursor-pointer flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary">
                            upload_file
                          </span>
                          <span>{uploading ? "Mengunggah..." : "Upload dari Perangkat"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={uploading}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[11px] text-outline">Atau pilih foto preset:</span>
                      </div>

                      {/* Preset Image Options */}
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {DEFAULT_PRESET_IMAGES.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setImage(preset.url)}
                            className={`relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                              image === preset.url
                                ? "border-primary-container scale-105"
                                : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                            title={preset.label}
                          >
                            <Image
                              src={preset.url}
                              alt={preset.label}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Specifications (ASTM Specs) */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-tech-sm text-label-tech-sm text-on-surface">
                        Spesifikasi Teknis Tambahan (Opsional)
                      </span>
                      <p className="text-[11px] text-outline">
                        Muncul dalam tabel spesifikasi mini pada card briket website.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddSpecRow}
                      className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold flex items-center gap-1 border border-primary/30"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Tambah Baris</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {specs.map((row, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Label (contoh: Ash Content)"
                          value={row.label}
                          onChange={(e) => handleUpdateSpecRow(i, "label", e.target.value)}
                          className="flex-1 bg-surface px-3 py-1.5 rounded-lg text-xs text-on-surface border border-outline-variant/30"
                        />
                        <input
                          type="text"
                          placeholder="Nilai (contoh: < 2.0%)"
                          value={row.value}
                          onChange={(e) => handleUpdateSpecRow(i, "value", e.target.value)}
                          className="flex-1 bg-surface px-3 py-1.5 rounded-lg text-xs text-on-surface border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecRow(i)}
                          className="p-1.5 text-outline hover:text-error rounded-lg"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Aktif Switch */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <span className="font-label-tech-sm text-label-tech-sm text-on-surface block">
                      Status Publikasi Produk
                    </span>
                    <span className="text-xs text-outline">
                      {isActive
                        ? "Aktif: Produk ini langsung ditampilkan kepada pengunjung di website utama."
                        : "Nonaktif: Produk disimpan di database namun disembunyikan dari website utama."}
                    </span>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold border border-outline-variant/30 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-amber-600 text-on-surface font-headline-sm text-headline-sm text-xs sm:text-sm font-bold shadow-md shadow-primary-container/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {formLoading ? (
                      <>
                        <span className="material-symbols-outlined text-[16px] animate-spin">
                          progress_activity
                        </span>
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        <span>{editingProduct ? "Simpan Perubahan" : "Tambahkan ke Katalog"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
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
                <span className="material-symbols-outlined text-[28px]">warning</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-base text-on-surface">
                  Hapus Produk Briket?
                </h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Tindakan ini akan menghapus produk dari database dan katalog website. Tindakan ini
                  tidak dapat dibatalkan.
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
                  onClick={handleDeleteProduct}
                  disabled={deleteLoading}
                  className="px-4 py-2 rounded-xl bg-error text-on-error text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {deleteLoading ? "Menghapus..." : "Ya, Hapus Produk"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
