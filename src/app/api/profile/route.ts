import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from '@/lib/db'
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = await User.findById(session.user.id).select('-password');
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  try {
    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        name: body.name,
        bio: body.bio,
        avatar: body.avatar
      },
      { new: true }
    ).select('-password');
    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Failed to update profile" }, { status: 500 });
  }
}
