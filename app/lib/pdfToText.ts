// then now whats left is to change the background of the pages 
// then next is the screenshots , then ready for deployment  
// then after that launch on twitter then we are off to learning cursor , also post on twitter about that
// dont forget to delete every text from each file in the project folder as well . 
// keep commenting on twitter , this is the time where i must go absoluteluy crazy
// icon for the app

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
  // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
  loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
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