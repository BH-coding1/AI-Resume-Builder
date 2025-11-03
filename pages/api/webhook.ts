import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import formidable from "formidable";


const WEBHOOK_URL = process.env.BACKEND_WEBHOOK;

// Disable body parsing by Next.js (required for formidable)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    
    const form = formidable({ multiples: false });

    // ✅ Parse FormData
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ error: "Failed to parse form data" });
      }
      console.log("🧩 WEBHOOK_URL:", process.env.BACKEND_WEBHOOK);
      console.log("Fields:", fields);
      console.log("Files:", files);

      // ✅ Forward data to backend webhook
      const response = await fetch(WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          file: files.file,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Webhook request failed with status ${response.status}`
        );
      }

      const result = await response.json();
      return res.status(200).json({ success: true, result });
    });
  } catch (error: any) {
    console.error("Error forwarding to webhook:", error.message);
    return res.status(500).json({ error: "Failed to forward data to webhook" });
  }
}
