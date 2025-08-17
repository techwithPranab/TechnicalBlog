import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from '@/lib/db'
import User from "@/models/User";
import bcrypt from 'bcryptjs'

export async function PUT(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body.password || body.password.length < 6) {
    return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
  }
  try {
    const hashed = await bcrypt.hash(body.password, 10);
    await User.findByIdAndUpdate(session.user.id, { password: hashed });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Failed to change password" }, { status: 500 });
  }
}
