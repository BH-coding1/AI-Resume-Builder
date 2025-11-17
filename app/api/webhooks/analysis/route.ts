import { NextResponse } from "next/server";

const WEBHOOK_URL = process.env.BACKEND_WEBHOOK!;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const pdfUrl = formData.get("pdfUrl") as string;

    if (!pdfUrl) {
      return NextResponse.json({ error: "Missing pdfUrl" }, { status: 400 });
    }

    const payload = {
      companyName: formData.get("companyName"),
      jobTitle: formData.get("jobTitle"),
      description: formData.get("description"),
      pdfUrl,
    };

    console.log("✅ Received form data:", payload);

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Webhook error:", text);
      throw new Error(`Webhook failed with ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("❌ Error handling form data:", error.message);
    return NextResponse.json(
      { error: "Failed to process form data" },
      { status: 500 }
    );
  }
}
