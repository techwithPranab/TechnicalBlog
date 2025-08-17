import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from '@/lib/db'
import User from "@/models/User";

export async function POST(req: Request) {
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
    );
    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Failed to update settings" }, { status: 500 });
  }
}
