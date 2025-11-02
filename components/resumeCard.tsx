import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Building2, FileText } from "lucide-react";

interface ResumeCardProps {
  title: string;
  companyName: string;
  atsScore: number;
  imageUrl: string;
}

export default function ResumeCard({ title, companyName, atsScore, imageUrl }: ResumeCardProps) {
  const scoreColor = atsScore >= 80 ? "bg-green-500" : atsScore >= 60 ? "bg-yellow-500" : "bg-red-500";

  return (
    <Card className="overflow-hidden border hover:shadow-sm transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-lg font-medium leading-tight">{title}</CardTitle>
            <CardDescription className="flex items-center gap-1.5 text-sm">
              <Building2 className="h-3.5 w-3.5" />
              {companyName}
            </CardDescription>
          </div>
          <Badge variant={"default" } className="text-xs">
            {atsScore}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">ATS Score</span>
            <span>{atsScore} / 100</span>
          </div>
          <Progress value={atsScore} className="h-1.5" />
        </div>

        <div className="aspect-[8.5/11] w-full overflow-hidden rounded-md border bg-gray-50">
          <img
            src={imageUrl}
            alt={`Resume preview for ${title}`}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </CardContent>
    </Card>
  );
}