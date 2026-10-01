import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/db";
import { generateSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username/email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const admin = verifyAdminCredentials(username, password);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Username/email atau password salah." },
        { status: 401 }
      );
    }

    const token = generateSessionToken(admin);

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil. Mengalihkan ke dashboard...",
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal pada server." },
      { status: 500 }
    );
  }
}
