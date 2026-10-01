import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getAdminUser } from "@/lib/db";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const admin = getAdminUser();
  return NextResponse.json({
    authenticated: true,
    user: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      name: admin.name,
    },
  });
}
