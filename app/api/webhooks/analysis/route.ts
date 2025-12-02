// app/api/webhooks/analysis/route.ts
import { NextResponse } from "next/server";

const WEBHOOK_URL = process.env.BACKEND_WEBHOOK!;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const resumeText = (formData.get("resumeText") as string) || "";
    const companyName = (formData.get("companyName") as string) || "";
    const jobTitle = (formData.get("jobTitle") as string) || "";
    const description = (formData.get("description") as string) || "";



    const payload = {
      resumeText,
      companyName,
      jobTitle,
      description,
      
    };

    console.log("Sending to n8n:", payload); 

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("n8n rejected:", response.status, text);
      throw new Error(`n8n error: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Webhook failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";