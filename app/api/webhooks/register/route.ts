// app/api/webhooks/clerk/route.ts
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: any) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      console.log("✅ New user added to MongoDB:");
      await connectDB();
      const { email_addresses, first_name, last_name } = evt.data;
      const email = email_addresses?.[0]?.email_address || "testuser@gmail.com";
      console.log(email, first_name, last_name);

      await User.create({
        clerkId: id,
        email,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
      });

      console.log("✅ New user added to MongoDB:", email);
    }

    if (eventType === "user.deleted") {
      await connectDB();
      await User.findOneAndDelete({ clerkId: evt.data.id });
      console.log("🗑️ User deleted:", evt.data.id);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new NextResponse("Error: Verification error", { status: 400 });
  }
}
