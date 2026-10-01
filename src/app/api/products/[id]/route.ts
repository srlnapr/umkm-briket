import { NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data produk." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteProps) {
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

    const updated = updateProduct(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Produk berhasil diperbarui.",
      product: updated,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui produk." },
      { status: 500 }
    );
  }
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
    const success = deleteProduct(id);

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan atau gagal dihapus." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Produk berhasil dihapus.",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus produk." },
      { status: 500 }
    );
  }
}
