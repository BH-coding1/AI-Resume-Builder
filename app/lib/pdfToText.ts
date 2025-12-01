// app/lib/convertPdfToText.ts
export interface PdfTextResult {
  text: string;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  isLoading = true;
  // EXACT SAME AS YOUR IMAGE ONE — WORKS 100%
  loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
    
    const version = lib.version;
    lib.GlobalWorkerOptions.workerSrc = "./pdf.worker.min.mjs";
    pdfjsLib = lib;
    isLoading = false;
    return lib;
  });

  return loadPromise;
}

export async function convertPdfToText(file: File): Promise<PdfTextResult> {
  try {
    const lib = await loadPdfJs();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str);
      fullText += strings.join(" ") + "\n";
    }

    return { text: fullText.trim() };
  } catch (err: any) {
    console.error("Text extraction failed:", err);
    return {
      text: "",
      error: err.message || "Failed to read PDF",
    };
  }
}