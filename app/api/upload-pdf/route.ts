import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
 
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized – no user" },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file") ;

  if (!file) {
    return NextResponse.json(
      { error: "No file uploaded" },
      { status: 400 }
    );
  }

  try {
    const { url } = await put(
      `resumes/${user.id}/${crypto.randomUUID()}.pdf`,
      file,
      {
        access: "public",
      }
    );

    return NextResponse.json({ pdfUrl: url });
  } catch (error: any) {
    console.error("Vercel Blob upload failed:", error);
    return NextResponse.json(
      { error: "Failed to upload to storage", details: error.message },
      { status: 500 }
    );
  }
}
