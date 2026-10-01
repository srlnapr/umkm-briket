import { NextResponse } from "next/server";
import {
  getDb,
  saveDb,
  getAdminUser,
  updateAdminProfile,
  resetDatabaseToDefault,
} from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

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
    const admin = getAdminUser();

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
      },
      settings: db.settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat pengaturan." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Silakan login." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    // Reset to defaults
    if (action === "reset_default") {
      resetDatabaseToDefault();
      return NextResponse.json({
        success: true,
        message: "Data berhasil di-reset ke nilai default.",
      });
    }

    // Update Admin Profile & Password
    if (action === "update_profile") {
      const { username, email, name, currentPassword, newPassword } = body;
      const currentAdmin = getAdminUser();

      if (newPassword && newPassword.trim()) {
        if (!currentPassword) {
          return NextResponse.json(
            { success: false, message: "Password saat ini wajib diisi untuk mengubah password." },
            { status: 400 }
          );
        }

        const isCurrentValid = bcrypt.compareSync(
          currentPassword,
          currentAdmin.passwordHash
        );
        if (!isCurrentValid) {
          return NextResponse.json(
            { success: false, message: "Password saat ini tidak sesuai." },
            { status: 400 }
          );
        }
      }

      const updated = updateAdminProfile({
        username,
        email,
        name,
        newPassword,
      });

      return NextResponse.json({
        success: true,
        message: "Profil dan keamanan admin berhasil diperbarui.",
        admin: {
          id: updated.id,
          username: updated.username,
          email: updated.email,
          name: updated.name,
        },
      });
    }

    // Update Company Settings
    if (action === "update_settings") {
      const { companyName, contactEmail, whatsappNumber, address, websiteTitle } = body;
      const db = getDb();

      if (companyName) db.settings.companyName = companyName.trim();
      if (contactEmail) db.settings.contactEmail = contactEmail.trim();
      if (whatsappNumber) db.settings.whatsappNumber = whatsappNumber.trim();
      if (address) db.settings.address = address.trim();
      if (websiteTitle) db.settings.websiteTitle = websiteTitle.trim();

      saveDb(db);

      return NextResponse.json({
        success: true,
        message: "Informasi kontak dan pengaturan perusahaan berhasil disimpan.",
        settings: db.settings,
      });
    }

    return NextResponse.json(
      { success: false, message: "Action tidak dikenal." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan pengaturan." },
      { status: 500 }
    );
  }
}
