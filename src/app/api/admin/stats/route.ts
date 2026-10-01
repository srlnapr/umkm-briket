import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login." },
        { status: 401 }
      );
    }

    const db = getDb();
    const totalProducts = db.products.length;
    const activeProducts = db.products.filter((p) => p.isActive).length;
    const inactiveProducts = totalProducts - activeProducts;

    const totalMessages = db.messages.length;
    const unreadMessages = db.messages.filter((m) => !m.isRead).length;

    const recentProducts = db.products.slice(0, 5);
    const recentMessages = db.messages.slice(0, 5);

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts,
        totalMessages,
        unreadMessages,
      },
      recentProducts,
      recentMessages,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat statistik." },
      { status: 500 }
    );
  }
}
