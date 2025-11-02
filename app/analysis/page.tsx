"use client";
import { useSearchParams } from "next/navigation";
import { Protect, RedirectToSignIn } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot, Layout, Palette, Target, Zap } from "lucide-react";
const AnalysisPage = () => {
  const searchParams = useSearchParams();
  const pdfImage = searchParams.get("pdfImage");
  const title = searchParams.get("title");
  const atsScore = parseInt(searchParams.get("atsScore") || "0");
  const companyname = searchParams.get("companyname") || "Company";

  // Dummy scores for other cards
  const toneAndStyleScore = 85;
  const structureScore = 78;
  const skillsScore = 90;

  // Dummy ATS improvements
  const atsImprovements = [
    "Add more job-specific keywords.",
    "Avoid using tables or graphics.",
    "Ensure consistent formatting.",
  ];

  return (
    <Protect fallback={<RedirectToSignIn />}>
      <div className="min-h-screen bg-gradient-patches pt-30 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-5xl">
          {/* Hero Score Section */}
          <Card className="bg-white rounded-2xl border-gray-400 shadow-none p-8 mb-10">
            <CardHeader>
              <CardTitle className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-3 tracking-tight">
                Resume Score Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 text-lg mb-8">
                AI-powered analysis tailored for{" "}
                <span className="font-semibold text-primary">{title}</span> at{" "}
                <span className="font-semibold text-primary">
                  {companyname}
                </span>
              </p>

              {/* Overall Score Circle */}
              <div className="relative flex justify-center mb-8">
                <div className="relative w-48 h-48 overflow-hidden">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#e5e7eb"
                      strokeWidth="14"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="url(#gradient)"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${(atsScore / 100) * 552} 552`}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#070085ff" />
                        <stop offset="70%" stopColor="#440196ff" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-gray-900">
                      {atsScore}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">/100</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p
                  className={`text-lg font-medium ${
                    atsScore >= 75
                      ? "text-primary-900"
                      : atsScore >= 50
                      ? "text-primary-700"
                      : "text-primary-600"
                  }`}
                >
                  {atsScore >= 75
                    ? "Excellent fit"
                    : atsScore >= 50
                    ? "Minor tweaks needed"
                    : "Significant improvements required"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                label: "Tone & Style",
                score: toneAndStyleScore,
                icon: <Palette className="w-5 h-5" />,
              },
              {
                label: "Structure",
                score: structureScore,
                icon: <Layout className="w-5 h-5" />,
              },
              {
                label: "Skills Match",
                score: skillsScore,
                icon: <Target className="w-5 h-5" />,
              },
              {
                label: "ATS Score",
                score: atsScore,
                icon: <Bot className="w-5 h-5" />,
              },
            ].map((metric, idx) => (
              <Card
                key={idx}
                className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-0 overflow-hidden"
              >
                <CardHeader className="pb-3 pt-5 px-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {metric.icon}
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${
                        metric.score >= 80
                          ? "bg-emerald-100 text-emerald-700"
                          : metric.score >= 60
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {metric.score >= 80
                        ? "Strong"
                        : metric.score >= 60
                        ? "Good"
                        : "Improve"}
                    </span>
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-700 tracking-tight">
                    {metric.label}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-5 pb-5">
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-bold text-gray-900 tracking-tight">
                      {metric.score}
                    </p>
                    <span className="text-sm text-gray-500 font-medium">
                      /100
                    </span>
                  </div>

                  {/*Progress Bar */}
                  <div className="mt-3 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        metric.score >= 80
                          ? "bg-emerald-500"
                          : metric.score >= 60
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ATS Improvements */}
          <Card className="bg-white rounded-xl  border-gray-400 shadow-sm p-6 mb-10 ">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                ATS Optimization Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {atsImprovements.map((improvement, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 group hover:from-amber-100 hover:to-orange-100 transition-all"
                  >
                    <span className="text-amber-600 font-semibold mr-3">•</span>
                    <p className="text-gray-700 group-hover:text-gray-900">
                      {improvement}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Fix Button */}
          <div className="text-center mb-10">
            <button className="group  items-center cursor-pointer justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-primary-900 rounded-full shadow-xl hover:shadow-2xl transform duration-300 overflow-hidden">
              <span className=" flex items-center">
                <Zap />
                AI Fix My Resume
              </span>
            </button>
          </div>

          {/* Resume Preview */}
          <Card className="bg-white  border border-gray-200 pt-0">
            <CardHeader className="bg-primary-900   p-5 text-white">
              <CardTitle className="text-xl font-bold">
                Resume Preview: {companyname} - {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gray-50">
              <div className="bg-white rounded-lg  p-4 border-2 border-dashed border-gray-300">
                <img
                  src={pdfImage || ""}
                  alt="Resume Preview"
                  className="w-full h-auto rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              Analysis powered by{" "}
              <span className="font-semibold text-indigo-600">ResuBuild</span>
            </p>
          </div>
        </div>
      </div>
    </Protect>
  );
};

export default AnalysisPage;
