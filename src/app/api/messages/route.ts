import { NextResponse } from "next/server";
import { getMessages, createMessage } from "@/lib/db";
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

    const messages = getMessages();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memuat pesan." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      whatsapp,
      message,
      destination,
      productGrade,
      volume,
      packaging,
      incoterm,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama lengkap wajib diisi." },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, message: "Email wajib diisi." },
        { status: 400 }
      );
    }

    if (!whatsapp || !whatsapp.trim()) {
      return NextResponse.json(
        { success: false, message: "Nomor WhatsApp wajib diisi." },
        { status: 400 }
      );
    }

    const newMessage = createMessage({
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      message: message ? message.trim() : "Permintaan penawaran harga ekspor briket arang batok kelapa.",
      destination: destination ? destination.trim() : undefined,
      productGrade: productGrade ? productGrade.trim() : undefined,
      volume: volume ? volume.trim() : undefined,
      packaging: packaging ? packaging.trim() : undefined,
      incoterm: incoterm ? incoterm.trim() : undefined,
    });

    return NextResponse.json({
      success: true,
      message: "Pesan/inquiry Anda telah berhasil kami terima. Tim ekspor kami akan segera menghubungi Anda.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengirim pesan." },
      { status: 500 }
    );
  }
}
