
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const user = await currentUser();
if (!user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
const userId = user.id;
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file || !userId)
    return NextResponse.json({ error: "Bad request" }, { status: 400 });

  const { url } = await put(
    `resumes/${userId}/${crypto.randomUUID()}.pdf`,
    file,
    {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }
  );

  return NextResponse.json({ pdfUrl: url });
}
