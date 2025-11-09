import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Resume from "@/models/Resume";
import { currentUser } from "@clerk/nextjs/server";
export async function POST(req: Request) {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    const body = await req.json();

    const newResume = await Resume.create(
      ...body,
      userId: user.id );
    return NextResponse.json({ success: true, resume: newResume });
  } catch (err: any) {
    console.error("❌ Error saving resume:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    const resumes = await Resume.find({ userId: user.id }).sort({ createdAt: -1 });
    return NextResponse.json(resumes);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
