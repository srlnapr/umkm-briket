import { NextResponse } from "next/server";
import { toggleProductStatus } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteProps) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const updated = toggleProductStatus(id);

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status produk berhasil diubah menjadi ${
        updated.isActive ? "Aktif" : "Nonaktif"
      }.`,
      product: updated,
    });
  } catch (error) {
    console.error("Error toggling product status:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengubah status produk." },
      { status: 500 }
    );
  }
}
