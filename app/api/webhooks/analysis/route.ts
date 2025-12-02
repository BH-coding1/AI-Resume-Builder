
import { NextResponse } from "next/server";

const WEBHOOK_URL = process.env.BACKEND_WEBHOOK!;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    

    // FORWARD THE EXACT SAME FormData TO n8n
    const forwardFormData = new FormData();
    forwardFormData.append("resumeText",formData.get("resumeText") as string);
    forwardFormData.append("companyName", formData.get("companyName") as string);
    forwardFormData.append("jobTitle", formData.get("jobTitle") as string);
    forwardFormData.append("description", formData.get("description") as string);
    
    console.log('data being sent to api',forwardFormData)
    

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      body: forwardFormData, 
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("n8n error:", text);
      throw new Error("n8n failed");
    }

    const result = await response.json();
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
