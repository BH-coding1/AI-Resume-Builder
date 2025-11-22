"use client";
import { convertPdfToImage } from "@/app/lib/pdfToImage";
import { useEffect, useState } from "react";

export default function PdfThumbnail({ pdfUrl }: { pdfUrl: string }) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function convertUrlToImage() {
      if (!pdfUrl) return;

      try {
       
        const res = await fetch(pdfUrl);
        
        if (!res.ok || !res.headers.get("content-type")?.includes("pdf")) {
          throw new Error("Invalid PDF");
        }

        const blob = await res.blob();
        const file = new File([blob], "resume.pdf", { type: "application/pdf" });
    
        const result = await convertPdfToImage(file);
        if (result.imageUrl) {
          setImageUrl(result.imageUrl);
        }
      } catch (err) {
        console.error("Failed to generate thumbnail:", err);
      } finally {
        setLoading(false);
      }
    }

    convertUrlToImage();
  }, [pdfUrl]);

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-xl w-full aspect-[8.5/11] flex items-center justify-center">
        <div className="text-gray-500 text-sm">Loading preview...</div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="bg-gray-100 rounded-xl w-full aspect-[8.5/11] flex items-center justify-center">
        <div className="text-gray-500 text-sm">No preview</div>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt="Resume thumbnail"
      className="w-full h-full object-cover rounded-xl shadow-md"
    />
  );
}