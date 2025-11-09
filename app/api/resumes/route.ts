import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newResume = await Resume.create(body);
    return NextResponse.json({ success: true, resume: newResume });
  } catch (err: any) {
    console.error("❌ Error saving resume:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const resumes = await Resume.find().sort({ createdAt: -1 });
    return NextResponse.json(resumes);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
