import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import PdfThumbnail from "./pdfPreview";
import ScoreCircle from "./ScoreCircle";


interface ResumeCardProps {
  title: string;
  companyName: string;
  atsScore: number;
  imageUrl: string;
  
}

export default function ResumeCard({ title, companyName, atsScore, imageUrl}: ResumeCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer border border-gray-200 hover:border-gray-300 transition-all duration-300 rounded-2xl bg-white shadow-sm hover:shadow-md">
      {/* Header */}
      <CardHeader className="flex flex-row gap-2 justify-between min-h-[110px] max-sm:flex-col items-center max-md:justify-center max-md:items-center">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold text-gray-900">
            {title}
          </CardTitle>
          <CardDescription className="flex items-center gap-1.5 text-sm text-gray-500">
            <Building2 className="h-4 w-4 text-gray-400" />
            {companyName}
          </CardDescription>
        </div>
        <div className="pt-0 "><ScoreCircle score={atsScore}/></div>
        
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-5  px-5 pb-6">
        {/* Progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500">
          </div>
        </div>

        {/* Image */}
        <div className="aspect-[1/0.7] w-full overflow-hidden rounded-2xl border border-gray-300 bg-gray-50">
          <PdfThumbnail pdfUrl={imageUrl} />
        </div>
      </CardContent>
    </Card>
  );
}
