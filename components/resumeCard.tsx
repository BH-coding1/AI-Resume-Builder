import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, ArrowRight } from "lucide-react";
import PdfThumbnail from "./pdfPreview";
import ScoreCircle from "./ScoreCircle";

interface ResumeCardProps {
  title: string;
  companyName: string;
  atsScore: number;
  imageUrl: string;
  onClick?: () => void;
}

export default function ResumeCard({
  title,
  companyName,
  atsScore,
  imageUrl,
  onClick,
}: ResumeCardProps) {
  // Smart badge logic
  const getScoreBadge = () => {
    if (atsScore >= 85)
      return {
        label: "Excellent",
        variant: "default" as const,
        color: "bg-emerald-500",
      };
    if (atsScore >= 70)
      return {
        label: "Great",
        variant: "secondary" as const,
        color: "bg-blue-500",
      };
    if (atsScore >= 50)
      return {
        label: "Needs Work",
        variant: "secondary" as const,
        color: "bg-amber-500",
      };
    return {
      label: "Poor",
      variant: "destructive" as const,
      color: "bg-red-500",
    };
  };

  const badge = getScoreBadge();

  return (
    <Card
      className="group overflow-hidden  rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <CardHeader className="pb-4 ">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1">
              {title}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 text-sm">
              <Building2 className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-700">{companyName}</span>
            </CardDescription>
            <Badge
              variant={badge.variant}
              className={`${badge.color} text-white text-xs font-medium mt-2 px-4 py-1`}
            >
              {badge.label}
            </Badge>
          </div>

          {/* Score Circle + Badge */}
          <div className="flex flex-col items-end gap-2 ">
            <ScoreCircle score={atsScore} />
          </div>
        </div>
      </CardHeader>

      {/* Thumbnail */}
      <CardContent className="px-4 pb-0 pt-2">
        <div className="aspect-[1/0.7] w-full overflow-hidden  border border-gray-300 ">
          <PdfThumbnail pdfUrl={imageUrl} />
        </div>
      </CardContent>
    </Card>
  );
}
