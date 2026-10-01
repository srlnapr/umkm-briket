import { NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fetchAll = searchParams.get("all") === "true";

    if (fetchAll) {
      const session = await getAdminSession();
      if (!session) {
        // Unauthenticated users only get active products
        const activeOnly = getProducts(true);
        return NextResponse.json({ success: true, products: activeOnly });
      }
      const allProducts = getProducts(false);
      return NextResponse.json({ success: true, products: allProducts });
    }

    // Default: public website only gets active products
    const products = getProducts(true);
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat produk." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, category, description, price, image, isActive, moq, specs, badge, badgeColor } =
      body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama produk wajib diisi." },
        { status: 400 }
      );
    }

    if (!category || !category.trim()) {
      return NextResponse.json(
        { success: false, message: "Kategori produk wajib diisi." },
        { status: 400 }
      );
    }

    if (!description || !description.trim()) {
      return NextResponse.json(
        { success: false, message: "Deskripsi produk wajib diisi." },
        { status: 400 }
      );
    }

    const defaultImage =
      image && image.trim()
        ? image.trim()
        : "https://lh3.googleusercontent.com/aida-public/AB6AXuAa59vk1qxWreQIBGr8AbG0Jy4vBF_DySc-jHacz4qBKFcdWa3hcNm5lkDbhg7KaRIDYonrPeL8xnOeU7Ms54dAQ9v0QUYx86-6fnmPT5gDevfUx6RTbTQJ3H6wFfjL_wD7WgOUTq9m6YpG2OctH1dcWin1wPGJBSBIzDDNLJ2QANvURy1UzNphJFq9nfBQ4gO8YlLr922ZmAyq5WW9iJiTY0sb-UOQUfdxT43OTGXHhBXGPJqxNhsI";

    const newProduct = createProduct({
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      price: price ? price.trim() : undefined,
      image: defaultImage,
      isActive: typeof isActive === "boolean" ? isActive : true,
      moq: moq ? moq.trim() : "1x20ft FCL",
      badge: badge ? badge.trim() : category.trim(),
      badgeColor: badgeColor || "primary",
      specs: Array.isArray(specs) ? specs : [],
    });

    return NextResponse.json({
      success: true,
      message: "Produk berhasil ditambahkan.",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan produk." },
      { status: 500 }
    );
  }
}
