import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";


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
      <CardHeader className="pb-2 pt-5 px-5 flex items-start justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold text-gray-900">
            {title}
          </CardTitle>
          <CardDescription className="flex items-center gap-1.5 text-sm text-gray-500">
            <Building2 className="h-4 w-4 text-gray-400" />
            {companyName}
          </CardDescription>
        </div>

        <Badge
          className="bg-primary text-white px-3 py-1 text-xs font-medium rounded-full shadow-sm"
        >
          {atsScore}%
        </Badge>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-5  px-5 pb-6">
        {/* Progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>ATS Score</span>
            <span className="font-medium text-gray-700">{atsScore}/100</span>
          </div>
          <Progress value={atsScore} className="h-1.5 bg-gray-100" />
        </div>

        {/* Image */}
        <div className="aspect-[1/0.7] w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
          <img
            src={imageUrl}
            alt={`Resume preview for ${title}`}
            className="max-h-5xl w-full "
          />
        </div>
      </CardContent>
    </Card>
  );
}
