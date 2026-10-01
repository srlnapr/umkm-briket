import { NextResponse } from "next/server";
import { deleteMessage, markMessageRead } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, { params }: RouteProps) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const success = deleteMessage(id);

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Pesan tidak ditemukan atau gagal dihapus." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dihapus.",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus pesan." },
      { status: 500 }
    );
  }
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
    const body = await request.json();
    const isRead = typeof body.isRead === "boolean" ? body.isRead : true;

    const updated = markMessageRead(id, isRead);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Pesan tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: isRead ? "Pesan ditandai sudah dibaca." : "Pesan ditandai belum dibaca.",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating message status:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui status pesan." },
      { status: 500 }
    );
  }
}
