import { NextResponse } from "next/server";

const WEBHOOK_URL = process.env.BACKEND_WEBHOOK!;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Convert FormData to a plain object
    const data: Record<string, any> = {};
    let fileContent: string | null = null;

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        // If there's a file, convert it to base64
        const arrayBuffer = await value.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fileContent = buffer.toString("base64");
        data[key] = {
          filename: value.name,
          type: value.type,
          size: value.size,
        };
      } else {
        data[key] = value;
      }
    }

    console.log("✅ Received form data:", data);

    
    const webhookPayload = {
      ...data,
      fileBase64: fileContent,
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
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
