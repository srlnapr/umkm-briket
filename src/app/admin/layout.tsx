"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  // If on login page, render children directly without admin shell
  const isLoginPage = pathname === "/admin/login";

  // Fetch unread count & user data
  useEffect(() => {
    if (isLoginPage) return;

    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (data.authenticated && data.user) {
          setAdminUser(data.user);
        }
      } catch {
        // Handle error silently
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          if (data.stats) {
            setUnreadCount(data.stats.unreadMessages || 0);
          }
        }
      } catch {
        // Handle error silently
      }
    };

    fetchSession();
    fetchStats();
  }, [pathname, isLoginPage, router]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "dashboard" },
    { label: "Produk", href: "/admin/products", icon: "inventory_2" },
    {
      label: "Pesan",
      href: "/admin/messages",
      icon: "mail",
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: "Pengaturan", href: "/admin/settings", icon: "settings" },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row text-on-surface antialiased">
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-surface-container text-on-surface border border-outline-variant/30 hover:bg-surface-container-high transition-colors cursor-pointer"
            aria-label="Buka menu admin"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 flex items-center justify-center bg-primary-container/20 rounded-lg p-1 border border-primary-container/40">
              <Image
                alt="Nusantara Ember Logo"
                className="h-full w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMj1vrtiVSG-4_2YC6FBxXmbZpx5DIhingFzNAoMz5DM1oGvNxQmpLSjT81rF75dJm7az4fQJwkHBUJZMCHbG7qI1uZwf0gurt5MS5cKCE70Hlqtfl7D_DIcC3oAASBwoESC1J_KfeTNoAn1ECxG59T2LdBYKymR2G5ClqSAkxN8G185cM93b9k8lixJ7V4glU24bVe2HS2ugTJFIHYp1RtRTqmEwpVCtcPGAtemSfFUTJjhK37ar"
                width={28}
                height={28}
                unoptimized
              />
            </div>
            <span className="font-headline-sm text-headline-sm text-sm text-on-surface font-bold">
              Admin Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Link
              href="/admin/messages"
              className="relative p-2 rounded-xl bg-surface-container text-primary border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-container text-on-primary text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            </Link>
          )}
          <Link
            href="/"
            target="_blank"
            className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium border border-outline-variant/30 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">
              open_in_new
            </span>
            <span className="hidden sm:inline">Lihat Web</span>
          </Link>
        </div>
      </header>

      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden lg:flex w-64 xl:w-72 bg-surface-container-lowest border-r border-outline-variant/30 flex-col justify-between shrink-0 h-screen sticky top-0 p-5">
        <div>
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 pb-5 border-b border-outline-variant/20 mb-6">
            <div className="relative h-10 w-10 flex items-center justify-center bg-primary-container/20 rounded-xl p-1.5 border border-primary-container/40 shadow-sm">
              <Image
                alt="Nusantara Ember Logo"
                className="h-full w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMj1vrtiVSG-4_2YC6FBxXmbZpx5DIhingFzNAoMz5DM1oGvNxQmpLSjT81rF75dJm7az4fQJwkHBUJZMCHbG7qI1uZwf0gurt5MS5cKCE70Hlqtfl7D_DIcC3oAASBwoESC1J_KfeTNoAn1ECxG59T2LdBYKymR2G5ClqSAkxN8G185cM93b9k8lixJ7V4glU24bVe2HS2ugTJFIHYp1RtRTqmEwpVCtcPGAtemSfFUTJjhK37ar"
                width={40}
                height={40}
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-on-surface leading-tight">
                Nusantara Ember
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] tracking-wider uppercase text-primary font-bold">
                  PRO DASHBOARD
                </span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <div className="px-3 pb-1 text-[11px] font-label-tech-sm uppercase tracking-wider text-outline">
              Menu Navigasi
            </div>
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-headline-sm text-headline-sm text-sm transition-all ${
                    isActive
                      ? "bg-primary-container/20 text-primary border border-primary-container/40 font-semibold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isActive ? "text-primary-container" : "text-outline"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-surface text-[11px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-4 border-t border-outline-variant/20 space-y-3">
          {/* External Link to Website */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-surface-container/50 hover:bg-surface-container text-on-surface-variant hover:text-on-surface text-xs transition-all border border-outline-variant/20"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                storefront
              </span>
              <span>Website Publik</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[16px]">
              north_east
            </span>
          </Link>

          {/* Admin Profile & Logout */}
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-primary-container/30 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                AD
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-on-surface truncate">
                  {adminUser?.name || "Admin Pengelola"}
                </span>
                <span className="text-[10px] text-outline truncate">
                  {adminUser?.email || "admin@nusantaraember.com"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/20 transition-colors cursor-pointer"
              title="Keluar dari Admin"
              aria-label="Logout"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (Collapsible) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-72 bg-surface-container-lowest border-r border-outline-variant/30 p-5 flex flex-col justify-between lg:hidden shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-outline-variant/20 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-8 w-8 flex items-center justify-center bg-primary-container/20 rounded-lg p-1 border border-primary-container/40">
                      <Image
                        alt="Nusantara Ember Logo"
                        className="h-full w-auto object-contain"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMj1vrtiVSG-4_2YC6FBxXmbZpx5DIhingFzNAoMz5DM1oGvNxQmpLSjT81rF75dJm7az4fQJwkHBUJZMCHbG7qI1uZwf0gurt5MS5cKCE70Hlqtfl7D_DIcC3oAASBwoESC1J_KfeTNoAn1ECxG59T2LdBYKymR2G5ClqSAkxN8G185cM93b9k8lixJ7V4glU24bVe2HS2ugTJFIHYp1RtRTqmEwpVCtcPGAtemSfFUTJjhK37ar"
                        width={32}
                        height={32}
                        unoptimized
                      />
                    </div>
                    <span className="font-bold text-sm text-on-surface">Admin Portal</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-outline hover:text-on-surface bg-surface-container cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <nav className="space-y-1.5">
                  <div className="px-3 pb-1 text-[11px] font-label-tech-sm uppercase tracking-wider text-outline">
                    Menu Navigasi
                  </div>
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-headline-sm text-headline-sm text-sm transition-all ${
                          isActive
                            ? "bg-primary-container/20 text-primary border border-primary-container/40 font-semibold"
                            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              isActive ? "text-primary-container" : "text-outline"
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-surface text-[11px] font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 space-y-3">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      storefront
                    </span>
                    <span>Website Publik</span>
                  </div>
                  <span className="material-symbols-outlined text-outline text-[16px]">
                    north_east
                  </span>
                </Link>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-semibold text-on-surface truncate">
                      {adminUser?.name || "Admin Pengelola"}
                    </span>
                    <span className="text-[10px] text-outline truncate">
                      {adminUser?.email || "admin@nusantaraember.com"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg text-outline hover:text-error"
                    title="Keluar dari Admin"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Admin Content Body */}
      <main className="flex-1 min-w-0 overflow-y-auto min-h-screen bg-surface p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
